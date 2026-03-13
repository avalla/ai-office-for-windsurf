/**
 * Tool implementations for pipeline, tasks, review, and reports
 */

import { z } from 'zod';
import { join } from 'path';
import { existsSync, readFileSync, writeFileSync, readdirSync, mkdirSync, unlinkSync } from 'fs';

const ProjectRoot = process.cwd();

// Schemas
const AdvanceSchema = z.object({
  slug: z.string(),
  evidence: z.string(),
  next_stage: z.string().optional()
});

const ScaffoldSchema = z.object({
  slug: z.string(),
  stage: z.string(),
  template: z.string().optional()
});

const ValidateSchema = z.object({
  slug: z.string(),
  stage: z.string(),
  checks: z.array(z.string()).optional()
});

const CreateTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  priority: z.enum(['high', 'medium', 'low']).optional(),
  assignee: z.string().optional(),
  team: z.string().optional(),
  column: z.enum(['BACKLOG', 'TODO', 'WIP', 'REVIEW', 'DONE']).optional()
});

const MoveTaskSchema = z.object({
  taskId: z.string(),
  toColumn: z.enum(['BACKLOG', 'TODO', 'WIP', 'REVIEW', 'DONE']),
  reason: z.string().optional()
});

const ListTasksSchema = z.object({
  column: z.enum(['BACKLOG', 'TODO', 'WIP', 'REVIEW', 'DONE']).optional(),
  assignee: z.string().optional()
});

const CountTasksSchema = z.object({
  team: z.string().optional()
});

const ReviewSchema = z.object({
  documentPath: z.string(),
  sectors: z.array(z.string()).optional()
});

const ReportSchema = z.object({
  type: z.enum(['status', 'investor', 'tech_debt', 'audit']),
  format: z.enum(['markdown', 'json']).optional()
});

// Helper functions
function getTasksDir(): string {
  return join(ProjectRoot, '.ai-office', 'tasks');
}

function getStatusDir(): string {
  return join(ProjectRoot, '.ai-office', 'docs', 'runbooks');
}

function generateTaskId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  return `TASK-${timestamp}-${random}`.toUpperCase();
}

// Pipeline stage transitions
const STAGE_TRANSITIONS: Record<string, string[]> = {
  'router': ['create_project', 'prd', 'dev'],
  'create_project': ['prd', 'adr'],
  'prd': ['adr', 'plan'],
  'adr': ['plan', 'tasks'],
  'plan': ['tasks'],
  'tasks': ['dev', 'design_ui'],
  'design_ui': ['dev'],
  'dev': ['security', 'qa'],
  'security': ['qa', 'dev'],
  'qa': ['review', 'dev'],
  'review': ['release', 'dev'],
  'release': ['postmortem']
};

export async function advanceHandler(args: unknown) {
  const { slug, evidence, next_stage } = AdvanceSchema.parse(args);
  const statusDir = getStatusDir();
  const statusFile = join(statusDir, `${slug}-status.md`);

  if (!existsSync(statusFile)) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ error: 'Status file not found', slug }, null, 2)
      }]
    };
  }

  const content = readFileSync(statusFile, 'utf-8');
  const currentStateMatch = content.match(/\*\*State:\*\*\s*(\w+)/);
  const currentState: string = currentStateMatch?.[1] || 'unknown';

  // Determine next stage
  let targetStage = next_stage;
  if (!targetStage) {
    const possibleNext = STAGE_TRANSITIONS[currentState];
    if (possibleNext && possibleNext.length > 0) {
      targetStage = possibleNext[0]!;
    } else {
      targetStage = currentState; // Stay in place if no transitions
    }
  }

  // Update status file
  const updatedContent = content.replace(
    /\*\*State:\*\*\s*\w+/,
    `**State:** ${targetStage}`
  ) + `\n\n## Advance Log\n- ${new Date().toISOString()}: ${currentState} → ${targetStage}\n  Evidence: ${evidence}\n`;

  writeFileSync(statusFile, updatedContent, 'utf-8');

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        success: true,
        slug,
        previousState: currentState,
        newState: targetStage,
        evidence,
        message: `Advanced from ${currentState} to ${targetStage}`
      }, null, 2)
    }]
  };
}

export async function scaffoldHandler(args: unknown) {
  const { slug, stage, template } = ScaffoldSchema.parse(args);
  const docsDir = join(ProjectRoot, '.ai-office', 'docs');

  if (!existsSync(docsDir)) {
    mkdirSync(docsDir, { recursive: true });
  }

  // Generate scaffold based on stage
  const templates: Record<string, string> = {
    'prd': `# PRD: ${slug}\n\n## Overview\n\n## Goals\n\n## Requirements\n\n## Success Metrics\n\n## Timeline\n`,
    'adr': `# ADR: ${slug}\n\n## Status\nProposed\n\n## Context\n\n## Decision\n\n## Consequences\n\n## Alternatives Considered\n`,
    'plan': `# Implementation Plan: ${slug}\n\n## Objective\n\n## Approach\n\n## Tasks\n\n## Risks\n\n## Dependencies\n`,
    'tasks': `# Task Breakdown: ${slug}\n\n## Milestone 1\n- [ ] Task 1\n- [ ] Task 2\n\n## Milestone 2\n- [ ] Task 3\n`
  };

  const scaffoldContent = template || templates[stage] || `# ${stage}: ${slug}\n\n## Description\n\n## Details\n`;
  const filename = `${slug}-${stage}.md`;
  const filepath = join(docsDir, filename);

  writeFileSync(filepath, scaffoldContent, 'utf-8');

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        success: true,
        slug,
        stage,
        createdFile: filepath,
        message: `Scaffolded ${stage} artifacts for ${slug}`
      }, null, 2)
    }]
  };
}

export async function validateHandler(args: unknown) {
  const { slug, stage, checks } = ValidateSchema.parse(args);
  const statusDir = getStatusDir();
  const statusFile = join(statusDir, `${slug}.md`);

  const results: { check: string; passed: boolean; message: string }[] = [];

  // Default checks per stage
  const defaultChecks: Record<string, string[]> = {
    'prd': ['goals_defined', 'requirements_listed', 'success_metrics'],
    'adr': ['context_provided', 'decision_made', 'alternatives_considered'],
    'plan': ['tasks_broken_down', 'dependencies_identified', 'timeline_set'],
    'dev': ['code_review_ready', 'tests_written', 'documentation_updated'],
    'qa': ['test_cases_covered', 'bugs_logged', 'regression_tested'],
    'review': ['code_approved', 'security_checked', 'performance_reviewed']
  };

  const checksToRun = checks || defaultChecks[stage] || ['basic_validation'];

  if (existsSync(statusFile)) {
    const content = readFileSync(statusFile, 'utf-8');
    checksToRun.forEach(check => {
      const passed = content.toLowerCase().includes(check.replace(/_/g, ' '));
      results.push({
        check,
        passed,
        message: passed ? `Found ${check} in status` : `Missing ${check}`
      });
    });
  } else {
    checksToRun.forEach(check => {
      results.push({ check, passed: false, message: 'Status file not found' });
    });
  }

  const allPassed = results.every(r => r.passed);

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        slug,
        stage,
        passed: allPassed,
        results,
        message: allPassed ? 'All validation checks passed' : 'Some validation checks failed'
      }, null, 2)
    }]
  };
}

export const taskHandler = {
  async createTask(args: unknown) {
    const { title, description, priority = 'medium', assignee, team, column = 'BACKLOG' } = CreateTaskSchema.parse(args);
    const tasksDir = getTasksDir();
    const columnDir = join(tasksDir, column);

    if (!existsSync(columnDir)) {
      mkdirSync(columnDir, { recursive: true });
    }

    const taskId = generateTaskId();
    const filename = `${taskId}.md`;
    const filepath = join(columnDir, filename);

    const taskContent = `# ${title}

**ID:** ${taskId}
**Priority:** ${priority.toUpperCase()}
**Status:** ${column}
**Assignee:** ${assignee || 'Unassigned'}
**Team:** ${team || 'General'}
**Created:** ${new Date().toISOString()}

## Description

${description}

## Notes

`;

    writeFileSync(filepath, taskContent, 'utf-8');

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          success: true,
          taskId,
          title,
          column,
          filepath,
          message: `Task ${taskId} created in ${column}`
        }, null, 2)
      }]
    };
  },

  async moveTask(args: unknown) {
    const { taskId, toColumn, reason } = MoveTaskSchema.parse(args);
    const tasksDir = getTasksDir();
    const columns = ['BACKLOG', 'TODO', 'WIP', 'REVIEW', 'DONE'];

    let sourceFile: string | null = null;
    let sourceColumn: string | null = null;

    // Find the task
    for (const col of columns) {
      const filepath = join(tasksDir, col, `${taskId}.md`);
      if (existsSync(filepath)) {
        sourceFile = filepath;
        sourceColumn = col;
        break;
      }
    }

    if (!sourceFile) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ error: 'Task not found', taskId }, null, 2)
        }]
      };
    }

    // Move the task
    const destDir = join(tasksDir, toColumn);
    if (!existsSync(destDir)) {
      mkdirSync(destDir, { recursive: true });
    }

    const destFile = join(destDir, `${taskId}.md`);
    let content = readFileSync(sourceFile, 'utf-8');
    content = content.replace(/\*\*Status:\*\*\s*\w+/, `**Status:** ${toColumn}`);
    content += `\n## Movement Log\n- ${new Date().toISOString()}: ${sourceColumn} → ${toColumn}\n  Reason: ${reason || 'Not specified'}\n`;

    writeFileSync(destFile, content, 'utf-8');
    unlinkSync(sourceFile);

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          success: true,
          taskId,
          from: sourceColumn,
          to: toColumn,
          reason,
          message: `Task ${taskId} moved from ${sourceColumn} to ${toColumn}`
        }, null, 2)
      }]
    };
  },

  async listTasks(args: unknown) {
    const { column, assignee } = ListTasksSchema.parse(args);
    const tasksDir = getTasksDir();
    const columns = column ? [column] : ['BACKLOG', 'TODO', 'WIP', 'REVIEW', 'DONE'];

    const tasks: { id: string; title: string; column: string; assignee: string }[] = [];

    for (const col of columns) {
      const colDir = join(tasksDir, col);
      if (!existsSync(colDir)) continue;

      const files = readdirSync(colDir).filter(f => f.endsWith('.md'));
      for (const file of files) {
        const filepath = join(colDir, file);
        const content = readFileSync(filepath, 'utf-8');
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const assigneeMatch = content.match(/\*\*Assignee:\*\*\s*(.+)/);

        const taskAssignee = assigneeMatch?.[1]?.trim() || 'Unassigned';

        if (!assignee || taskAssignee.toLowerCase().includes(assignee.toLowerCase())) {
          tasks.push({
            id: file.replace('.md', ''),
            title: titleMatch?.[1] || file,
            column: col,
            assignee: taskAssignee
          });
        }
      }
    }

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          count: tasks.length,
          tasks,
          message: `Found ${tasks.length} tasks`
        }, null, 2)
      }]
    };
  },

  async countTasks(args: unknown) {
    const { team } = CountTasksSchema.parse(args);
    const tasksDir = getTasksDir();
    const columns = ['BACKLOG', 'TODO', 'WIP', 'REVIEW', 'DONE'];

    const counts: Record<string, number> = {};
    let total = 0;

    for (const col of columns) {
      const colDir = join(tasksDir, col);
      if (!existsSync(colDir)) {
        counts[col] = 0;
        continue;
      }

      const files = readdirSync(colDir).filter(f => f.endsWith('.md'));

      if (team) {
        let teamCount = 0;
        for (const file of files) {
          const filepath = join(colDir, file);
          const content = readFileSync(filepath, 'utf-8');
          const teamMatch = content.match(/\*\*Team:\*\*\s*(.+)/);
          if (teamMatch?.[1]?.toLowerCase().includes(team.toLowerCase())) {
            teamCount++;
          }
        }
        counts[col] = teamCount;
        total += teamCount;
      } else {
        counts[col] = files.length;
        total += files.length;
      }
    }

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          total,
          byColumn: counts,
          team: team || 'all',
          message: `Total ${total} tasks${team ? ` for team ${team}` : ''}`
        }, null, 2)
      }]
    };
  }
};

export async function reviewHandler(args: unknown) {
  const { documentPath, sectors } = ReviewSchema.parse(args);

  if (!existsSync(documentPath)) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ error: 'Document not found', path: documentPath }, null, 2)
      }]
    };
  }

  const content = readFileSync(documentPath, 'utf-8');
  const defaultSectors = ['technical', 'business', 'security', 'ux'];
  const sectorsToReview = sectors || defaultSectors;

  const reviews: { sector: string; score: number; findings: string[] }[] = [];

  for (const sector of sectorsToReview) {
    const findings: string[] = [];

    // Simple heuristic checks
    if (sector === 'technical') {
      if (content.includes('TODO') || content.includes('FIXME')) {
        findings.push('Contains unresolved TODOs/FIXMEs');
      }
      if (content.length < 100) {
        findings.push('Document may be too brief');
      }
    }
    if (sector === 'security') {
      if (content.toLowerCase().includes('password') && !content.includes('hash')) {
        findings.push('Password handling may need review');
      }
    }
    if (sector === 'business') {
      if (!content.toLowerCase().includes('requirement')) {
        findings.push('Missing requirements section');
      }
    }
    if (sector === 'ux') {
      if (!content.toLowerCase().includes('user')) {
        findings.push('Missing user perspective');
      }
    }

    const score = Math.max(0, 10 - findings.length * 2);
    reviews.push({ sector, score, findings });
  }

  const overallScore = reviews.reduce((sum, r) => sum + r.score, 0) / reviews.length;

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        document: documentPath,
        overallScore: Math.round(overallScore * 10) / 10,
        reviews,
        recommendation: overallScore >= 7 ? 'Approved' : overallScore >= 5 ? 'Needs revision' : 'Major changes required'
      }, null, 2)
    }]
  };
}

export async function reportHandler(args: unknown) {
  const { type, format = 'markdown' } = ReportSchema.parse(args);
  const statusDir = getStatusDir();
  const tasksDir = getTasksDir();

  let reportContent: string;
  let mimeType: string;

  if (type === 'status') {
    const statuses: { slug: string; state: string; updated: string }[] = [];

    if (existsSync(statusDir)) {
      const files = readdirSync(statusDir).filter(f => f.endsWith('.md'));
      for (const file of files) {
        const filepath = join(statusDir, file);
        const content = readFileSync(filepath, 'utf-8');
        const stateMatch = content.match(/\*\*State:\*\*\s*(\w+)/);
        const dateMatch = content.match(/\*\*Updated:\*\*\s*(\S+)/);
        statuses.push({
          slug: file.replace('.md', ''),
          state: stateMatch?.[1] || 'unknown',
          updated: dateMatch?.[1] || 'unknown'
        });
      }
    }

    if (format === 'json') {
      reportContent = JSON.stringify({ generated: new Date().toISOString(), statuses }, null, 2);
      mimeType = 'application/json';
    } else {
      reportContent = `# Status Report\n\nGenerated: ${new Date().toISOString()}\n\n| Slug | State | Updated |\n|------|-------|----------|\n${statuses.map(s => `| ${s.slug} | ${s.state} | ${s.updated} |`).join('\n')}\n`;
      mimeType = 'text/markdown';
    }
  } else if (type === 'tech_debt') {
    const techDebt: { area: string; severity: string; description: string }[] = [];

    // Scan for TODOs and FIXMEs in tasks
    if (existsSync(tasksDir)) {
      const columns = ['BACKLOG', 'TODO', 'WIP', 'REVIEW', 'DONE'];
      for (const col of columns) {
        const colDir = join(tasksDir, col);
        if (!existsSync(colDir)) continue;
        const files = readdirSync(colDir).filter(f => f.endsWith('.md'));
        for (const file of files) {
          const filepath = join(colDir, file);
          const content = readFileSync(filepath, 'utf-8');
          const todoMatches = content.matchAll(/(?:TODO|FIXME):\s*(.+)/g);
          for (const match of todoMatches) {
            techDebt.push({
              area: file,
              severity: match[0].includes('FIXME') ? 'high' : 'medium',
              description: match[1] || 'unknown'
            });
          }
        }
      }
    }

    if (format === 'json') {
      reportContent = JSON.stringify({ generated: new Date().toISOString(), techDebt }, null, 2);
      mimeType = 'application/json';
    } else {
      reportContent = `# Tech Debt Report\n\nGenerated: ${new Date().toISOString()}\n\n| Area | Severity | Description |\n|------|----------|-------------|\n${techDebt.map(d => `| ${d.area} | ${d.severity} | ${d.description} |`).join('\n')}\n`;
      mimeType = 'text/markdown';
    }
  } else {
    // Generic report for investor/audit
    const projectInfo = {
      name: ProjectRoot.split('/').pop() || 'Unknown Project',
      generated: new Date().toISOString(),
      type,
      summary: `${type} report for ${ProjectRoot.split('/').pop()}`
    };

    if (format === 'json') {
      reportContent = JSON.stringify(projectInfo, null, 2);
    } else {
      reportContent = `# ${type.charAt(0).toUpperCase() + type.slice(1)} Report\n\nGenerated: ${new Date().toISOString()}\n\nProject: ${projectInfo.name}\n\n## Summary\n\n${projectInfo.summary}\n`;
    }
  }

  return {
    content: [{
      type: 'text',
      text: reportContent
    }]
  };
}

export async function pipelineInfoHandler() {
  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        pipeline: {
          stages: [
            { name: 'router', description: 'Initial request routing' },
            { name: 'create_project', description: 'Project creation and setup' },
            { name: 'prd', description: 'Product Requirements Document' },
            { name: 'adr', description: 'Architecture Decision Record' },
            { name: 'plan', description: 'Implementation planning' },
            { name: 'tasks', description: 'Task breakdown and assignment' },
            { name: 'ux_research', description: 'User experience research' },
            { name: 'design_ui', description: 'UI/UX design' },
            { name: 'audio_create', description: 'Audio production' },
            { name: 'video_create', description: 'Video production' },
            { name: 'image_create', description: 'Image creation' },
            { name: 'game_create', description: 'Game development' },
            { name: 'dev', description: 'Development' },
            { name: 'security', description: 'Security review' },
            { name: 'qa', description: 'Quality assurance' },
            { name: 'review', description: 'Code review' },
            { name: 'release', description: 'Release preparation' },
            { name: 'postmortem', description: 'Post-mortem analysis' }
          ],
          transitions: STAGE_TRANSITIONS
        }
      }, null, 2)
    }]
  };
}
