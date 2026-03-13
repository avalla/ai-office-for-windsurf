/**
 * Uninstall Tool Handler
 *
 * Uninstalls the AI Office framework from a target project.
 */

import { z } from 'zod';
import { rm } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const ProjectRoot = process.env.AI_OFFICE_PROJECT_ROOT || process.cwd();

const UninstallSchema = z.object({
  target: z.string().default('.'),
  force: z.boolean().default(false)
});

// All directories that AI Office may create
const MANAGED_DIRS = ['.ai-office', '.windsurf', '.cursor', '.antigravity', '.vscode'];

export const uninstallHandler = {
  async uninstall(args: unknown) {
    const opts = UninstallSchema.parse(args);

    try {
      const targetDir = opts.target === '.' ? ProjectRoot : opts.target;

      const removedDirs: string[] = [];
      const errors: string[] = [];

      // Remove .ai-office directory
      const aiOfficeDir = join(targetDir, '.ai-office');
      if (existsSync(aiOfficeDir)) {
        try {
          await rm(aiOfficeDir, { recursive: true, force: true });
          removedDirs.push('.ai-office/');
        } catch (error) {
          errors.push(`Failed to remove .ai-office/: ${error}`);
        }
      }

      // Remove IDE-specific directories
      for (const dirName of MANAGED_DIRS.slice(1)) {
        const dirPath = join(targetDir, dirName);
        if (existsSync(dirPath)) {
          try {
            await rm(dirPath, { recursive: true, force: true });
            removedDirs.push(`${dirName}/`);
          } catch (error) {
            errors.push(`Failed to remove ${dirName}/: ${error}`);
          }
        }
      }

      if (removedDirs.length === 0) {
        return {
          success: false,
          message: '❌ No AI Office installation found.',
          removedDirs: [],
          errors: []
        };
      }

      return {
        success: true,
        message: '✅ AI Office framework uninstalled successfully!',
        removedDirs,
        errors: errors.length > 0 ? errors : undefined,
        warning: errors.length > 0 ? 'Some directories could not be removed.' : undefined
      };

    } catch (error) {
      return {
        success: false,
        message: `❌ Uninstall failed: ${error}`,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
};
