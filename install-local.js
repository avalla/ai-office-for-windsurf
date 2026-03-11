#!/usr/bin/env node

/**
 * AI Office Local Installer
 *
 * Run from AI Office main folder to install framework into a target project.
 * Copies framework files and generates MCP configuration for the specified IDE.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, cpSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get AI Office root (where this script is located)
const aiOfficeRoot = __dirname;

// Framework structure to copy
const frameworkStructure = {
  'framework/': '.ai-office/framework/',
  'framework/core/agencies/': '.ai-office/agencies/',
  'framework/core/agents/': '.ai-office/agents/',
  'framework/core/templates/': '.ai-office/templates/',
  'framework/core/workflows/': '.ai-office/workflows/',
  'framework/core/skills/': '.ai-office/skills/',
  'framework/core/rules/': '.ai-office/rules/',
  'framework/office-config.md': '.ai-office/office-config.md',
  'framework/software-mcp-proposals.md': '.ai-office/software-mcp-proposals.md',
  'framework/README.md': '.ai-office/README.md',
  'CHANGELOG.md': '.ai-office/CHANGELOG.md'
};

// IDE configurations
const ideConfigs = {
  windsurf: {
    dir: '.windsurf',
    file: 'mcp_config.json',
    key: 'mcpServers',
    displayName: 'Windsurf'
  },
  cursor: {
    dir: '.cursor',
    file: 'mcp.json',
    key: 'mcpServers',
    displayName: 'Cursor'
  },
  vscode: {
    dir: '.vscode',
    file: 'mcp.json',
    key: 'servers',
    displayName: 'VS Code'
  },
  antigravity: {
    dir: '.antigravity',
    file: 'mcp_config.json',
    key: 'mcpServers',
    displayName: 'Antigravity'
  }
};

function printUsage() {
  console.log(`
━━━ AI Office Local Installer ━━━

Usage: node install-local.js <target-directory> [ide]

Arguments:
  target-directory    Path where AI Office should be installed
  ide                 IDE type (windsurf, cursor, vscode, antigravity)

Examples:
  node install-local.js ../my-project windsurf
  node install-local.js ~/projects/my-app cursor
  node install-local.js ./test-project vscode
`);
}

function promptForIDE() {
  console.log('\nSelect IDE:');
  const ides = Object.keys(ideConfigs);
  ides.forEach((ide, index) => {
    console.log(`  ${index + 1}. ${ideConfigs[ide].displayName} (${ide})`);
  });
  console.log('\nEnter IDE number or name:');
}

function createMCPConfig(targetDir, ide) {
  const config = ideConfigs[ide];
  const mcpConfig = {
    [config.key]: {
      'ai-office': {
        command: 'node',
        args: [join(aiOfficeRoot, 'dist', 'src', 'mcp-server', 'index.js'), '--stdio']
      }
    }
  };

  const configPath = join(targetDir, config.dir, config.file);
  return { configPath, config: mcpConfig };
}

function createDirectoryStructure(targetDir) {
  // Create .ai-office directories
  const aiOfficeDir = join(targetDir, '.ai-office');
  const dirs = [
    'docs', 'memory', 'versions', 'config', 'policies',
    'tasks/BACKLOG', 'tasks/TODO', 'tasks/WIP',
    'tasks/REVIEW', 'tasks/REJECTED', 'tasks/DONE', 'tasks/ARCHIVED'
  ];

  dirs.forEach(dir => {
    const fullPath = join(aiOfficeDir, dir);
    mkdirSync(fullPath, { recursive: true });
  });

  // Create IDE directory
  const ideDir = join(targetDir, '.windsurf'); // Default, will be renamed based on IDE
  mkdirSync(ideDir, { recursive: true });

  // Create tasks README
  const tasksReadme = `# Task Board

| State | Count |
|-------|-------|
| BACKLOG | 0 |
| TODO | 0 |
| WIP | 0 |
| REVIEW | 0 |
| REJECTED | 0 |
| DONE | 0 |
| ARCHIVED | 0 |

Updated: ${new Date().toISOString().split('T')[0]}
`;
  writeFileSync(join(aiOfficeDir, 'tasks', 'README.md'), tasksReadme);
}

function copyFrameworkFiles(targetDir) {
  console.log('\n📁 Copying framework files...');

  Object.entries(frameworkStructure).forEach(([src, dst]) => {
    const srcPath = join(aiOfficeRoot, src);
    const dstPath = join(targetDir, dst);

    if (existsSync(srcPath)) {
      // Ensure destination directory exists
      mkdirSync(dirname(dstPath), { recursive: true });

      if (src.endsWith('/')) {
        // Copy directory
        cpSync(srcPath, dstPath, { recursive: true });
        console.log(`  ✓ Copied ${src} → ${dst}`);
      } else {
        // Copy file
        mkdirSync(dirname(dstPath), { recursive: true });
        cpSync(srcPath, dstPath);
        console.log(`  ✓ Copied ${src} → ${dst}`);
      }
    } else {
      console.log(`  ⚠ Source not found: ${src}`);
    }
  });
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printUsage();
    process.exit(0);
  }

  const targetDir = args[0];
  let ide = args[1];

  // Validate target directory
  if (!targetDir) {
    console.error('❌ Target directory is required');
    printUsage();
    process.exit(1);
  }

  // Resolve target directory (handle ~ and relative paths)
  const resolvedTarget = targetDir.startsWith('~')
    ? targetDir.replace('~', process.env.HOME)
    : join(process.cwd(), targetDir);

  // Get IDE selection
  if (!ide) {
    promptForIDE();
    // For now, default to windsurf
    ide = 'windsurf';
  }

  if (!ideConfigs[ide]) {
    console.error(`❌ Unsupported IDE: ${ide}`);
    console.error(`Supported IDEs: ${Object.keys(ideConfigs).join(', ')}`);
    process.exit(1);
  }

  // Check if AI Office is built
  const distPath = join(aiOfficeRoot, 'dist', 'src', 'mcp-server', 'index.js');
  if (!existsSync(distPath)) {
    console.error('❌ AI Office is not built. Run "npm run build" first.');
    process.exit(1);
  }

  console.log('\n━━━ AI Office Local Installer ━━━');
  console.log(`\n📂 Target directory: ${resolvedTarget}`);
  console.log(`🎨 IDE: ${ideConfigs[ide].displayName}`);
  console.log(`📦 AI Office source: ${aiOfficeRoot}`);

  // Create directory structure
  createDirectoryStructure(resolvedTarget);

  // Copy framework files
  copyFrameworkFiles(resolvedTarget);

  // Generate MCP configuration
  const { configPath, config } = createMCPConfig(resolvedTarget, ide);

  // Create IDE directory if it doesn't exist
  const ideDir = dirname(configPath);
  mkdirSync(ideDir, { recursive: true });

  // Write MCP config
  writeFileSync(configPath, JSON.stringify(config, null, 2));

  console.log('\n🔧 MCP Configuration:');
  console.log(`  IDE: ${ideConfigs[ide].displayName}`);
  console.log(`  Config file: ${configPath}`);
  console.log(`  Command: node ${join(aiOfficeRoot, 'dist/src/mcp-server/index.js')} --stdio`);

  console.log('\n📋 Add this to your IDE:');
  console.log(`  File: ${configPath}`);
  console.log(`  Content:\n${JSON.stringify(config, null, 2)}`);

  console.log('\n✅ Installation completed successfully!');
  console.log(`\n🚀 Next steps:`);
  console.log(`  1. Navigate to your project: cd ${resolvedTarget}`);
  console.log(`  2. Start your IDE and ensure MCP is configured`);
  console.log(`  3. The AI Office MCP server will be available in your IDE`);
}

// Run the installer
main();
