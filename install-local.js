#!/usr/bin/env node

/**
 * AI Office Local Installer
 *
 * Run from AI Office main folder to install framework into a target project.
 * Primary target: Claude Code. Legacy MCP targets also supported.
 *
 * Usage: node install-local.js <target-directory> [target]
 *
 * Targets:
 *   claude-code   Install for Claude Code (default) — copies CLAUDE.md + framework files
 *   windsurf      Install for Windsurf (MCP config)
 *   cursor        Install for Cursor (MCP config)
 *   vscode        Install for VS Code (MCP config)
 *   antigravity   Install for Antigravity (MCP config)
 */

import { writeFileSync, existsSync, mkdirSync, cpSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const aiOfficeRoot = __dirname;

const TARGETS = {
  'claude-code': {
    displayName: 'Claude Code',
    type: 'claude-code'
  },
  windsurf: {
    displayName: 'Windsurf',
    type: 'mcp',
    dir: '.windsurf',
    file: 'mcp_config.json',
    key: 'mcpServers'
  },
  cursor: {
    displayName: 'Cursor',
    type: 'mcp',
    dir: '.cursor',
    file: 'mcp.json',
    key: 'mcpServers'
  },
  vscode: {
    displayName: 'VS Code',
    type: 'mcp',
    dir: '.vscode',
    file: 'mcp.json',
    key: 'servers'
  },
  antigravity: {
    displayName: 'Antigravity',
    type: 'mcp',
    dir: '.antigravity',
    file: 'mcp_config.json',
    key: 'mcpServers'
  }
};

const FRAMEWORK_FILES = {
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

const AI_OFFICE_DIRS = [
  'docs/prd', 'docs/adr', 'docs/qa', 'docs/runbooks',
  'memory',
  'tasks/BACKLOG', 'tasks/TODO', 'tasks/WIP',
  'tasks/REVIEW', 'tasks/DONE'
];

function printUsage() {
  const targetList = Object.entries(TARGETS)
    .map(([k, v]) => `  ${k.padEnd(14)} ${v.displayName}${k === 'claude-code' ? ' (default)' : ''}`)
    .join('\n');

  console.log(`
━━━ AI Office Local Installer ━━━

Usage: node install-local.js <target-directory> [target]

Targets:
${targetList}

Examples:
  node install-local.js ../my-project
  node install-local.js ../my-project claude-code
  node install-local.js ../my-project cursor
`);
}

function resolveTarget(rawPath) {
  if (rawPath.startsWith('~')) {
    return rawPath.replace('~', process.env.HOME);
  }
  if (rawPath.startsWith('/')) {
    return rawPath;
  }
  return join(process.cwd(), rawPath);
}

function ensureDirs(targetDir) {
  AI_OFFICE_DIRS.forEach(dir => {
    mkdirSync(join(targetDir, '.ai-office', dir), { recursive: true });
  });
}

function copyFrameworkFiles(targetDir) {
  console.log('\n  Copying framework files...');
  for (const [src, dst] of Object.entries(FRAMEWORK_FILES)) {
    const srcPath = join(aiOfficeRoot, src);
    const dstPath = join(targetDir, dst);
    if (!existsSync(srcPath)) {
      console.log(`  ! Source not found: ${src}`);
      continue;
    }
    mkdirSync(dirname(dstPath), { recursive: true });
    cpSync(srcPath, dstPath, { recursive: true });
    console.log(`  + ${src} → ${dst}`);
  }
}

function installClaudeCode(targetDir) {
  // Copy framework/CLAUDE.md → CLAUDE.md (the file Claude Code reads)
  const claudeMdSrc = join(aiOfficeRoot, 'framework', 'CLAUDE.md');
  const claudeMdDst = join(targetDir, 'CLAUDE.md');

  if (!existsSync(claudeMdSrc)) {
    console.error('  ! framework/CLAUDE.md not found');
    process.exit(1);
  }

  const alreadyExists = existsSync(claudeMdDst);
  cpSync(claudeMdSrc, claudeMdDst);
  console.log(`  + framework/CLAUDE.md → CLAUDE.md${alreadyExists ? ' (updated)' : ''}`);

  // Copy .claude/commands/ → <target>/.claude/commands/
  const commandsSrc = join(aiOfficeRoot, '.claude', 'commands');
  const commandsDst = join(targetDir, '.claude', 'commands');
  if (existsSync(commandsSrc)) {
    mkdirSync(commandsDst, { recursive: true });
    cpSync(commandsSrc, commandsDst, { recursive: true });
    console.log('  + .claude/commands/ → .claude/commands/');
  } else {
    console.log('  ! .claude/commands/ not found — skipping slash commands');
  }

  ensureDirs(targetDir);
  copyFrameworkFiles(targetDir);

  console.log('\n  Next steps:');
  console.log(`  1. Open Claude Code in: ${targetDir}`);
  console.log('  2. Run /office to get started');
}

function installMcp(targetDir, target) {
  const distPath = join(aiOfficeRoot, 'dist', 'src', 'mcp-server', 'index.js');
  if (!existsSync(distPath)) {
    console.error('  ! AI Office is not built. Run "bun run build" first.');
    process.exit(1);
  }

  ensureDirs(targetDir);
  copyFrameworkFiles(targetDir);

  const mcpConfig = {
    [target.key]: {
      'ai-office': {
        command: 'node',
        args: [distPath, '--stdio']
      }
    }
  };

  const configPath = join(targetDir, target.dir, target.file);
  mkdirSync(dirname(configPath), { recursive: true });
  writeFileSync(configPath, JSON.stringify(mcpConfig, null, 2));
  console.log(`  + MCP config → ${target.dir}/${target.file}`);

  console.log('\n  Next steps:');
  console.log(`  1. Open ${target.displayName} in: ${targetDir}`);
  console.log('  2. Ensure MCP is enabled — the ai-office server will be available');
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printUsage();
    process.exit(0);
  }

  const rawPath = args[0];
  const targetKey = args[1] || 'claude-code';

  if (!TARGETS[targetKey]) {
    console.error(`  ! Unknown target: ${targetKey}`);
    console.error(`  Supported: ${Object.keys(TARGETS).join(', ')}`);
    process.exit(1);
  }

  const targetDir = resolveTarget(rawPath);

  if (!existsSync(targetDir)) {
    console.error(`  ! Directory not found: ${targetDir}`);
    process.exit(1);
  }

  const target = TARGETS[targetKey];

  console.log('\n━━━ AI Office Installer ━━━');
  console.log(`\n  Target : ${targetDir}`);
  console.log(`  Mode   : ${target.displayName}`);
  console.log(`  Source : ${aiOfficeRoot}`);

  if (target.type === 'claude-code') {
    installClaudeCode(targetDir);
  } else {
    installMcp(targetDir, target);
  }

  console.log('\n  Done.\n');
}

main();
