/**
 * Custom Markdown Scripts Tool Handler
 *
 * Allows execution of custom automation scripts written in markdown format
 * that LLMs can understand and execute step by step
 */

import { z } from 'zod';
import { readFile, writeFile } from 'fs/promises';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const ProjectRoot = process.cwd();

const ScriptsSchema = z.object({
  action: z.enum(['list', 'run', 'create', 'validate']).default('list'),
  name: z.string().optional(),
  content: z.string().optional(),
  dryRun: z.boolean().default(false)
});

interface ScriptStep {
  id: string;
  description: string;
  type: 'command' | 'file' | 'check' | 'prompt';
  content: string;
  condition?: string;
}

interface ParsedScript {
  title: string;
  description: string;
  steps: ScriptStep[];
  metadata: Record<string, unknown>;
}

class ScriptManager {
  private scriptsDir: string;

  constructor(projectRoot: string) {
    this.scriptsDir = join(projectRoot, '.ai-office', 'scripts');
    if (!existsSync(this.scriptsDir)) {
      mkdirSync(this.scriptsDir, { recursive: true });
    }
  }

  /**
   * Parse markdown script into structured format
   */
  parseScript(content: string): ParsedScript {
    const lines = content.split('\n');
    const script: ParsedScript = {
      title: 'Untitled Script',
      description: '',
      steps: [],
      metadata: {}
    };

    let currentSection = 'header';
    let stepId = 1;
    let currentStep: Partial<ScriptStep> | null = null;

    for (const line of lines) {
      const trimmed = line.trim();

      // Parse frontmatter
      if (trimmed.startsWith('---') && currentSection === 'header') {
        currentSection = 'frontmatter';
        continue;
      }
      if (trimmed.startsWith('---') && currentSection === 'frontmatter') {
        currentSection = 'body';
        continue;
      }
      if (currentSection === 'frontmatter' && trimmed.includes(':')) {
        const [key, ...valueParts] = trimmed.split(':');
        const value = valueParts.join(':').trim();
        if (key === 'title') script.title = value;
        else if (key === 'description') script.description = value;
        else if (key) script.metadata[key.trim()] = value;
        continue;
      }

      // Parse steps
      if (trimmed.startsWith('## Step') || trimmed.startsWith('### Step')) {
        if (currentStep) {
          script.steps.push({
            id: `step-${stepId++}`,
            description: currentStep.description || '',
            type: currentStep.type || 'command',
            content: currentStep.content || '',
            condition: currentStep.condition
          });
        }
        currentStep = {
          description: trimmed.replace(/^(##|###) Step\s*[0-9]*:\s*/, ''),
          type: 'command',
          content: ''
        };
        continue;
      }

      // Parse step type
      if (currentStep && trimmed.startsWith('**Type:**')) {
        const type = trimmed.replace('**Type:**', '').trim();
        currentStep.type = type as ScriptStep['type'];
        continue;
      }

      // Parse step condition
      if (currentStep && trimmed.startsWith('**If:**')) {
        currentStep.condition = trimmed.replace('**If:**', '').trim();
        continue;
      }

      // Parse step content
      if (currentStep && (trimmed.startsWith('```') || trimmed.startsWith('>>>'))) {
        const codeBlock = [];
        let foundEnd = false;

        // Look for code block content
        for (let i = lines.indexOf(line) + 1; i < lines.length; i++) {
          const nextLine = lines[i];
          if (nextLine?.trim() === '```' || nextLine?.trim() === '<<<') {
            foundEnd = true;
            break;
          }
          if (nextLine) codeBlock.push(nextLine);
        }

        if (foundEnd) {
          currentStep.content = codeBlock.join('\n').trim();
        }
      }
    }

    // Add last step
    if (currentStep) {
      script.steps.push({
        id: `step-${stepId}`,
        description: currentStep.description || '',
        type: currentStep.type || 'command',
        content: currentStep.content || '',
        condition: currentStep.condition
      });
    }

    return script;
  }

  /**
   * Execute a parsed script
   */
  async executeScript(script: ParsedScript, dryRun: boolean = false): Promise<string> {
    let output = `# Executing: ${script.title}\n\n`;
    output += `**Description:** ${script.description}\n\n`;

    for (const step of script.steps) {
      output += `## ${step.description}\n\n`;

      // Check condition
      if (step.condition) {
        const conditionMet = this.evaluateCondition(step.condition);
        if (!conditionMet) {
          output += `⏭️  Skipped (condition not met: ${step.condition})\n\n`;
          continue;
        }
      }

      if (dryRun) {
        output += `**Type:** ${step.type}\n`;
        output += `**Content:**\n\`\`\`\n${step.content}\n\`\`\`\n`;
        output += '🔍 *Dry run - would execute this step*\n\n';
      } else {
        try {
          const result = await this.executeStep(step);
          output += '✅ **Success**\n';
          if (result) {
            output += `**Output:**\n\`\`\`\n${result}\n\`\`\`\n`;
          }
        } catch (error) {
          output += `❌ **Error:** ${error}\n`;
          // Continue with next steps
        }
      }
      output += '\n';
    }

    return output;
  }

  /**
   * Execute a single step
   */
  private async executeStep(step: ScriptStep): Promise<string> {
    switch (step.type) {
      case 'command':
        return execSync(step.content, {
          encoding: 'utf-8',
          cwd: ProjectRoot,
          stdio: 'pipe'
        });

      case 'file': {
        const filePath = step.content.split('\n')[0]?.trim() || '';
        if (!filePath) throw new Error('No file path specified');

        if (step.content.includes('CREATE')) {
          const fileContent = step.content.split('\n').slice(1).join('\n');
          await writeFile(filePath, fileContent, 'utf-8');
          return `Created file: ${filePath}`;
        } else if (step.content.includes('DELETE')) {
          execSync(`rm ${filePath}`, { stdio: 'pipe' });
          return `Deleted file: ${filePath}`;
        }
        return `File operation: ${filePath}`;
      }

      case 'check':
        // Check if file exists, command succeeds, etc.
        if (step.content.includes('exists')) {
          const file = step.content.replace('exists', '').trim();
          return existsSync(file) ? '✅ File exists' : '❌ File not found';
        }
        return 'Check completed';

      case 'prompt':
        // Return prompt for LLM to handle
        return `🤖 **LLM Prompt:** ${step.content}`;

      default:
        throw new Error(`Unknown step type: ${step.type}`);
    }
  }

  /**
   * Evaluate simple conditions
   */
  private evaluateCondition(condition: string): boolean {
    // Simple condition evaluation
    if (condition.includes('file exists')) {
      const file = condition.replace('file exists', '').trim();
      return existsSync(file);
    }
    if (condition.includes('env')) {
      const parts = condition.split('==');
      if (parts.length === 2) {
        const key = parts[0]?.trim();
        const value = parts[1]?.trim();
        if (key) return process.env[key] === value;
      }
    }
    return true; // Default to true for unknown conditions
  }

  /**
   * List available scripts
   */
  listScripts(): string[] {
    if (!existsSync(this.scriptsDir)) return [];

    const scripts: string[] = [];
    const files = readdirSync(this.scriptsDir);

    for (const file of files) {
      if (file.endsWith('.md')) {
        scripts.push(file.replace('.md', ''));
      }
    }

    return scripts.sort();
  }

  /**
   * Load a script by name
   */
  async loadScript(name: string): Promise<ParsedScript | null> {
    const scriptPath = join(this.scriptsDir, `${name}.md`);

    if (!existsSync(scriptPath)) {
      return null;
    }

    const content = await readFile(scriptPath, 'utf-8');
    return this.parseScript(content);
  }

  /**
   * Save a script
   */
  async saveScript(name: string, content: string): Promise<void> {
    const scriptPath = join(this.scriptsDir, `${name}.md`);
    await writeFile(scriptPath, content, 'utf-8');
  }
}

export async function listScriptsHandler(args: unknown): Promise<any> {
  const manager = new ScriptManager(ProjectRoot);

  const scripts = manager.listScripts();

  let content = '# Available Scripts\n\n';

  if (scripts.length === 0) {
    content += 'No scripts found. Create one with `ai_office_scripts --action=create`.\n';
  } else {
    scripts.forEach(name => {
      content += `- **${name}**\n`;
    });
  }

  return {
    content: [{
      type: 'text',
      text: content
    }]
  };
}

export async function runScriptHandler(args: unknown): Promise<any> {
  const opts = ScriptsSchema.parse(args);
  const manager = new ScriptManager(ProjectRoot);

  if (!opts.name) {
    throw new Error('Script name is required for run action');
  }

  const script = await manager.loadScript(opts.name);
  if (!script) {
    throw new Error(`Script not found: ${opts.name}`);
  }

  const result = await manager.executeScript(script, opts.dryRun);

  return {
    content: [{
      type: 'text',
      text: result
    }]
  };
}

export async function createScriptHandler(args: unknown): Promise<any> {
  const opts = ScriptsSchema.parse(args);
  const manager = new ScriptManager(ProjectRoot);

  if (!opts.name) {
    return {
      content: [{
        type: 'text',
        text: `# Create Custom Script

## Template

\`\`\`markdown
---
title: My Custom Script
description: What this script does
---

## Step 1: Setup
**Type:** command

\`\`\`
# Your command here
\`\`\`

## Step 2: Create File
**Type:** file

CREATE src/example.ts
\`\`\`
// File content here
\`\`\`

## Step 3: Verify
**Type:** check

Check if file exists src/example.ts

## Step 4: LLM Task
**Type:** prompt

Please review the created file and suggest improvements
\`\`\`

Use \`ai_office_scripts --action=run --name=my-script\` to execute.
`
      }]
    };
  }

  if (!opts.content) {
    throw new Error('Content is required when creating a script');
  }

  await manager.saveScript(opts.name, opts.content);

  return {
    content: [{
      type: 'text',
      text: `✅ Script "${opts.name}" created successfully!\n\nRun it with:\n\`ai_office_scripts --action=run --name=${opts.name}\`\n`
    }]
  };
}

export async function validateScriptHandler(args: unknown): Promise<any> {
  const opts = ScriptsSchema.parse(args);
  const manager = new ScriptManager(ProjectRoot);

  if (!opts.name) {
    throw new Error('Script name is required for validate action');
  }

  const script = await manager.loadScript(opts.name);
  if (!script) {
    throw new Error(`Script not found: ${opts.name}`);
  }

  let content = `# Script Validation: ${script.title}\n\n`;
  content += `**Description:** ${script.description}\n\n`;
  content += `**Steps:** ${script.steps.length}\n\n`;

  script.steps.forEach((step, index) => {
    content += `## Step ${index + 1}: ${step.description}\n`;
    content += `- **Type:** ${step.type}\n`;
    content += `- **Content:** ${step.content.substring(0, 100)}${step.content.length > 100 ? '...' : ''}\n`;
    if (step.condition) {
      content += `- **Condition:** ${step.condition}\n`;
    }
    content += '\n';
  });

  return {
    content: [{
      type: 'text',
      text: content
    }]
  };
}
