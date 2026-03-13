#!/usr/bin/env node

/**
 * AI Office CLI
 *
 * Command-line interface for AI Office framework.
 * Works with both source (bun/ts-node) and compiled (dist/) output.
 */

import { Command } from 'commander';
import { VERSION } from '../src/version.js';
import { installHandler } from '../src/mcp-server/tools/install.js';
import { uninstallHandler } from '../src/mcp-server/tools/uninstall.js';
import { updateHandler } from '../src/mcp-server/tools/update.js';
import { doctorHandler } from '../src/mcp-server/tools/doctor.js';
import { mcpServerCommand } from '../src/mcp-server/index.js';

const program = new Command();

/**
 * Print a structured CLI result from a tool handler response.
 */
function printResult(result: any, exitOnFail = true) {
  if (result?.content) {
    try {
      const response = JSON.parse(result.content[0].text);
      if (response.success) {
        console.log('✅', response.message);
      } else {
        console.error('❌', response.message);
        if (response.requiresInput) {
          console.log('\n📋 Options:');
          response.options?.forEach((opt: any) => {
            console.log(`  ${opt.value}: ${opt.label}`);
          });
          if (response.example) {
            console.log(`\nExample: ${response.example}`);
          }
        }
        if (exitOnFail) process.exit(1);
      }
    } catch {
      // Result is not JSON-wrapped, print directly
      if (result.success === false) {
        console.error('❌', result.message || 'Operation failed');
        if (exitOnFail) process.exit(1);
      } else {
        console.log('✅', result.message || 'Operation completed');
      }
    }
  } else if (result?.success !== undefined) {
    // Direct result object (e.g. from update handler)
    if (result.success) {
      console.log('✅', result.message);
      if (result.updatedComponents?.length) {
        console.log('  Updated:', result.updatedComponents.join(', '));
      }
    } else {
      console.error('❌', result.message);
      if (result.errors?.length) {
        result.errors.forEach((e: string) => console.error('  -', e));
      }
      if (exitOnFail) process.exit(1);
    }
  }
}

program
  .name('ai-office')
  .description('AI Office Framework CLI — Install, manage, and run AI Office MCP server')
  .version(VERSION);

// ── serve (MCP server) ──────────────────────────────────────────────
program
  .command('serve')
  .description('Start the AI Office MCP server (stdio transport)')
  .option('--stdio', 'Use stdio transport (default)', true)
  .option('-v, --verbose', 'Verbose logging')
  .action(async (options) => {
    await mcpServerCommand({ stdio: true, verbose: options.verbose });
  });

// ── install ─────────────────────────────────────────────────────────
program
  .command('install')
  .description('Install AI Office framework in current project')
  .option('-t, --target <path>', 'Target directory', '.')
  .option('--headquarters', 'Install with headquarters structure')
  .option('-i, --ide <ide>', 'IDE type (windsurf, cursor, antigravity, vscode)')
  .action(async (options) => {
    const result = await installHandler.install(options);
    printResult(result);
  });

// ── init (alias for install) ────────────────────────────────────────
program
  .command('init')
  .description('Initialize new AI Office project (alias for install)')
  .option('-t, --target <path>', 'Target directory', '.')
  .option('--headquarters', 'Install with headquarters structure')
  .option('-i, --ide <ide>', 'IDE type (windsurf, cursor, antigravity, vscode)')
  .action(async (options) => {
    const result = await installHandler.install(options);
    printResult(result);
  });

// ── uninstall ───────────────────────────────────────────────────────
program
  .command('uninstall')
  .description('Uninstall AI Office framework from current project')
  .option('-t, --target <path>', 'Target directory', '.')
  .option('-f, --force', 'Force removal without confirmation')
  .action(async (options) => {
    const result = await uninstallHandler.uninstall(options);
    printResult(result);
  });

// ── update ──────────────────────────────────────────────────────────
program
  .command('update')
  .description('Update AI Office framework in current project')
  .option('-t, --target <path>', 'Target directory', '.')
  .option('-i, --ide <ide>', 'IDE type (windsurf, cursor, antigravity, vscode, all)', 'all')
  .action(async (options) => {
    const result = await updateHandler.update(options);
    printResult(result);
  });

// ── doctor ──────────────────────────────────────────────────────────
program
  .command('doctor')
  .description('Check AI Office framework installation health')
  .option('-t, --target <path>', 'Target directory', '.')
  .option('-v, --verbose', 'Show detailed check results')
  .action(async (options) => {
    const result = await doctorHandler.doctor(options);
    printResult(result);
  });

// Parse command line arguments
program.parse();

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.help();
}
