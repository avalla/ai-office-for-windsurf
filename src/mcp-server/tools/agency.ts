import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';

interface FrameworkConfig {
  rootPath: string;
  corePath: string;
  adapterPath: string;
  projectPath: string;
}

interface Agency {
  name: string;
  description: string;
  configPath: string;
}

class AgencyManager {
  private config: FrameworkConfig;

  constructor(projectRoot: string) {
    this.config = {
      rootPath: projectRoot,
      corePath: path.join(projectRoot, '.ai-office'),  // Fixed: agencies are directly in .ai-office/
      adapterPath: path.join(projectRoot, '.ai-office', 'adapters', 'windsurf'),
      projectPath: path.join(projectRoot, '.ai-office')
    };
  }

  async listAgencies(): Promise<string> {
    const agenciesPath = path.join(this.config.corePath, 'agencies');

    if (!await fs.pathExists(agenciesPath)) {
      return 'No agencies found. Framework may not be properly installed.';
    }

    const items = await fs.readdir(agenciesPath);
    const agencies = items.filter((item: string) => {
      const itemPath = path.join(agenciesPath, item);
      return fs.statSync(itemPath).isDirectory();
    });

    let content = '# Available Agencies\n\n';

    if (agencies.length === 0) {
      content += 'No agencies found.\n';
    } else {
      agencies.forEach((agency: string) => {
        content += `- **${agency}**\n`;
      });
    }

    return content;
  }

  async getAgencyContent(agencyName: string): Promise<string> {
    const agencyPath = path.join(this.config.corePath, 'agencies', agencyName);

    if (!await fs.pathExists(agencyPath)) {
      return `Agency "${agencyName}" not found.`;
    }

    const files = await glob('*.md', { cwd: agencyPath });
    let content = `# Agency: ${agencyName}\n\n`;

    for (const file of files) {
      const filePath = path.join(agencyPath, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      content += `\n--- ${file} ---\n${fileContent}\n`;
    }

    return content;
  }

  async selectAgency(agencyName?: string, customAgency: boolean = false): Promise<string> {
    let content = '# Agency Selection\n\n';

    if (customAgency) {
      content += '🎨 **Creating Custom Agency**\n\n';
      content += 'To create a custom agency, please provide:\n';
      content += '1. **Agency Name**: Unique identifier\n';
      content += '2. **Description**: Agency purpose and focus\n';
      content += '3. **Team Structure**: Required roles and skills\n';
      content += '4. **Workflow**: Custom pipeline stages\n\n';
      content += 'Use `ai_office_compose_team` to set up your custom team.\n';

      // Save selection
      await this.saveAgencySelection('custom', { custom: true });

    } else if (agencyName) {
      const agencyPath = path.join(this.config.corePath, 'agencies', agencyName);

      if (await fs.pathExists(agencyPath)) {
        content += `✅ **Agency Selected**: ${agencyName}\n\n`;
        content += '## Agency Details\n\n';

        const configPath = path.join(agencyPath, 'config.md');
        if (await fs.pathExists(configPath)) {
          const configContent = await fs.readFile(configPath, 'utf-8');
          content += configContent + '\n\n';
        }

        content += '## Next Steps\n\n';
        content += '1. Use `ai_office_compose_team` to set up your team\n';
        content += '2. Create your first milestone with `ai_office_new_milestone`\n';

        // Save selection
        await this.saveAgencySelection(agencyName, { custom: false });

      } else {
        content += `❌ **Agency Not Found**: ${agencyName}\n\n`;
        content += 'Available agencies:\n';
        content += 'Use `ai_office_list_agencies` to see all available agencies.\n';
      }
    } else {
      content += '📋 **Agency Selection Required**\n\n';
      content += 'Please specify an agency name or set custom_agency=true to create a custom agency.\n\n';
      content += 'Use `ai_office_list_agencies` to see available agencies.\n';
    }

    return content;
  }

  private async saveAgencySelection(agencyName: string, metadata: any): Promise<void> {
    const agencyFile = path.join(this.config.projectPath, 'agency.json');
    await fs.writeJson(agencyFile, {
      name: agencyName,
      selectedAt: new Date().toISOString(),
      ...metadata
    }, { spaces: 2 });
  }
}

export async function listAgenciesHandler(args: any): Promise<any> {
  const projectRoot = process.env.AI_OFFICE_PROJECT_ROOT || process.cwd();
  const manager = new AgencyManager(projectRoot);

  const content = await manager.listAgencies();

  return {
    content: [
      {
        type: 'text',
        text: content
      }
    ]
  };
}

export async function getAgencyHandler(args: any): Promise<any> {
  const projectRoot = process.env.AI_OFFICE_PROJECT_ROOT || process.cwd();
  const manager = new AgencyManager(projectRoot);

  const agencyName = args.name as string;
  const content = await manager.getAgencyContent(agencyName);

  return {
    content: [
      {
        type: 'text',
        text: content
      }
    ]
  };
}

export async function selectAgencyHandler(args: any): Promise<any> {
  const projectRoot = process.env.AI_OFFICE_PROJECT_ROOT || process.cwd();
  const manager = new AgencyManager(projectRoot);

  const agencyName = args.agency_name as string;
  const customAgency = args.custom_agency as boolean || false;

  const content = await manager.selectAgency(agencyName, customAgency);

  return {
    content: [
      {
        type: 'text',
        text: content
      }
    ]
  };
}
