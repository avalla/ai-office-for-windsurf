/**
 * AI Office MCP Server Resources
 *
 * Provides framework resources via MCP protocol
 */

import { join } from 'path';
import { existsSync, readFileSync, statSync, readdirSync } from 'fs';
import { getPackageRoot } from '../../package-root.js';

export class ResourceHandler {
  private projectRoot: string;

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
  }

  /**
   * Detect current IDE from project structure
   */
  private detectIDE(): 'windsurf' | 'cursor' | 'antigravity' | 'vscode' {
    if (existsSync(join(this.projectRoot, '.windsurf'))) return 'windsurf';
    if (existsSync(join(this.projectRoot, '.cursor'))) return 'cursor';
    if (existsSync(join(this.projectRoot, '.antigravity'))) return 'antigravity';
    if (existsSync(join(this.projectRoot, '.vscode'))) return 'vscode';
    return 'windsurf'; // default
  }

  /**
   * List all available resources
   */
  async listResources() {
    const resources = [];

    // Core framework resources
    resources.push(...this.getFrameworkResources());

    // Project-specific resources (if in AI Office project)
    if (this.isAiOfficeProject()) {
      resources.push(...this.getProjectResources());
    }

    return {
      resources: resources.sort((a, b) => a.title.localeCompare(b.title))
    };
  }

  /**
   * Read a specific resource
   */
  async readResource(uri: string) {
    const resource = this.parseResourceUri(uri);

    if (!resource) {
      throw new Error(`Invalid resource URI: ${uri}`);
    }

    switch (resource.type) {
      case 'status':
        if (!resource.params.slug) throw new Error('Slug parameter required for status resource');
        return this.readStatusResource(resource.params.slug);
      case 'pipeline':
        return this.readPipelineResource();
      case 'agency':
      case 'agencies': {
        // Support both singular and plural forms
        const agencyName = resource.params.name || resource.params.slug;
        if (!agencyName) throw new Error('Name parameter required for agency resource');
        return this.readAgencyResource(agencyName);
      }
      case 'team':
        return this.readTeamResource();
      case 'docs':
        if (!resource.params.doc) throw new Error('Doc parameter required for docs resource');
        return this.readDocsResource(resource.params.doc);
      case 'tasks':
        if (!resource.params.column) throw new Error('Column parameter required for tasks resource');
        return this.readTasksResource(resource.params.column);
      case 'reports':
        if (!resource.params.type) throw new Error('Type parameter required for reports resource');
        return this.readReportsResource(resource.params.type);
      case 'repo':
        if (!resource.params.path) throw new Error('Path parameter required for repo resource');
        return this.readRepoResource(resource.params.path);
      default:
        throw new Error(`Unknown resource type: ${resource.type}`);
    }
  }

  /**
   * List resource templates
   */
  async listResourceTemplates() {
    return {
      resourceTemplates: [
        {
          uriTemplate: 'ai-office://status/{slug}',
          name: 'project-status',
          title: '📊 Project Status',
          description: 'Access project or feature status files',
          mimeType: 'application/json'
        },
        {
          uriTemplate: 'ai-office://tasks/{column}',
          name: 'task-board',
          title: '📋 Task Board',
          description: 'Access tasks in specific columns',
          mimeType: 'application/json'
        },
        {
          uriTemplate: 'ai-office://agencies/{name}',
          name: 'agency-config',
          title: '🏢 Agency Configuration',
          description: 'Access agency configuration files',
          mimeType: 'text/markdown'
        },
        {
          uriTemplate: 'ai-office://docs/{doc}',
          name: 'documentation',
          title: '📚 Framework Documentation',
          description: 'Access framework documentation',
          mimeType: 'text/markdown'
        }
      ]
    };
  }

  private getFrameworkResources() {
    const frameworkRoot = this.getFrameworkRoot();

    return [
      {
        uri: 'ai-office://pipeline',
        name: 'pipeline',
        title: '🔄 Pipeline Configuration',
        description: 'AI Office pipeline stages and transitions',
        mimeType: 'text/typescript',
        annotations: {
          audience: ['user', 'assistant'],
          priority: 0.9,
          lastModified: this.getLastModified(join(frameworkRoot, 'pipeline.ts'))
        }
      },
      {
        uri: 'ai-office://docs/architecture',
        name: 'architecture',
        title: '🏗️ Framework Architecture',
        description: 'AI Office framework architecture documentation',
        mimeType: 'text/markdown',
        annotations: {
          audience: ['user', 'assistant'],
          priority: 0.8
        }
      },
      {
        uri: 'ai-office://team',
        name: 'team',
        title: '👥 Team Configuration',
        description: 'Available team roles and agents',
        mimeType: 'application/json',
        annotations: {
          audience: ['user', 'assistant'],
          priority: 0.7
        }
      }
    ];
  }

  private getProjectResources() {
    const resources = [];

    // Status files
    const statusDir = join(this.projectRoot, '.ai-office', 'docs', 'runbooks');
    if (existsSync(statusDir)) {
      const statusFiles = this.getStatusFiles();
      statusFiles.forEach(slug => {
        resources.push({
          uri: `ai-office://status/${slug}`,
          name: `status-${slug}`,
          title: `📊 Status: ${slug}`,
          description: `Status information for ${slug}`,
          mimeType: 'application/json',
          annotations: {
            audience: ['user', 'assistant'],
            priority: 0.8,
            lastModified: this.getLastModified(join(statusDir, `${slug}-status.md`))
          }
        });
      });
    }

    // Task board
    const tasksDir = join(this.projectRoot, '.ai-office', 'tasks');
    if (existsSync(tasksDir)) {
      ['BACKLOG', 'TODO', 'WIP', 'REVIEW', 'DONE'].forEach(column => {
        resources.push({
          uri: `ai-office://tasks/${column.toLowerCase()}`,
          name: `tasks-${column.toLowerCase()}`,
          title: `📋 Tasks: ${column}`,
          description: `Tasks in ${column} column`,
          mimeType: 'application/json',
          annotations: {
            audience: ['user', 'assistant'],
            priority: 0.6
          }
        });
      });
    }

    // Project README
    const readmePath = join(this.projectRoot, '.ai-office', 'README.md');
    if (existsSync(readmePath)) {
      resources.push({
        uri: 'ai-office://docs/README',
        name: 'project-readme',
        title: '📖 Project README',
        description: 'Project-specific documentation',
        mimeType: 'text/markdown',
        annotations: {
          audience: ['user'],
          priority: 0.9,
          lastModified: this.getLastModified(readmePath)
        }
      });
    }

    return resources;
  }

  private parseResourceUri(uri: string) {
    const match = uri.match(/^ai-office:\/\/([^/]+)(?:\/(.+))?$/);
    if (!match) return null;

    const [, type, path] = match;
    const params: Record<string, string> = {};

    if (path) {
      if (type === 'status' || type === 'agencies') {
        params.slug = path;
      } else if (type === 'docs') {
        params.doc = path;
      } else if (type === 'tasks') {
        params.column = path;
      } else if (type === 'reports') {
        params.type = path;
      } else if (type === 'repo') {
        params.path = path;
      }
    }

    return { type, params };
  }

  private readStatusResource(slug: string) {
    const statusPath = join(this.projectRoot, '.ai-office', 'docs', 'runbooks', `${slug}-status.md`);
    if (!existsSync(statusPath)) {
      throw new Error(`Status file not found: ${slug}`);
    }

    const content = readFileSync(statusPath, 'utf-8');
    return {
      contents: [{
        uri: `ai-office://status/${slug}`,
        mimeType: 'text/markdown',
        text: content
      }]
    };
  }

  private readPipelineResource() {
    const frameworkRoot = this.getFrameworkRoot();

    // Try to find pipeline configuration in different locations
    const possiblePaths = [
      join(frameworkRoot, 'src', 'pipeline.ts'),
      join(frameworkRoot, 'pipeline.ts'),
      join(frameworkRoot, 'framework', 'pipeline.ts')
    ];

    let pipelinePath = possiblePaths.find(path => existsSync(path));

    if (!pipelinePath) {
      // Fallback to README as pipeline info
      pipelinePath = join(frameworkRoot, 'README.md');
    }

    if (!existsSync(pipelinePath)) {
      throw new Error('Pipeline configuration not found');
    }

    const content = readFileSync(pipelinePath, 'utf-8');
    return {
      contents: [{
        uri: 'ai-office://pipeline',
        mimeType: pipelinePath.endsWith('.md') ? 'text/markdown' : 'text/typescript',
        text: content
      }]
    };
  }

  private readAgencyResource(name: string) {
    // First check project-level .ai-office/agencies (installed location)
    const projectAgencyPath = join(this.projectRoot, '.ai-office', 'agencies', name, 'config.md');
    if (existsSync(projectAgencyPath)) {
      const content = readFileSync(projectAgencyPath, 'utf-8');
      return {
        contents: [{
          uri: `ai-office://agencies/${name}`,
          mimeType: 'text/markdown',
          text: content
        }]
      };
    }

    // Fallback to framework source (for development)
    const frameworkRoot = this.getFrameworkRoot();
    const frameworkAgencyPath = join(frameworkRoot, 'framework', 'core', 'agencies', name, 'config.md');

    if (!existsSync(frameworkAgencyPath)) {
      throw new Error(`Agency configuration not found: ${name}`);
    }

    const content = readFileSync(frameworkAgencyPath, 'utf-8');
    return {
      contents: [{
        uri: `ai-office://agencies/${name}`,
        mimeType: 'text/markdown',
        text: content
      }]
    };
  }

  private readTeamResource() {
    // First check project-level .ai-office (installed location)
    const projectTeamPath = join(this.projectRoot, '.ai-office', 'office-config.md');
    if (existsSync(projectTeamPath)) {
      const content = readFileSync(projectTeamPath, 'utf-8');
      return {
        contents: [{
          uri: 'ai-office://team',
          mimeType: 'text/markdown',
          text: content
        }]
      };
    }

    // Fallback to framework source (for development)
    const frameworkRoot = this.getFrameworkRoot();
    const frameworkTeamPath = join(frameworkRoot, 'framework', 'office-config.md');

    if (existsSync(frameworkTeamPath)) {
      const content = readFileSync(frameworkTeamPath, 'utf-8');
      return {
        contents: [{
          uri: 'ai-office://team',
          mimeType: 'text/markdown',
          text: content
        }]
      };
    }

    // Final fallback to README
    const readmePath = join(frameworkRoot, 'README.md');
    if (!existsSync(readmePath)) {
      throw new Error('Team configuration not found');
    }

    const content = readFileSync(readmePath, 'utf-8');
    return {
      contents: [{
        uri: 'ai-office://team',
        mimeType: 'text/markdown',
        text: content
      }]
    };
  }

  private readDocsResource(doc: string) {
    const frameworkRoot = this.getFrameworkRoot();

    // Map common doc names to paths
    const docPaths: Record<string, string> = {
      'architecture': join(frameworkRoot, 'docs', 'architecture.md'),
      'README': join(frameworkRoot, 'README.md'),
      'CHANGELOG': join(frameworkRoot, 'CHANGELOG.md')
    };

    const docPath = docPaths[doc] || join(frameworkRoot, 'docs', `${doc}.md`);

    if (!existsSync(docPath)) {
      throw new Error(`Documentation not found: ${doc}`);
    }

    const content = readFileSync(docPath, 'utf-8');
    return {
      contents: [{
        uri: `ai-office://docs/${doc}`,
        mimeType: 'text/markdown',
        text: content
      }]
    };
  }

  private readTasksResource(column: string) {
    const tasksDir = join(this.projectRoot, '.ai-office', 'tasks', column.toUpperCase());

    if (!existsSync(tasksDir)) {
      // Return empty task list
      return {
        contents: [{
          uri: `ai-office://tasks/${column}`,
          mimeType: 'application/json',
          text: JSON.stringify({ tasks: [] }, null, 2)
        }]
      };
    }

    // Read all .md files in the column directory
    const files = readdirSync(tasksDir).filter(f => f.endsWith('.md'));
    const tasks: { id: string; title: string; status: string }[] = [];

    for (const file of files) {
      const filePath = join(tasksDir, file);
      const content = readFileSync(filePath, 'utf-8');
      const titleMatch = content.match(/^#\s+(.+)$/m);
      tasks.push({
        id: file.replace('.md', ''),
        title: titleMatch?.[1] || file,
        status: column.toUpperCase()
      });
    }

    return {
      contents: [{
        uri: `ai-office://tasks/${column}`,
        mimeType: 'application/json',
        text: JSON.stringify({ count: tasks.length, tasks }, null, 2)
      }]
    };
  }

  private readReportsResource(type: string) {
    // Generate dynamic reports
    const reportData = this.generateReport(type);

    return {
      contents: [{
        uri: `ai-office://reports/${type}`,
        mimeType: 'application/json',
        text: JSON.stringify(reportData, null, 2)
      }]
    };
  }

  private readRepoResource(path: string) {
    if (path === 'graph') {
      // Generate repository graph
      const graphData = this.generateRepoGraph();

      return {
        contents: [{
          uri: 'ai-office://repo/graph',
          mimeType: 'application/json',
          text: JSON.stringify(graphData, null, 2)
        }]
      };
    }

    throw new Error(`Unknown repository resource: ${path}`);
  }

  private generateReport(type: string) {
    // Placeholder report generation
    return {
      type,
      generated: new Date().toISOString(),
      data: `Report data for ${type}`
    };
  }

  private generateRepoGraph() {
    // Placeholder repo graph generation
    return {
      nodes: [],
      edges: [],
      generated: new Date().toISOString()
    };
  }

  private isAiOfficeProject(): boolean {
    return existsSync(join(this.projectRoot, '.ai-office'));
  }

  private getFrameworkRoot(): string {
    // Use the package root resolver — works in dev, dist, and npm install
    return getPackageRoot();
  }

  private getStatusFiles(): string[] {
    const statusDir = join(this.projectRoot, '.ai-office', 'docs', 'runbooks');
    if (!existsSync(statusDir)) return [];

    try {
      const files = readdirSync(statusDir);
      return files
        .filter((file) => file.endsWith('-status.md'))
        .map((file) => file.replace('-status.md', ''));
    } catch (error) {
      console.warn(`Error reading status directory: ${error}`);
      return [];
    }
  }

  private getLastModified(filePath: string): string | undefined {
    try {
      const stats = statSync(filePath);
      return stats.mtime.toISOString();
    } catch {
      return undefined;
    }
  }
}
