import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';

interface FrameworkConfig {
  rootPath: string;
  corePath: string;
  adapterPath: string;
  projectPath: string;
}

interface Milestone {
  number: number;
  name: string;
  dependencies: number[];
  status: 'BACKLOG' | 'TODO' | 'WIP' | 'REVIEW' | 'DONE';
}

interface Task {
  id: string;
  milestone: number;
  taskNumber: number;
  priority: 'H' | 'M' | 'L';
  title: string;
  status: 'BACKLOG' | 'TODO' | 'WIP' | 'REVIEW' | 'DONE';
  description: string;
  dependencies: string[];
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

class DependencyValidator {
  private config: FrameworkConfig;

  constructor(projectRoot: string) {
    this.config = {
      rootPath: projectRoot,
      corePath: path.join(projectRoot, '.ai-office', 'core'),
      adapterPath: path.join(projectRoot, '.ai-office', 'adapters', 'windsurf'),
      projectPath: path.join(projectRoot, '.ai-office')
    };
  }

  async validateDependencies(type: string = 'all', identifier?: string): Promise<string> {
    let content = '# Dependency Validation\n\n';
    const validationResults: ValidationResult[] = [];

    if (type === 'all' || type === 'milestone') {
      const milestones = await this.loadMilestones();

      if (type === 'milestone' && identifier) {
        const specificMilestone = milestones.find(m => m.number.toString() === identifier);
        if (specificMilestone) {
          const validation = await this.validateMilestoneDependencies(specificMilestone, milestones);
          validationResults.push(validation);
        }
      } else {
        for (const milestone of milestones) {
          const validation = await this.validateMilestoneDependencies(milestone, milestones);
          validationResults.push(validation);
        }
      }
    }

    if (type === 'all' || type === 'task') {
      const tasks = await this.loadTasks();

      if (type === 'task' && identifier) {
        const specificTask = tasks.find(t => t.id === identifier);
        if (specificTask) {
          const validation = await this.validateTaskDependencies(specificTask, tasks);
          validationResults.push(validation);
        }
      } else {
        for (const task of tasks) {
          const validation = await this.validateTaskDependencies(task, tasks);
          validationResults.push(validation);
        }
      }
    }

    // Report results
    const allValid = validationResults.every(r => r.valid);
    const allErrors = validationResults.flatMap(r => r.errors);
    const allWarnings = validationResults.flatMap(r => r.warnings);

    if (allValid) {
      content += '✅ **All dependencies are valid**\n\n';
    } else {
      content += '❌ **Dependency issues found**\n\n';
    }

    if (allErrors.length > 0) {
      content += '## Errors\n\n';
      allErrors.forEach(error => {
        content += `- ❌ ${error}\n`;
      });
      content += '\n';
    }

    if (allWarnings.length > 0) {
      content += '## Warnings\n\n';
      allWarnings.forEach(warning => {
        content += `- ⚠️ ${warning}\n`;
      });
      content += '\n';
    }

    content += '## Summary\n\n';
    content += `- **Items checked**: ${validationResults.length}\n`;
    content += `- **Valid items**: ${validationResults.filter(r => r.valid).length}\n`;
    content += `- **Errors**: ${allErrors.length}\n`;
    content += `- **Warnings**: ${allWarnings.length}\n`;

    return content;
  }

  private async loadMilestones(): Promise<Milestone[]> {
    const milestones: Milestone[] = [];
    const milestoneFiles = await glob('M*.md', { cwd: path.join(this.config.projectPath, 'milestones') });

    for (const file of milestoneFiles) {
      const filePath = path.join(this.config.projectPath, 'milestones', file);
      const content = await fs.readFile(filePath, 'utf-8');

      // Parse milestone number and name from filename
      const match = file.match(/^M(\d+)-(.+)\.md$/);
      if (match && match[1] && match[2]) {
        const number = parseInt(match[1]);
        const name = match[2];

        // Parse dependencies from content
        const dependencies: number[] = [];
        const depMatch = content.match(/Dependencies:\s*(.+)/);
        if (depMatch && depMatch[1]) {
          const deps = depMatch[1].split(',').map((d: string) => parseInt(d.trim())).filter((d: number) => !isNaN(d));
          dependencies.push(...deps);
        }

        // Parse status
        const statusMatch = content.match(/Status:\s*(.+)/);
        const status = statusMatch && statusMatch[1] ? statusMatch[1].trim() as Milestone['status'] : 'BACKLOG';

        milestones.push({ number, name, dependencies, status });
      }
    }

    return milestones;
  }

  private async loadTasks(): Promise<Task[]> {
    const tasks: Task[] = [];
    const taskDirs = ['BACKLOG', 'TODO', 'WIP', 'REVIEW', 'DONE'];

    for (const statusDir of taskDirs) {
      const dirPath = path.join(this.config.projectPath, 'tasks', statusDir);
      if (await fs.pathExists(dirPath)) {
        const files = await fs.readdir(dirPath);

        for (const file of files) {
          if (file.endsWith('.md')) {
            const filePath = path.join(dirPath, file);
            const content = await fs.readFile(filePath, 'utf-8');

            // Parse task ID from filename
            const match = file.match(/^(M\d+_T\d+)_[HML]-(.+)\.md$/);
            if (match && match[1] && match[2]) {
              const id = match[1];
              const priority = match[2].charAt(0) as Task['priority'];
              const title = match[2].slice(2).replace(/-/g, ' ');

              // Parse milestone and task number
              const idMatch = id.match(/^M(\d+)_T(\d+)$/);
              if (idMatch && idMatch[1] && idMatch[2]) {
                const milestone = parseInt(idMatch[1]);
                const taskNumber = parseInt(idMatch[2]);

                // Parse dependencies from content
                const dependencies: string[] = [];
                const depMatch = content.match(/Dependencies:\s*(.+)/);
                if (depMatch && depMatch[1]) {
                  const deps = depMatch[1].split(',').map((d: string) => d.trim()).filter((d: string) => d);
                  dependencies.push(...deps);
                }

                tasks.push({
                  id,
                  milestone,
                  taskNumber,
                  priority,
                  title,
                  status: statusDir as Task['status'],
                  description: content,
                  dependencies
                });
              }
            }
          }
        }
      }
    }

    return tasks;
  }

  private async validateMilestoneDependencies(milestone: Milestone, allMilestones: Milestone[]): Promise<ValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check if dependencies exist
    for (const dep of milestone.dependencies) {
      const depMilestone = allMilestones.find(m => m.number === dep);
      if (!depMilestone) {
        errors.push(`M${milestone.number} depends on non-existent M${dep}`);
      } else if (depMilestone.status !== 'DONE') {
        warnings.push(`M${milestone.number} depends on M${dep} which is not DONE (status: ${depMilestone.status})`);
      }
    }

    // Check for circular dependencies
    const circularCheck = this.checkCircularDependency(milestone.number, milestone.dependencies, allMilestones);
    if (circularCheck.hasCircular) {
      errors.push(`M${milestone.number} has circular dependency: ${circularCheck.path.join(' -> ')}`);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  private async validateTaskDependencies(task: Task, allTasks: Task[]): Promise<ValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check if dependencies exist
    for (const dep of task.dependencies) {
      const depTask = allTasks.find(t => t.id === dep);
      if (!depTask) {
        errors.push(`Task ${task.id} depends on non-existent task ${dep}`);
      } else if (depTask.status !== 'DONE') {
        warnings.push(`Task ${task.id} depends on ${dep} which is not DONE (status: ${depTask.status})`);
      }
    }

    // Check for circular dependencies
    const circularCheck = this.checkCircularTaskDependency(task.id, task.dependencies, allTasks);
    if (circularCheck.hasCircular) {
      errors.push(`Task ${task.id} has circular dependency: ${circularCheck.path.join(' -> ')}`);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  private checkCircularDependency(milestoneNum: number, dependencies: number[], allMilestones: Milestone[]): { hasCircular: boolean; path: number[] } {
    const visited = new Set<number>();
    const path: number[] = [];

    const check = (current: number): boolean => {
      if (path.includes(current)) {
        return true; // Circular dependency found
      }

      if (visited.has(current)) {
        return false; // Already checked this branch
      }

      visited.add(current);
      path.push(current);

      const currentMilestone = allMilestones.find(m => m.number === current);
      if (currentMilestone) {
        for (const dep of currentMilestone.dependencies) {
          if (check(dep)) {
            return true;
          }
        }
      }

      path.pop();
      return false;
    };

    const hasCircular = check(milestoneNum);
    return { hasCircular, path };
  }

  private checkCircularTaskDependency(taskId: string, dependencies: string[], allTasks: Task[]): { hasCircular: boolean; path: string[] } {
    const visited = new Set<string>();
    const path: string[] = [];

    const check = (current: string): boolean => {
      if (path.includes(current)) {
        return true; // Circular dependency found
      }

      if (visited.has(current)) {
        return false; // Already checked this branch
      }

      visited.add(current);
      path.push(current);

      const currentTask = allTasks.find(t => t.id === current);
      if (currentTask) {
        for (const dep of currentTask.dependencies) {
          if (check(dep)) {
            return true;
          }
        }
      }

      path.pop();
      return false;
    };

    const hasCircular = check(taskId);
    return { hasCircular, path };
  }
}

export async function validateDependenciesHandler(args: any): Promise<any> {
  const projectRoot = process.env.AI_OFFICE_PROJECT_ROOT || process.cwd();
  const validator = new DependencyValidator(projectRoot);

  const type = args.type as string || 'all';
  const identifier = args.identifier as string;

  const content = await validator.validateDependencies(type, identifier);

  return {
    content: [
      {
        type: 'text',
        text: content
      }
    ]
  };
}
