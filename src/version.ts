/**
 * Version Configuration
 *
 * Dynamic version management - reads from package.json at runtime.
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { getPackageRoot } from './package-root.js';

// Read package.json synchronously at module load time
let VERSION: string;
try {
  // Read package.json from the package root (works in dev, dist, and npm install)
  const packageJsonPath = join(getPackageRoot(), 'package.json');
  const packageJsonText = readFileSync(packageJsonPath, 'utf-8');
  const packageJson = JSON.parse(packageJsonText);
  VERSION = packageJson.version;
} catch {
  // Fallback version if package.json can't be read
  VERSION = '5.0.0';
  if (process.env.NODE_ENV !== 'production') {
    console.warn('Warning: Could not read package.json, using fallback version');
  }
}

export { VERSION };

export const FRAMEWORK_INFO = {
  name: 'AI Office Framework',
  version: VERSION,
  buildDate: new Date().toISOString(),
  compatibility: {
    bun: '>=1.3.6',
    node: '>=18.0.0'
  }
} as const;
