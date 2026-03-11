/**
 * Install Tool Handler
 *
 * Installs the AI Office framework into a target project.
 */

import { z } from 'zod';
import { mkdir, writeFile, cp, readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { getPackageRoot, getFrameworkSourceRoot, getMcpServerCommand } from '../../package-root.js';

const ProjectRoot = process.env.AI_OFFICE_PROJECT_ROOT || process.cwd();

type SupportedIDE = 'windsurf' | 'cursor' | 'antigravity' | 'vscode';

const InstallSchema = z.object({
  target: z.string().default('.'),
  headquarters: z.boolean().default(false),
  ide: z.enum(['windsurf', 'cursor', 'antigravity', 'vscode']).optional()
});

/**
 * IDE configuration definitions.
 * Each IDE has a directory name, config file path, and config format.
 */
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
        'ai-office': {
          command: mcpCmd.command,
          args: mcpCmd.args
        }
      }
    })
  },
  cursor: {
    dirName: '.cursor',
    configFile: 'mcp.json',
    formatConfig: (mcpCmd) => ({
      mcpServers: {
        'ai-office': {
          command: mcpCmd.command,
          args: mcpCmd.args
        }
      }
    })
  },
  antigravity: {
    dirName: '.antigravity',
    configFile: 'mcp_config.json',
    formatConfig: (mcpCmd) => ({
      mcpServers: {
        'ai-office': {
          command: mcpCmd.command,
          args: mcpCmd.args
        }
      }
    })
  },
  vscode: {
    dirName: '.vscode',
    configFile: 'mcp.json',
    formatConfig: (mcpCmd) => ({
      servers: {
        'ai-office': {
          type: 'stdio',
          command: mcpCmd.command,
          args: mcpCmd.args
        }
      }
    })
  }
};

/**
 * Detect IDE from environment or existing files.
 * Returns null if no IDE is detected (for interactive selection).
 */
async function detectIDE(targetDir: string): Promise<SupportedIDE | null> {
  // Check for existing IDE-specific directories
  if (existsSync(join(targetDir, '.windsurf'))) return 'windsurf';
  if (existsSync(join(targetDir, '.cursor'))) return 'cursor';
  if (existsSync(join(targetDir, '.antigravity'))) return 'antigravity';
  if (existsSync(join(targetDir, '.vscode'))) return 'vscode';

  // Check for IDE-specific config files
  if (existsSync(join(targetDir, '.windsurf.json'))) return 'windsurf';
  if (existsSync(join(targetDir, '.cursor.json'))) return 'cursor';

  // No IDE detected - return null for interactive selection
  return null;
}

/**
 * Interactive IDE selection prompt
 */
function selectIDE() {
  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        success: false,
        requiresInput: true,
        message: '🤔 Which IDE are you using?',
        prompt: 'Please specify your IDE:',
        options: [
          { value: 'windsurf', label: 'Windsurf' },
          { value: 'cursor', label: 'Cursor' },
          { value: 'antigravity', label: 'Antigravity' },
          { value: 'vscode', label: 'VS Code' }
        ],
        example: 'ai-office install --ide=windsurf'
      }, null, 2)
    }]
  };
}

export const installHandler = {
  async install(args: unknown) {
    const opts = InstallSchema.parse(args);

    try {
      // Priority: 1) explicit target param, 2) AI_OFFICE_PROJECT_ROOT env, 3) cwd
      const targetDir = opts.target !== '.' ? opts.target : ProjectRoot;
      const packageRoot = getPackageRoot();
      const frameworkSource = getFrameworkSourceRoot();

      // Auto-detect IDE if not specified
      let ide: SupportedIDE;

      if (opts.ide) {
        ide = opts.ide;
      } else {
        const detected = await detectIDE(targetDir);
        if (!detected) {
          return selectIDE();
        }
        ide = detected;
      }

      console.log('\n━━━ AI Office Framework — Install ━━━');
      console.log(`\nPackage root:     ${packageRoot}`);
      console.log(`Framework source: ${frameworkSource}`);
      console.log(`Target project:   ${targetDir}`);
      console.log(`IDE detected:      ${ide}\n`);

      // Check if already installed
      const aiOfficeDir = join(targetDir, '.ai-office');
      if (existsSync(aiOfficeDir)) {
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              success: false,
              message: '⚠ .ai-office/ already exists. Use uninstall first.',
              alreadyInstalled: true
            }, null, 2)
          }]
        };
      }

      // Create .ai-office directories
      await mkdir(join(targetDir, '.ai-office', 'docs'), { recursive: true });
      await mkdir(join(targetDir, '.ai-office', 'memory'), { recursive: true });
      await mkdir(join(targetDir, '.ai-office', 'versions'), { recursive: true });
      await mkdir(join(targetDir, '.ai-office', 'config'), { recursive: true });
      await mkdir(join(targetDir, '.ai-office', 'tasks'), { recursive: true });
      await mkdir(join(targetDir, '.ai-office', 'agencies'), { recursive: true });
      await mkdir(join(targetDir, '.ai-office', 'agents'), { recursive: true });
      await mkdir(join(targetDir, '.ai-office', 'templates'), { recursive: true });

      // Create task board structure
      const taskStates = ['BACKLOG', 'TODO', 'WIP', 'REVIEW', 'REJECTED', 'DONE', 'ARCHIVED'];
      for (const state of taskStates) {
        await mkdir(join(targetDir, '.ai-office', 'tasks', state), { recursive: true });
      }

      // Create tasks README
      const tasksReadme = `# Task Board

| State | Count |
|-------|-------|
${taskStates.map(state => `| ${state} | 0 |`).join('\n')}

Updated: ${new Date().toISOString().split('T')[0]}
`;

      await writeFile(join(targetDir, '.ai-office', 'tasks', 'README.md'), tasksReadme);

      // Copy project-specific files to .ai-office
      const projectFilesToCopy = [
        'office-config.md',
        'software-mcp-proposals.md'
      ];

      for (const file of projectFilesToCopy) {
        const src = join(frameworkSource, file);
        const dst = join(targetDir, '.ai-office', file);
        if (existsSync(src)) {
          await cp(src, dst, { recursive: true });
        }
      }

      // Copy agencies and agents to .ai-office
      for (const dir of ['agencies', 'agents']) {
        const src = join(frameworkSource, 'core', dir);
        const dst = join(targetDir, '.ai-office', dir);
        if (existsSync(src)) {
          await cp(src, dst, { recursive: true });
        }
      }

      // Copy templates to .ai-office
      const templatesSrc = join(frameworkSource, 'core', 'templates');
      const templatesDst = join(targetDir, '.ai-office', 'templates');
      if (existsSync(templatesSrc)) {
        await cp(templatesSrc, templatesDst, { recursive: true });
      }

      // Install IDE-specific components
      await installIDESpecific(targetDir, ide);

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: true,
            message: '✅ AI Office framework installed successfully!',
            installedAt: targetDir,
            ide: ide,
            structure: {
              aiOffice: '.ai-office/',
              ideConfig: `${IDE_CONFIGS[ide].dirName}/`
            }
          }, null, 2)
        }]
      };

    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            success: false,
            message: `❌ Installation failed: ${error}`,
            error: error instanceof Error ? error.message : String(error)
          }, null, 2)
        }]
      };
    }
  }
};

/**
 * Install IDE-specific components (rules, workflows, skills, MCP config).
 */
async function installIDESpecific(targetDir: string, ide: SupportedIDE) {
  const ideConfig = IDE_CONFIGS[ide];
  const ideDir = join(targetDir, ideConfig.dirName);
  await mkdir(ideDir, { recursive: true });

  const frameworkSource = getFrameworkSourceRoot();

  // Copy IDE-related files (workflows, skills, rules)
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

  // Customize 00_project.md for this IDE
  const idePrettyName = ide === 'vscode' ? 'VS Code' : ide.charAt(0).toUpperCase() + ide.slice(1);
  await customizeProjectRule(ideDir, idePrettyName);

  // Create MCP config pointing to framework installation
  const mcpCmd = getMcpServerCommand();
  const config = ideConfig.formatConfig(mcpCmd);

  await writeFile(
    join(ideDir, ideConfig.configFile),
    JSON.stringify(config, null, 2)
  );
}

/**
 * Customize the 00_project.md rule file for the specific IDE.
 * Replaces {{IDE_NAME}} template variable with the actual IDE name.
 */
async function customizeProjectRule(ideDir: string, ideName: string) {
  const projectRulePath = join(ideDir, 'rules', '00_project.md');

  if (!existsSync(projectRulePath)) {
    return; // File doesn't exist, skip customization
  }

  const content = await readFile(projectRulePath, 'utf-8');

  // Replace template variable with actual IDE name
  const customized = content.replace(/\{\{IDE_NAME\}\}/g, ideName);

  await writeFile(projectRulePath, customized);
}
