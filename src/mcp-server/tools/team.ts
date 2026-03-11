import * as fs from 'fs-extra';
import * as path from 'path';

interface TeamMember {
  name: string;
  role: string;
  skills: string[];
}

class TeamManager {
  private projectPath: string;
  private teamFile: string;

  constructor(projectRoot: string) {
    this.projectPath = path.join(projectRoot, '.ai-office');
    this.teamFile = path.join(this.projectPath, 'team', 'composition.json');
  }

  async composeTeam(action: string = 'list', role?: string, name?: string, skills?: string[]): Promise<string> {
    await fs.ensureDir(path.join(this.projectPath, 'team'));

    let content = '# Team Composition\n\n';

    switch (action) {
      case 'list':
        if (await fs.pathExists(this.teamFile)) {
          const teamData = await fs.readJson(this.teamFile);
          content += '## Current Team\n\n';

          if (teamData.members && teamData.members.length > 0) {
            teamData.members.forEach((member: TeamMember) => {
              content += `### ${member.name} - ${member.role}\n`;
              content += `**Skills**: ${member.skills.join(', ')}\n\n`;
            });
          } else {
            content += 'No team members yet. Use `ai_office_compose_team --action=add` to add members.\n';
          }
        } else {
          content += 'No team composition found. Use `ai_office_compose_team --action=add` to create your team.\n';
        }
        break;

      case 'add':
        if (!role || !name) {
          content += '❌ **Missing required fields**: role and name are required for add action.\n';
        } else {
          let teamData = { members: [] as TeamMember[] };

          if (await fs.pathExists(this.teamFile)) {
            teamData = await fs.readJson(this.teamFile);
          }

          const newMember: TeamMember = {
            name,
            role,
            skills: skills || []
          };

          teamData.members.push(newMember);
          await fs.writeJson(this.teamFile, teamData, { spaces: 2 });

          content += `✅ **Team Member Added**: ${name} as ${role}\n\n`;
          content += `**Skills**: ${skills?.join(', ') || 'None specified'}\n\n`;
          content += '## Updated Team\n\n';
          teamData.members.forEach((member: TeamMember) => {
            content += `- ${member.name} - ${member.role}\n`;
          });
        }
        break;

      case 'remove':
        if (!name) {
          content += '❌ **Missing required field**: name is required for remove action.\n';
        } else {
          if (await fs.pathExists(this.teamFile)) {
            const teamData = await fs.readJson(this.teamFile);
            const originalLength = teamData.members.length;
            teamData.members = teamData.members.filter((member: TeamMember) => member.name !== name);

            if (teamData.members.length < originalLength) {
              await fs.writeJson(this.teamFile, teamData, { spaces: 2 });
              content += `✅ **Team Member Removed**: ${name}\n\n`;
              content += '## Remaining Team\n\n';
              teamData.members.forEach((member: TeamMember) => {
                content += `- ${member.name} - ${member.role}\n`;
              });
            } else {
              content += `❌ **Team Member Not Found**: ${name}\n`;
            }
          } else {
            content += '❌ **No team composition found**';
          }
        }
        break;

      case 'update':
        if (!name) {
          content += '❌ **Missing required field**: name is required for update action.\n';
        } else {
          if (await fs.pathExists(this.teamFile)) {
            const teamData = await fs.readJson(this.teamFile);
            const memberIndex = teamData.members.findIndex((member: TeamMember) => member.name === name);

            if (memberIndex !== -1) {
              if (role) teamData.members[memberIndex].role = role;
              if (skills) teamData.members[memberIndex].skills = skills;

              await fs.writeJson(this.teamFile, teamData, { spaces: 2 });
              content += `✅ **Team Member Updated**: ${name}\n\n`;
              content += '## Updated Member\n\n';
              const member = teamData.members[memberIndex];
              content += `- **Role**: ${member.role}\n`;
              content += `- **Skills**: ${member.skills.join(', ')}\n`;
            } else {
              content += `❌ **Team Member Not Found**: ${name}\n`;
            }
          } else {
            content += '❌ **No team composition found**';
          }
        }
        break;

      default:
        content += `❌ **Unknown action**: ${action}\n`;
        content += 'Available actions: list, add, remove, update\n';
    }

    return content;
  }
}

export async function composeTeamHandler(args: any): Promise<any> {
  const projectRoot = process.env.AI_OFFICE_PROJECT_ROOT || process.cwd();
  const manager = new TeamManager(projectRoot);

  const action = args.action as string || 'list';
  const role = args.role as string;
  const name = args.name as string;
  const skills = args.skills as string[];

  const content = await manager.composeTeam(action, role, name, skills);

  return {
    content: [
      {
        type: 'text',
        text: content
      }
    ]
  };
}
