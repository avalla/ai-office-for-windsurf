/**
 * Status Tool Handlers
 *
 * Manages project status files.
 */

import { z } from 'zod';
import { join } from 'path';
import { existsSync, readFileSync, writeFileSync, readdirSync, mkdirSync } from 'fs';

const ProjectRoot = process.cwd();

const GetStatusSchema = z.object({
  slug: z.string()
});

const SetStatusSchema = z.object({
  slug: z.string(),
  state: z.enum(['router', 'create_project', 'prd', 'adr', 'plan', 'tasks', 'ux_research', 'design_ui', 'audio_create', 'video_create', 'image_create', 'game_create', 'dev', 'security', 'qa', 'review', 'release', 'postmortem']),
  owner: z.string().optional(),
  notes: z.string().optional()
});

export const statusHandler = {
  async getStatus(_args: unknown) {
    const { slug } = GetStatusSchema.parse(_args);
    const statusFile = join(ProjectRoot, '.ai-office', 'docs', 'runbooks', `${slug}-status.md`);

    if (!existsSync(statusFile)) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            error: 'Status file not found',
            slug,
            path: statusFile
          }, null, 2)
        }]
      };
    }

    const content = readFileSync(statusFile, 'utf-8');

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          slug,
          content,
          exists: true
        }, null, 2)
      }]
    };
  },

  async setStatus(args: unknown) {
    const { slug, state, owner, notes } = SetStatusSchema.parse(args);
    const statusFile = join(ProjectRoot, '.ai-office', 'docs', 'runbooks', `${slug}-status.md`);
    const statusDir = join(ProjectRoot, '.ai-office', 'docs', 'runbooks');

    // Ensure directory exists
    if (!existsSync(statusDir)) {
      mkdirSync(statusDir, { recursive: true });
    }

    const statusContent = `# ${slug} - Status

## Current State
**State:** ${state}
**Owner:** ${owner || 'TBD'}
**Updated:** ${new Date().toISOString().split('T')[0]}

${notes ? `## Notes\n${notes}\n` : ''}

## Review Log
| Date | Reviewer | State | Evidence |
|------|----------|-------|----------|
| ${new Date().toISOString().split('T')[0]} | ${owner || 'system'} | ${state} | Status updated via MCP |
`;

    writeFileSync(statusFile, statusContent, 'utf-8');

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          success: true,
          slug,
          state,
          message: 'Status updated successfully'
        }, null, 2)
      }]
    };
  },

  async listStatus() {
    const runbooksDir = join(ProjectRoot, '.ai-office', 'docs', 'runbooks');
    const statusDir = join(ProjectRoot, '.ai-office', 'status');

    const files: string[] = [];

    // Check runbooks directory
    if (existsSync(runbooksDir)) {
      const runbookFiles = readdirSync(runbooksDir).filter(f => f.endsWith('-status.md'));
      files.push(...runbookFiles);
    }

    // Check status directory
    if (existsSync(statusDir)) {
      const statusFiles = readdirSync(statusDir).filter(f => f.endsWith('.md'));
      files.push(...statusFiles);
    }

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          count: files.length,
          files,
          directories: {
            runbooks: runbooksDir,
            status: statusDir
          },
          message: files.length > 0 ? `Found ${files.length} status files` : 'No status files found'
        }, null, 2)
      }]
    };
  }
};
