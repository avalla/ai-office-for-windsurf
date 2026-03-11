/**
 * Doctor Tool Handler
 *
 * Checks the health of an AI Office framework installation.
 */

import { z } from 'zod';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { getPackageRoot, isFrameworkAccessible, getFrameworkSourceRoot } from '../../package-root.js';

const ProjectRoot = process.env.AI_OFFICE_PROJECT_ROOT || process.cwd();

const DoctorSchema = z.object({
  target: z.string().default('.'),
  verbose: z.boolean().default(false)
});

export const doctorHandler = {
  async doctor(args: unknown) {
    const opts = DoctorSchema.parse(args);

    try {
      const targetDir = opts.target === '.' ? ProjectRoot : opts.target;

      console.log('\n━━━ AI Office Framework — Doctor ━━━');
      console.log(`\nChecking project: ${targetDir}\n`);

      const checks = [];
      let overallHealth = 'healthy';

      // Check 1: .ai-office directory exists
      const aiOfficeDir = join(targetDir, '.ai-office');
      const aiOfficeExists = existsSync(aiOfficeDir);
      checks.push({
        name: '.ai-office directory',
        status: aiOfficeExists ? 'pass' : 'fail',
        message: aiOfficeExists ? '✅ Directory exists' : '❌ Directory not found',
        path: aiOfficeDir
      });

      if (!aiOfficeExists) {
        overallHealth = 'unhealthy';
      }

      // Check 2: Essential subdirectories
      if (aiOfficeExists) {
        const essentialDirs = ['agencies', 'agents', 'tasks', 'templates'];
        for (const dir of essentialDirs) {
          const dirPath = join(aiOfficeDir, dir);
          const dirExists = existsSync(dirPath);
          checks.push({
            name: `${dir} directory`,
            status: dirExists ? 'pass' : 'warn',
            message: dirExists ? `✅ ${dir}/ exists` : `⚠️ ${dir}/ missing`,
            path: dirPath
          });
        }
      }

      // Check 3: Task board structure
      if (aiOfficeExists) {
        const tasksDir = join(aiOfficeDir, 'tasks');
        const taskStates = ['BACKLOG', 'TODO', 'WIP', 'REVIEW', 'REJECTED', 'DONE', 'ARCHIVED'];
        const missingStates = [];

        for (const state of taskStates) {
          const stateDir = join(tasksDir, state);
          if (!existsSync(stateDir)) {
            missingStates.push(state);
          }
        }

        checks.push({
          name: 'Task board structure',
          status: missingStates.length === 0 ? 'pass' : 'warn',
          message: missingStates.length === 0
            ? '✅ All task states exist'
            : `⚠️ Missing task states: ${missingStates.join(', ')}`,
          missing: missingStates
        });
      }

      // Check 4: Configuration files
      if (aiOfficeExists) {
        const configFiles = ['office-config.md', 'software-mcp-proposals.md'];
        for (const file of configFiles) {
          const filePath = join(aiOfficeDir, file);
          const fileExists = existsSync(filePath);
          checks.push({
            name: `Config file: ${file}`,
            status: fileExists ? 'pass' : 'warn',
            message: fileExists ? `✅ ${file} exists` : `⚠️ ${file} missing`,
            path: filePath
          });
        }
      }

      // Check 5: IDE configurations
      const ideConfigs = [
        { name: 'Windsurf', dir: '.windsurf', file: 'mcp_config.json', key: 'mcpServers' },
        { name: 'Cursor', dir: '.cursor', file: 'mcp.json', key: 'mcpServers' },
        { name: 'Antigravity', dir: '.antigravity', file: 'mcp_config.json', key: 'mcpServers' },
        { name: 'VS Code', dir: '.vscode', file: 'mcp.json', key: 'servers' }
      ];

      for (const ide of ideConfigs) {
        const ideDir = join(targetDir, ide.dir);
        const configFile = join(ideDir, ide.file);

        if (existsSync(ideDir)) {
          const configExists = existsSync(configFile);
          checks.push({
            name: `${ide.name} MCP config`,
            status: configExists ? 'pass' : 'warn',
            message: configExists
              ? `✅ ${ide.name} MCP config exists`
              : `⚠️ ${ide.name} MCP config missing`,
            path: configFile
          });

          // Check MCP config content if exists
          if (configExists) {
            try {
              const configContent = readFileSync(configFile, 'utf-8');
              const hasValidConfig = configContent.includes('ai-office') &&
                configContent.includes(ide.key);

              checks.push({
                name: `${ide.name} MCP config validity`,
                status: hasValidConfig ? 'pass' : 'warn',
                message: hasValidConfig
                  ? `✅ ${ide.name} config looks valid`
                  : `⚠️ ${ide.name} config may be invalid`
              });
            } catch (error) {
              checks.push({
                name: `${ide.name} MCP config readability`,
                status: 'fail',
                message: `❌ Cannot read ${ide.name} config: ${error}`
              });
            }
          }
        } else {
          checks.push({
            name: `${ide.name} directory`,
            status: 'info',
            message: `ℹ️ ${ide.name} not configured (optional)`
          });
        }
      }

      // Check 6: Framework accessibility
      try {
        const frameworkAccessible = isFrameworkAccessible();
        const frameworkRoot = getFrameworkSourceRoot();
        checks.push({
          name: 'Framework accessibility',
          status: frameworkAccessible ? 'pass' : 'fail',
          message: frameworkAccessible
            ? `✅ Framework source accessible at ${frameworkRoot}`
            : '❌ Framework source not accessible',
          path: frameworkRoot
        });

        // Check package root
        const packageRoot = getPackageRoot();
        checks.push({
          name: 'Package root',
          status: 'pass',
          message: `✅ Package root: ${packageRoot}`,
          path: packageRoot
        });
      } catch (error) {
        checks.push({
          name: 'Framework accessibility',
          status: 'fail',
          message: `❌ Framework check failed: ${error}`
        });
      }

      // Calculate overall health
      const passCount = checks.filter(c => c.status === 'pass').length;
      const failCount = checks.filter(c => c.status === 'fail').length;
      const warnCount = checks.filter(c => c.status === 'warn').length;

      if (failCount > 0) {
        overallHealth = 'unhealthy';
      } else if (warnCount > 0) {
        overallHealth = 'degraded';
      }

      const summary = {
        total: checks.length,
        pass: passCount,
        fail: failCount,
        warn: warnCount,
        info: checks.filter(c => c.status === 'info').length
      };

      const recommendations = getRecommendations(checks);

      // Output results
      console.log(`${overallHealth === 'healthy' ? '✅' : overallHealth === 'degraded' ? '⚠️' : '❌'} ${overallHealth === 'healthy' ? 'Installation is healthy!' : overallHealth === 'degraded' ? 'Installation has warnings' : 'Installation has problems'}`);

      if (opts.verbose) {
        console.log('\n📋 Detailed Checks:');
        checks.filter(c => c.status !== 'info').forEach(check => {
          console.log(`  ${check.message}`);
        });

        if (recommendations.length > 0) {
          console.log('\n💡 Recommendations:');
          recommendations.forEach((rec: string) => {
            console.log(`  • ${rec}`);
          });
        }
      }

      return {
        success: true,
        overallHealth,
        message: overallHealth === 'healthy'
          ? '✅ Installation is healthy!'
          : overallHealth === 'degraded'
            ? '⚠️ Installation has warnings'
            : '❌ Installation has problems',
        summary,
        checks: opts.verbose ? checks : checks.filter(c => c.status !== 'info'),
        recommendations
      };

    } catch (error) {
      return {
        success: false,
        message: `❌ Doctor check failed: ${error}`,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
};

function getRecommendations(checks: any[]): string[] {
  const recommendations = [];

  const failedChecks = checks.filter(c => c.status === 'fail' || c.status === 'warn');

  for (const check of failedChecks) {
    switch (check.name) {
      case '.ai-office directory':
        recommendations.push('Run install command to set up the framework');
        break;
      case 'Task board structure':
        if (check.missing && check.missing.length > 0) {
          recommendations.push('Reinstall to fix task board structure');
        }
        break;
      case 'Windsurf MCP config':
      case 'Cursor MCP config':
      case 'Antigravity MCP config':
      case 'VS Code MCP config':
        recommendations.push(`Update ${check.name} or reinstall IDE configuration`);
        break;
      case 'Framework accessibility':
        recommendations.push('Check framework installation and paths');
        break;
    }
  }

  return [...new Set(recommendations)]; // Remove duplicates
}
