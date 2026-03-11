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

class RepositoryGraphGenerator {
  private config: FrameworkConfig;

  constructor(projectRoot: string) {
    this.config = {
      rootPath: projectRoot,
      corePath: path.join(projectRoot, '.ai-office', 'core'),
      adapterPath: path.join(projectRoot, '.ai-office', 'adapters', 'windsurf'),
      projectPath: path.join(projectRoot, '.ai-office')
    };
  }

  async generateRepoGraph(includeDependencies: boolean = true, format: string = 'mermaid'): Promise<string> {
    // Scan project structure
    const repoGraph = await this.analyzeRepository(this.config.rootPath, includeDependencies);

    let content = '# Repository Dependency Graph\n\n';

    if (format === 'mermaid') {
      content += '```mermaid\n';
      content += this.generateMermaidGraph(repoGraph);
      content += '\n```\n\n';
    } else if (format === 'json') {
      content += '```json\n';
      content += JSON.stringify(repoGraph, null, 2);
      content += '\n```\n\n';
    } else if (format === 'dot') {
      content += '```dot\n';
      content += this.generateDotGraph(repoGraph);
      content += '\n```\n\n';
    }

    content += '## Analysis Summary\n\n';
    content += `- **Files analyzed**: ${repoGraph.files.length}\n`;
    content += `- **Dependencies found**: ${repoGraph.dependencies.length}\n`;
    content += `- **Complexity score**: ${repoGraph.complexityScore}\n\n`;

    content += '## Recommendations\n\n';
    if (repoGraph.complexityScore > 50) {
      content += '⚠️ **High complexity detected** - Consider modularization\n';
    } else if (repoGraph.complexityScore > 20) {
      content += '📊 **Medium complexity** - Monitor for growth\n';
    } else {
      content += '✅ **Low complexity** - Good structure\n';
    }

    return content;
  }

  private async analyzeRepository(rootPath: string, includeDependencies: boolean) {
    const files = await glob('**/*.{js,ts,jsx,tsx,py,java,go,rs}', {
      cwd: rootPath,
      ignore: ['node_modules/**', '.git/**', 'dist/**', 'build/**']
    });

    const dependencies: string[] = [];
    let complexityScore = 0;

    for (const file of files) {
      const filePath = path.join(rootPath, file);
      const content = await fs.readFile(filePath, 'utf-8');

      // Simple dependency detection
      const imports = content.match(/import.*from\s+['"](.+?)['"]/g) || [];
      const requires = content.match(/require\s*\(['"](.+?)['"]\)/g) || [];

      imports.forEach((imp: string) => {
        const match = imp.match(/from\s+['"](.+?)['"]/);
        if (match && match[1] && !match[1].startsWith('.')) {
          dependencies.push(match[1]);
        }
      });

      requires.forEach((req: string) => {
        const match = req.match(/require\s*\(['"](.+?)['"]\)/);
        if (match && match[1] && !match[1].startsWith('.')) {
          dependencies.push(match[1]);
        }
      });

      // Simple complexity calculation
      complexityScore += content.split('\n').length / 10;
    }

    return {
      files,
      dependencies: [...new Set(dependencies)],
      complexityScore: Math.round(complexityScore)
    };
  }

  private generateMermaidGraph(repoGraph: any): string {
    let graph = 'graph TD\n';

    // Add file nodes
    repoGraph.files.forEach((file: string, index: number) => {
      const nodeId = `F${index}`;
      const fileName = path.basename(file, path.extname(file));
      graph += `  ${nodeId}[${fileName}]\n`;
    });

    // Add dependency nodes
    const uniqueDeps = [...new Set(repoGraph.dependencies)];
    uniqueDeps.slice(0, 10).forEach((dep: unknown, index: number) => {
      if (typeof dep === 'string') {
        const nodeId = `D${index}`;
        graph += `  ${nodeId}[${dep}]\n`;
      }
    });

    return graph;
  }

  private generateDotGraph(repoGraph: any): string {
    let graph = 'digraph repo {\n';
    graph += '  rankdir=LR;\n';
    graph += '  node [shape=box];\n\n';

    // Add file nodes
    repoGraph.files.forEach((file: string, index: number) => {
      const nodeId = `F${index}`;
      const fileName = path.basename(file, path.extname(file));
      graph += `  ${nodeId} [label="${fileName}"];\n`;
    });

    graph += '\n}';

    return graph;
  }
}

export async function generateRepoGraphHandler(args: any): Promise<any> {
  const projectRoot = process.env.AI_OFFICE_PROJECT_ROOT || process.cwd();
  const generator = new RepositoryGraphGenerator(projectRoot);

  const includeDependencies = args.include_dependencies as boolean || true;
  const format = args.format as string || 'mermaid';

  const content = await generator.generateRepoGraph(includeDependencies, format);

  return {
    content: [
      {
        type: 'text',
        text: content
      }
    ]
  };
}
