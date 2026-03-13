/**
 * Update Tool Handler
 *
 * Updates the AI Office framework in a target project.
 */

import { z } from 'zod';
import { writeFile, cp } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { getFrameworkSourceRoot, getMcpServerCommand } from '../../package-root.js';

const ProjectRoot = process.env.AI_OFFICE_PROJECT_ROOT || process.cwd();

type SupportedIDE = 'windsurf' | 'cursor' | 'antigravity' | 'vscode';

const IDE_CONFIGS: Record<SupportedIDE, {
  dirName: string;
  configFile: string;
  formatConfig: (mcpCmd: { command: string; args: string[] }) => object;
}> = {
  windsurf: {
    dirName: '.windsurf',
    configFile: 'mcp_config.json',
    formatConfig: (mcpCmd) => ({
      mcpServers: {
        'ai-office': { command: mcpCmd.command, args: mcpCmd.args }
      }
    })
  },
  cursor: {
    dirName: '.cursor',
    configFile: 'mcp.json',
    formatConfig: (mcpCmd) => ({
      mcpServers: {
        'ai-office': { command: mcpCmd.command, args: mcpCmd.args }
      }
    })
  },
  antigravity: {
    dirName: '.antigravity',
    configFile: 'mcp_config.json',
    formatConfig: (mcpCmd) => ({
      mcpServers: {
        'ai-office': { command: mcpCmd.command, args: mcpCmd.args }
      }
    })
  },
  vscode: {
    dirName: '.vscode',
    configFile: 'mcp.json',
    formatConfig: (mcpCmd) => ({
      servers: {
        'ai-office': { type: 'stdio', command: mcpCmd.command, args: mcpCmd.args }
      }
    })
  }
};

const UpdateSchema = z.object({
  target: z.string().default('.'),
  ide: z.enum(['windsurf', 'cursor', 'antigravity', 'vscode', 'all']).default('all')
});

export const updateHandler = {
  async update(args: unknown) {
    const opts = UpdateSchema.parse(args);

    try {
      const targetDir = opts.target === '.' ? ProjectRoot : opts.target;
      const frameworkSource = getFrameworkSourceRoot();

      console.log('\n━━━ AI Office Framework — Update ━━━');
      console.log(`\nFramework source: ${frameworkSource}`);
      console.log(`Target project:   ${targetDir}\n`);

      const aiOfficeDir = join(targetDir, '.ai-office');
      if (!existsSync(aiOfficeDir)) {
        return {
          success: false,
          message: '❌ No .ai-office/ found. Run install first.',
          notInstalled: true
        };
      }

      const updatedComponents: string[] = [];
      const errors: string[] = [];

      // Update project-specific files
      const projectFilesToCopy = [
        'office-config.md',
        'software-mcp-proposals.md'
      ];

      for (const file of projectFilesToCopy) {
        const src = join(frameworkSource, file);
        const dst = join(targetDir, '.ai-office', file);
        if (existsSync(src)) {
          try {
            await cp(src, dst, { recursive: true });
            updatedComponents.push(file);
          } catch (error) {
            errors.push(`Failed to update ${file}: ${error}`);
          }
        }
      }

      // Update agencies and agents
      for (const dir of ['agencies', 'agents']) {
        const src = join(frameworkSource, 'core', dir);
        const dst = join(targetDir, '.ai-office', dir);
        if (existsSync(src)) {
          try {
            await cp(src, dst, { recursive: true });
            updatedComponents.push(`${dir}/`);
          } catch (error) {
            errors.push(`Failed to update ${dir}: ${error}`);
          }
        }
      }

      // Update templates
      const templatesSrc = join(frameworkSource, 'core', 'templates');
      const templatesDst = join(targetDir, '.ai-office', 'templates');
      if (existsSync(templatesSrc)) {
        try {
          await cp(templatesSrc, templatesDst, { recursive: true });
          updatedComponents.push('templates/');
        } catch (error) {
          errors.push(`Failed to update templates: ${error}`);
        }
      }

      // Update IDE-specific components
      const allIDEs: SupportedIDE[] = ['windsurf', 'cursor', 'antigravity', 'vscode'];
      const ideTypes: SupportedIDE[] = opts.ide === 'all' ? allIDEs : [opts.ide as SupportedIDE];

      for (const ide of ideTypes) {
        try {
          await updateIDESpecific(targetDir, ide);
          updatedComponents.push(`${ide} config`);
        } catch (error) {
          errors.push(`Failed to update ${ide} config: ${error}`);
        }
      }

      return {
        success: errors.length === 0,
        message: errors.length === 0
          ? '✅ AI Office framework updated successfully!'
          : '⚠ AI Office framework updated with some errors.',
        updatedComponents,
        errors: errors.length > 0 ? errors : undefined,
        warning: errors.length > 0 ? 'Some components could not be updated.' : undefined
      };

    } catch (error) {
      return {
        success: false,
        message: `❌ Update failed: ${error}`,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
};

/**
 * Update IDE-specific components (rules, workflows, skills, MCP config).
 */
async function updateIDESpecific(targetDir: string, ide: SupportedIDE) {
  const ideConfig = IDE_CONFIGS[ide];
  const ideDir = join(targetDir, ideConfig.dirName);

  // Only update if the IDE directory exists (don't create new ones during update)
  if (!existsSync(ideDir)) return;

  const frameworkSource = getFrameworkSourceRoot();

  // Update IDE-related files (workflows, skills, rules)
  const ideFilesToCopy = [
    'core/workflows',
    'core/skills',
    'core/rules'
  ];

  for (const file of ideFilesToCopy) {
    const src = join(frameworkSource, file);
    const dst = join(ideDir, file.replace('core/', ''));
    if (existsSync(src)) {
      await cp(src, dst, { recursive: true });
    }
  }

  // Update MCP config
  const mcpCmd = getMcpServerCommand();
  const config = ideConfig.formatConfig(mcpCmd);

  await writeFile(
    join(ideDir, ideConfig.configFile),
    JSON.stringify(config, null, 2)
  );
}
