import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';

interface FrameworkConfig {
  rootPath: string;
  corePath: string;
  adapterPath: string;
  projectPath: string;
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

class TaskManager {
  private config: FrameworkConfig;

  constructor(projectRoot: string) {
    this.config = {
      rootPath: projectRoot,
      corePath: path.join(projectRoot, '.ai-office', 'core'),
      adapterPath: path.join(projectRoot, '.ai-office', 'adapters', 'windsurf'),
      projectPath: path.join(projectRoot, '.ai-office')
    };
  }

  async moveTask(taskId: string, toStatus: string, fromStatus?: string): Promise<string> {
    let content = `# Task Movement: ${taskId}\n\n`;

    // Find current location of task
    let currentLocation = '';
    let currentPath = '';
    const taskDirs = ['BACKLOG', 'TODO', 'WIP', 'REVIEW', 'DONE'];

    if (fromStatus) {
      currentLocation = fromStatus;
      currentPath = path.join(this.config.projectPath, 'tasks', fromStatus);
    } else {
      // Auto-detect current location
      for (const statusDir of taskDirs) {
        const checkPath = path.join(this.config.projectPath, 'tasks', statusDir, `${taskId}.md`);
        if (await fs.pathExists(checkPath)) {
          currentLocation = statusDir;
          currentPath = path.join(this.config.projectPath, 'tasks', statusDir);
          break;
        }
      }
    }

    if (!currentLocation) {
      content += `❌ **Task not found**: ${taskId}\n`;
      return content;
    }

    // Load task and validate dependencies
    const tasks = await this.loadTasks();
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
      content += `❌ **Task not found**: ${taskId}\n`;
      return content;
    }

    // Validate dependencies for the target status
    const validation = await this.validateTaskDependencies(task, tasks);

    if (toStatus === 'WIP' || toStatus === 'REVIEW' || toStatus === 'DONE') {
      if (!validation.valid) {
        content += '❌ **Cannot move task**: Dependencies not satisfied\n\n';
        content += '## Dependency Issues\n\n';
        validation.errors.forEach(error => {
          content += `- ${error}\n`;
        });

        if (validation.warnings.length > 0) {
          content += '\n## Warnings\n\n';
          validation.warnings.forEach(warning => {
            content += `- ${warning}\n`;
          });
        }

        content += '\n## Recommendations\n\n';
        content += '1. Complete dependent tasks first\n';
        content += '2. Use `ai_office_validate_dependencies` to check all dependencies\n';

        return content;
      }
    }

    // Move the task
    const srcPath = path.join(currentPath, `${taskId}.md`);
    const destPath = path.join(this.config.projectPath, 'tasks', toStatus, `${taskId}.md`);

    await fs.move(srcPath, destPath);

    // Update task status in file content
    let taskContent = await fs.readFile(destPath, 'utf-8');
    taskContent = taskContent.replace(/Status:\s*.+/, `Status: ${toStatus}`);
    await fs.writeFile(destPath, taskContent);

    content += `✅ **Task moved**: ${taskId}\n\n`;
    content += `**From**: ${currentLocation}\n`;
    content += `**To**: ${toStatus}\n\n`;

    if (validation.warnings.length > 0) {
      content += '## Warnings\n\n';
      validation.warnings.forEach(warning => {
        content += `- ${warning}\n`;
      });
      content += '\n';
    }

    // **NEW**: Recheck dependent tasks after task status change
    const dependentTasks = tasks.filter(t => t.dependencies.includes(taskId));

    if (dependentTasks.length > 0) {
      content += '## Dependent Tasks Recheck\n\n';
      content += `Found ${dependentTasks.length} dependent tasks:\n\n`;

      let tasksReadyToMove = 0;
      let tasksStillBlocked = 0;

      for (const depTask of dependentTasks) {
        // Revalidate dependencies for each dependent task
        const depValidation = await this.validateTaskDependencies(depTask, tasks);

        if (depValidation.valid && depTask.status === 'TODO') {
          content += `- ✅ **${depTask.id}**: Ready to move to WIP\n`;
          tasksReadyToMove++;
        } else if (depValidation.valid && depTask.status === 'WIP') {
          content += `- ✅ **${depTask.id}**: Can continue work\n`;
          tasksReadyToMove++;
        } else if (depValidation.valid && toStatus === 'DONE') {
          content += `- 🎯 **${depTask.id}**: All dependencies satisfied!\n`;
          tasksReadyToMove++;
        } else {
          content += `- ⏳ **${depTask.id}**: Still blocked`;

          if (!depValidation.valid) {
            const remainingDeps = depTask.dependencies.filter(depId => {
              const depTaskFull = tasks.find(t => t.id === depId);
              return depTaskFull && depTaskFull.status !== 'DONE';
            });
            if (remainingDeps.length > 0) {
              content += ` (waiting for: ${remainingDeps.join(', ')})`;
            }
          }
          content += '\n';
          tasksStillBlocked++;
        }
      }

      content += `\n**Summary**: ${tasksReadyToMove} ready, ${tasksStillBlocked} still blocked\n\n`;

      if (tasksReadyToMove > 0) {
        content += '## Recommendations\n\n';
        content += '1. Move ready tasks to continue progress\n';
        content += '2. Use `ai_office_move_task` for each ready task\n';
        content += '3. Check remaining dependencies for blocked tasks\n';
      }
    }

    content += '## Next Steps\n\n';
    if (toStatus === 'WIP') {
      content += '1. Start working on the task\n';
      content += '2. Move to REVIEW when complete\n';
    } else if (toStatus === 'REVIEW') {
      content += '1. Review the completed task\n';
      content += '2. Move to DONE if approved\n';
    } else if (toStatus === 'DONE') {
      content += '1. Task is complete - dependent tasks have been rechecked\n';
      content += '2. Move ready dependent tasks to continue workflow\n';
    }

    return content;
  }

  async updateTask(taskId: string, updates: any): Promise<string> {
    let content = `# Task Update: ${taskId}\n\n`;

    // Find current task
    const tasks = await this.loadTasks();
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
      content += `❌ **Task not found**: ${taskId}\n`;
      return content;
    }

    // Find and update task file
    const taskDirs = ['BACKLOG', 'TODO', 'WIP', 'REVIEW', 'DONE'];
    let taskPath = '';
    let currentStatus = '';

    for (const statusDir of taskDirs) {
      const checkPath = path.join(this.config.projectPath, 'tasks', statusDir, `${taskId}.md`);
      if (await fs.pathExists(checkPath)) {
        taskPath = checkPath;
        currentStatus = statusDir;
        break;
      }
    }

    if (!taskPath) {
      content += `❌ **Task file not found**: ${taskId}\n`;
      return content;
    }

    // Read and update task file
    let taskContent = await fs.readFile(taskPath, 'utf-8');

    // Apply updates
    const appliedUpdates: string[] = [];

    if (updates.title) {
      const newTitle = updates.title;
      taskContent = taskContent.replace(/^# .+/, `# ${newTitle}`);
      appliedUpdates.push(`Title: ${newTitle}`);
    }

    if (updates.priority) {
      taskContent = taskContent.replace(/\*\*Priority\*\*:\s*.+/, `**Priority**: ${updates.priority}`);
      appliedUpdates.push(`Priority: ${updates.priority}`);
    }

    if (updates.dependencies) {
      const depsStr = updates.dependencies.length > 0 ? updates.dependencies.join(', ') : 'None';
      taskContent = taskContent.replace(/\*\*Dependencies\*\*:\s*.+/, `**Dependencies**: ${depsStr}`);
      appliedUpdates.push(`Dependencies: ${depsStr}`);
    }

    if (updates.description) {
      // Replace the description section (everything after metadata)
      const lines = taskContent.split('\n');
      let descriptionStart = -1;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line && (line.includes('## Notes') || line.includes('## Description'))) {
          descriptionStart = i;
          break;
        }
      }

      if (descriptionStart === -1) {
        // Add description at the end
        taskContent += `\n\n## Description\n\n${updates.description}\n`;
      } else {
        // Replace existing description
        lines[descriptionStart] = `## Description\n\n${updates.description}`;
        taskContent = lines.slice(0, descriptionStart + 1).join('\n');
      }

      appliedUpdates.push('Description updated');
    }

    // Write updated content
    await fs.writeFile(taskPath, taskContent);

    content += `✅ **Task updated**: ${taskId}\n\n`;
    content += `**Current Status**: ${currentStatus}\n\n`;

    if (appliedUpdates.length > 0) {
      content += '## Applied Updates\n\n';
      appliedUpdates.forEach(update => {
        content += `- ✅ ${update}\n`;
      });
      content += '\n';
    }

    // **NEW**: Recheck dependent tasks after update
    const dependentTasks = tasks.filter(t => t.dependencies.includes(taskId));

    if (dependentTasks.length > 0 || updates.dependencies) {
      content += '## Dependency Impact Recheck\n\n';

      // Revalidate this task with new dependencies
      const updatedTasks = await this.loadTasks();
      const updatedTask = updatedTasks.find(t => t.id === taskId);

      if (updatedTask) {
        const taskValidation = await this.validateTaskDependencies(updatedTask, updatedTasks);

        content += `### Task ${taskId} Validation\n\n`;
        if (taskValidation.valid) {
          content += '✅ **Task dependencies are valid**\n';
        } else {
          content += '❌ **Task has dependency issues**\n';
          taskValidation.errors.forEach(error => {
            content += `- ${error}\n`;
          });
        }

        if (taskValidation.warnings.length > 0) {
          content += '\n**Warnings**:\n';
          taskValidation.warnings.forEach(warning => {
            content += `- ${warning}\n`;
          });
        }
        content += '\n';
      }

      // Check dependent tasks
      if (dependentTasks.length > 0) {
        content += `### Dependent Tasks (${dependentTasks.length})\n\n`;

        let tasksReady = 0;
        let tasksBlocked = 0;

        for (const depTask of dependentTasks) {
          const depValidation = await this.validateTaskDependencies(depTask, updatedTasks);

          if (depValidation.valid) {
            content += `- ✅ **${depTask.id}**: Ready to proceed\n`;
            tasksReady++;
          } else {
            content += `- ⏳ **${depTask.id}**: Blocked by dependencies\n`;
            tasksBlocked++;
          }
        }

        content += `\n**Summary**: ${tasksReady} ready, ${tasksBlocked} blocked\n\n`;
      }
    }

    content += '## Next Steps\n\n';
    content += '1. Review the applied changes\n';
    content += '2. Check dependent tasks status above\n';
    content += '3. Use `ai_office_move_task` if ready to proceed\n';
    content += '4. Use `ai_office_status` for overall project view\n';

    return content;
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

export async function moveTaskHandler(args: any): Promise<any> {
  const projectRoot = process.env.AI_OFFICE_PROJECT_ROOT || process.cwd();
  const manager = new TaskManager(projectRoot);

  const taskId = args.task_id as string;
  const toStatus = args.to_status as string;
  const fromStatus = args.from_status as string;

  const content = await manager.moveTask(taskId, toStatus, fromStatus);

  return {
    content: [
      {
        type: 'text',
        text: content
      }
    ]
  };
}

export async function updateTaskHandler(args: any): Promise<any> {
  const projectRoot = process.env.AI_OFFICE_PROJECT_ROOT || process.cwd();
  const manager = new TaskManager(projectRoot);

  const taskId = args.task_id as string;
  const updates = args.updates as any || {};

  const content = await manager.updateTask(taskId, updates);

  return {
    content: [
      {
        type: 'text',
        text: content
      }
    ]
  };
}
