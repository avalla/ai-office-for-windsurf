/**
 * Package Root Resolver
 *
 * Resolves the root directory of the @ai-office/mcp-adapter package,
 * whether running from source (dev) or compiled dist/ (npm install).
 *
 * This is the single source of truth for locating:
 * - The framework/ directory (templates, agencies, agents, etc.)
 * - The package.json
 * - Any other package-level assets
 */

import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

/* eslint-disable no-undef */

const PACKAGE_NAME = '@ai-office/mcp-adapter';

let _cachedPackageRoot: string | null = null;

/**
 * Get the root directory of the @ai-office/mcp-adapter package.
 *
 * Resolution strategy:
 * 1. Walk up from the current file's directory
 * 2. Find the nearest package.json with our package name
 * 3. Cache the result for subsequent calls
 *
 * Works in both:
 * - Development: src/package-root.ts → repo root
 * - Compiled: dist/package-root.js → repo root (same level)
 * - npm install: node_modules/@ai-office/mcp-adapter/dist/package-root.js → package root
 */
export function getPackageRoot(): string {
  if (_cachedPackageRoot) return _cachedPackageRoot;

  // Get the directory of THIS file
  const currentFile = fileURLToPath(import.meta.url);
  const dir = dirname(currentFile);

  // Walk up to find our package.json
  const root = findPackageRoot(dir);
  if (root) {
    _cachedPackageRoot = root;
    return root;
  }

  // Fallback: try relative to current file
  // In dev: src/ → go up 1 level
  // In dist: dist/ → go up 1 level
  const parent = dirname(dir);
  if (existsSync(join(parent, 'package.json'))) {
    _cachedPackageRoot = parent;
    return parent;
  }

  // Last resort: use process.cwd()
  _cachedPackageRoot = process.cwd();
  return _cachedPackageRoot;
}

/**
 * Get the framework directory containing templates, agencies, etc.
 */
export function getFrameworkSourceRoot(): string {
  return join(getPackageRoot(), 'framework');
}

/**
 * Get the framework core directory.
 */
export function getFrameworkCoreRoot(): string {
  return join(getFrameworkSourceRoot(), 'core');
}

/**
 * Get the project root where .ai-office/ is installed.
 * Uses AI_OFFICE_PROJECT_ROOT env var or falls back to cwd.
 */
export function getProjectRoot(): string {
  return process.env.AI_OFFICE_PROJECT_ROOT || process.cwd();
}

/**
 * Check if the framework directory exists and is accessible.
 */
export function isFrameworkAccessible(): boolean {
  const frameworkRoot = getFrameworkSourceRoot();
  return existsSync(frameworkRoot) && existsSync(join(frameworkRoot, 'core'));
}

/**
 * Get the MCP server command for IDE configurations.
 * Returns the appropriate command and args based on how the package is installed.
 */
export function getMcpServerCommand(): { command: string; args: string[] } {
  const packageRoot = getPackageRoot();

  // Check if we're running from a global npm install or npx
  const isInNodeModules = packageRoot.includes('node_modules');
  const hasBunLock = existsSync(join(packageRoot, 'bun.lock')) || existsSync(join(packageRoot, 'bun.lockb'));

  if (isInNodeModules) {
    // Installed as npm package — use npx
    return {
      command: 'npx',
      args: ['-y', PACKAGE_NAME, 'serve', '--stdio']
    };
  }

  if (hasBunLock) {
    // Development with bun
    return {
      command: 'bun',
      args: ['run', join(packageRoot, 'src', 'mcp-server', 'index.ts'), '--stdio']
    };
  }

  // Development with node — use the compiled entry
  return {
    command: 'node',
    args: [join(packageRoot, 'dist', 'mcp-server', 'index.js'), '--stdio']
  };
}

/**
 * Walk up from a directory to find the package root (directory containing
 * package.json with our package name).
 */
function findPackageRoot(startDir: string): string | null {
  let dir = startDir;
  const root = dirname(dir) === dir ? dir : '/'; // filesystem root

  while (dir !== root) {
    const pkgPath = join(dir, 'package.json');
    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
        if (pkg.name === PACKAGE_NAME) {
          return dir;
        }
      } catch {
        // Skip invalid package.json
      }
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  return null;
}
