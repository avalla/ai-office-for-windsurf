#!/usr/bin/env node

/**
 * AI Office MCP Server
 *
 * Provides Model Context Protocol server for IDE integration.
 * Exposes tools for framework orchestration.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListResourceTemplatesRequestSchema,
  McpError
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { VERSION } from '../version.js';

// Import tool handlers
import { routeHandler } from './tools/route.js';
import { statusHandler } from './tools/status.js';
import { advanceHandler, scaffoldHandler, validateHandler, taskHandler, reviewHandler, reportHandler, pipelineInfoHandler } from './tools/stubs.js';
import { installHandler } from './tools/install.js';
import { updateHandler } from './tools/update.js';
import { uninstallHandler } from './tools/uninstall.js';
import { doctorHandler } from './tools/doctor.js';
import { generateRepoGraphHandler } from './tools/repo-graph.js';
import { listAgenciesHandler, getAgencyHandler, selectAgencyHandler } from './tools/agency.js';
import { composeTeamHandler } from './tools/team.js';
import { validateDependenciesHandler } from './tools/dependencies.js';
import { moveTaskHandler, updateTaskHandler } from './tools/task-manager.js';
import { listScriptsHandler, runScriptHandler, createScriptHandler, validateScriptHandler } from './tools/scripts.js';

// Import resource handler
import { ResourceHandler } from './resources/index.js';

const server = new Server(
  {
    name: 'ai-office',
    version: VERSION
  },
  {
    capabilities: {
      tools: {},
      resources: {
        subscribe: true,
        listChanged: true
      }
    }
  }
);

// Initialize resource handler
const resourceHandler = new ResourceHandler();

// Register tool handlers
const toolHandlers = {
  'ai_office_route': routeHandler,
  'ai_office_get_status': statusHandler.getStatus,
  'ai_office_set_status': statusHandler.setStatus,
  'ai_office_list_status': statusHandler.listStatus,
  'ai_office_advance': advanceHandler,
  'ai_office_scaffold': scaffoldHandler,
  'ai_office_validate': validateHandler,
  'ai_office_task_create': taskHandler.createTask,
  'ai_office_task_move': taskHandler.moveTask,
  'ai_office_task_list': taskHandler.listTasks,
  'ai_office_task_count': taskHandler.countTasks,
  'ai_office_review': reviewHandler,
  'ai_office_report': reportHandler,
  'ai_office_generate_repo_graph': generateRepoGraphHandler,
  'ai_office_list_agencies': listAgenciesHandler,
  'ai_office_get_agency': getAgencyHandler,
  'ai_office_select_agency': selectAgencyHandler,
  'ai_office_compose_team': composeTeamHandler,
  'ai_office_validate_dependencies': validateDependenciesHandler,
  'ai_office_move_task': moveTaskHandler,
  'ai_office_update_task': updateTaskHandler,
  'ai_office_install': installHandler.install,
  'ai_office_update': updateHandler.update,
  'ai_office_uninstall': uninstallHandler.uninstall,
  'ai_office_doctor': doctorHandler.doctor,
  'ai_office_pipeline_info': pipelineInfoHandler,
  'ai_office_list_scripts': listScriptsHandler,
  'ai_office_run_script': runScriptHandler,
  'ai_office_create_script': createScriptHandler,
  'ai_office_validate_script': validateScriptHandler
};

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'ai_office_route',
        description: 'Route a request to the appropriate pipeline stage',
        inputSchema: {
          type: 'object',
          properties: {
            request: {
              type: 'string',
              description: 'The request to route (e.g., "new feature", "bug fix", "project import")'
            },
            context: {
              type: 'string',
              description: 'Additional context about the request'
            }
          },
          required: ['request']
        }
      },
      {
        name: 'ai_office_get_status',
        description: 'Get the current status of a project or feature',
        inputSchema: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              description: 'Project or feature slug'
            }
          },
          required: ['slug']
        }
      },
      {
        name: 'ai_office_set_status',
        description: 'Set the status of a project or feature',
        inputSchema: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              description: 'Project or feature slug'
            },
            state: {
              type: 'string',
              description: 'New state (router, prd, adr, plan, tasks, ux_research, design_ui, audio_create, video_create, image_create, game_create, dev, security, qa, review, release, postmortem)'
            },
            owner: {
              type: 'string',
              description: 'Person responsible for this stage'
            },
            notes: {
              type: 'string',
              description: 'Optional notes about the status change'
            }
          },
          required: ['slug', 'state']
        }
      },
      {
        name: 'ai_office_list_status',
        description: 'List all status files in the project',
        inputSchema: {
          type: 'object',
          properties: {
            filter: {
              type: 'string',
              description: 'Optional filter for status files'
            }
          }
        }
      },
      {
        name: 'ai_office_advance',
        description: 'Advance a project to the next pipeline stage',
        inputSchema: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              description: 'Project or feature slug'
            },
            evidence: {
              type: 'string',
              description: 'Evidence that current stage is complete'
            },
            next_stage: {
              type: 'string',
              description: 'Optional: Force advancement to specific stage'
            }
          },
          required: ['slug', 'evidence']
        }
      },
      {
        name: 'ai_office_scaffold',
        description: 'Scaffold project artifacts for a stage',
        inputSchema: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              description: 'Project or feature slug'
            },
            stage: {
              type: 'string',
              description: 'Stage to scaffold for'
            },
            template: {
              type: 'string',
              description: 'Optional template to use'
            }
          },
          required: ['slug', 'stage']
        }
      },
      {
        name: 'ai_office_validate',
        description: 'Validate quality gates for a stage',
        inputSchema: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              description: 'Project or feature slug'
            },
            stage: {
              type: 'string',
              description: 'Stage to validate'
            },
            checks: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Specific checks to run'
            }
          },
          required: ['slug', 'stage']
        }
      },
      {
        name: 'ai_office_task_create',
        description: 'Create a new task',
        inputSchema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Task title'
            },
            description: {
              type: 'string',
              description: 'Task description'
            },
            priority: {
              type: 'string',
              enum: ['high', 'medium', 'low'],
              description: 'Task priority'
            },
            assignee: {
              type: 'string',
              description: 'Task assignee'
            },
            team: {
              type: 'string',
              description: 'Team responsible'
            },
            column: {
              type: 'string',
              enum: ['BACKLOG', 'TODO', 'WIP', 'REVIEW', 'DONE'],
              description: 'Kanban column'
            }
          },
          required: ['title', 'description']
        }
      },
      {
        name: 'ai_office_task_move',
        description: 'Move a task between columns',
        inputSchema: {
          type: 'object',
          properties: {
            taskId: {
              type: 'string',
              description: 'Task ID'
            },
            toColumn: {
              type: 'string',
              enum: ['BACKLOG', 'TODO', 'WIP', 'REVIEW', 'DONE'],
              description: 'Target column'
            },
            reason: {
              type: 'string',
              description: 'Reason for moving'
            }
          },
          required: ['taskId', 'toColumn']
        }
      },
      {
        name: 'ai_office_task_list',
        description: 'List tasks in a column',
        inputSchema: {
          type: 'object',
          properties: {
            column: {
              type: 'string',
              enum: ['BACKLOG', 'TODO', 'WIP', 'REVIEW', 'DONE'],
              description: 'Column to list'
            },
            assignee: {
              type: 'string',
              description: 'Filter by assignee'
            }
          }
        }
      },
      {
        name: 'ai_office_task_count',
        description: 'Count tasks per column',
        inputSchema: {
          type: 'object',
          properties: {
            team: {
              type: 'string',
              description: 'Filter by team'
            }
          }
        }
      },
      {
        name: 'ai_office_review',
        description: 'Perform multi-sector review of a document',
        inputSchema: {
          type: 'object',
          properties: {
            documentPath: {
              type: 'string',
              description: 'Path to document to review'
            },
            sectors: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Sectors to review from'
            }
          },
          required: ['documentPath']
        }
      },
      {
        name: 'ai_office_report',
        description: 'Generate project reports',
        inputSchema: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['status', 'investor', 'tech_debt', 'audit'],
              description: 'Report type'
            },
            format: {
              type: 'string',
              enum: ['markdown', 'json'],
              description: 'Output format'
            }
          },
          required: ['type']
        }
      },
      {
        name: 'ai_office_generate_repo_graph',
        description: 'Generate repository dependency graph',
        inputSchema: {
          type: 'object',
          properties: {
            include_dependencies: {
              type: 'boolean',
              description: 'Include dependency analysis',
              default: true
            },
            format: {
              type: 'string',
              enum: ['mermaid', 'dot', 'json'],
              description: 'Output format',
              default: 'mermaid'
            }
          }
        }
      },
      {
        name: 'ai_office_list_agencies',
        description: 'List available agencies',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'ai_office_get_agency',
        description: 'Get agency details',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Agency name'
            }
          },
          required: ['name']
        }
      },
      {
        name: 'ai_office_select_agency',
        description: 'Select an agency for the project',
        inputSchema: {
          type: 'object',
          properties: {
            agency_name: {
              type: 'string',
              description: 'Agency name to select'
            },
            custom_agency: {
              type: 'boolean',
              description: 'Create custom agency',
              default: false
            }
          }
        }
      },
      {
        name: 'ai_office_compose_team',
        description: 'Compose team for the project',
        inputSchema: {
          type: 'object',
          properties: {
            action: {
              type: 'string',
              enum: ['list', 'add', 'remove', 'update'],
              description: 'Action to perform',
              default: 'list'
            },
            role: {
              type: 'string',
              description: 'Team member role'
            },
            name: {
              type: 'string',
              description: 'Team member name'
            },
            skills: {
              type: 'array',
              items: { type: 'string' },
              description: 'Team member skills'
            }
          }
        }
      },
      {
        name: 'ai_office_validate_dependencies',
        description: 'Validate milestone and task dependencies',
        inputSchema: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['milestone', 'task', 'all'],
              description: 'What to validate',
              default: 'all'
            },
            identifier: {
              type: 'string',
              description: 'Specific milestone number or task ID to validate'
            }
          }
        }
      },
      {
        name: 'ai_office_move_task',
        description: 'Move a task between status directories',
        inputSchema: {
          type: 'object',
          properties: {
            task_id: {
              type: 'string',
              description: 'Task ID to move'
            },
            from_status: {
              type: 'string',
              enum: ['BACKLOG', 'TODO', 'WIP', 'REVIEW', 'DONE'],
              description: 'Current status (optional, auto-detected)'
            },
            to_status: {
              type: 'string',
              enum: ['BACKLOG', 'TODO', 'WIP', 'REVIEW', 'DONE'],
              description: 'Target status'
            }
          },
          required: ['task_id', 'to_status']
        }
      },
      {
        name: 'ai_office_update_task',
        description: 'Update task properties and recheck dependent tasks',
        inputSchema: {
          type: 'object',
          properties: {
            task_id: {
              type: 'string',
              description: 'Task ID to update'
            },
            updates: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  description: 'New task title'
                },
                priority: {
                  type: 'string',
                  enum: ['H', 'M', 'L'],
                  description: 'New priority'
                },
                dependencies: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'New dependencies list'
                },
                description: {
                  type: 'string',
                  description: 'New task description'
                }
              }
            }
          },
          required: ['task_id']
        }
      },
      {
        name: 'ai_office_pipeline_info',
        description: 'Get information about pipeline stages and transitions',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'ai_office_install',
        description: 'Install AI Office framework in a project',
        inputSchema: {
          type: 'object',
          properties: {
            target: {
              type: 'string',
              description: 'Target directory (default: current directory)',
              default: '.'
            },
            headquarters: {
              type: 'boolean',
              description: 'Install with headquarters structure',
              default: false
            },
            ide: {
              type: 'string',
              enum: ['windsurf', 'cursor', 'antigravity', 'vscode'],
              description: 'IDE type',
              default: 'windsurf'
            }
          }
        }
      },
      {
        name: 'ai_office_update',
        description: 'Update AI Office framework',
        inputSchema: {
          type: 'object',
          properties: {
            target: {
              type: 'string',
              description: 'Target directory (default: current directory)',
              default: '.'
            },
            ide: {
              type: 'string',
              enum: ['windsurf', 'cursor', 'antigravity', 'vscode', 'all'],
              description: 'IDE type to update',
              default: 'all'
            }
          }
        }
      },
      {
        name: 'ai_office_uninstall',
        description: 'Uninstall AI Office framework from a project',
        inputSchema: {
          type: 'object',
          properties: {
            target: {
              type: 'string',
              description: 'Target directory (default: current directory)',
              default: '.'
            },
            force: {
              type: 'boolean',
              description: 'Force removal',
              default: false
            }
          }
        }
      },
      {
        name: 'ai_office_doctor',
        description: 'Check framework installation health',
        inputSchema: {
          type: 'object',
          properties: {
            target: {
              type: 'string',
              description: 'Target directory (default: current directory)',
              default: '.'
            },
            verbose: {
              type: 'boolean',
              description: 'Show detailed check results',
              default: false
            }
          }
        }
      },
      {
        name: 'ai_office_list_scripts',
        description: 'List available custom scripts',
        inputSchema: {
          type: 'object',
          properties: {
            action: {
              type: 'string',
              enum: ['list', 'run', 'create', 'validate'],
              default: 'list',
              description: 'Action to perform'
            }
          }
        }
      },
      {
        name: 'ai_office_run_script',
        description: 'Run a custom script',
        inputSchema: {
          type: 'object',
          properties: {
            action: {
              type: 'string',
              enum: ['run'],
              default: 'run'
            },
            name: {
              type: 'string',
              description: 'Script name to run'
            },
            dryRun: {
              type: 'boolean',
              default: false,
              description: 'Preview execution without running'
            }
          },
          required: ['name']
        }
      },
      {
        name: 'ai_office_create_script',
        description: 'Create a new custom script',
        inputSchema: {
          type: 'object',
          properties: {
            action: {
              type: 'string',
              enum: ['create'],
              default: 'create'
            },
            name: {
              type: 'string',
              description: 'Script name'
            },
            content: {
              type: 'string',
              description: 'Script content in markdown format'
            }
          },
          required: ['name', 'content']
        }
      },
      {
        name: 'ai_office_validate_script',
        description: 'Validate a script without running',
        inputSchema: {
          type: 'object',
          properties: {
            action: {
              type: 'string',
              enum: ['validate'],
              default: 'validate'
            },
            name: {
              type: 'string',
              description: 'Script name to validate'
            }
          },
          required: ['name']
        }
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  console.error(`🔧 Tool called: ${name}`);

  if (name in toolHandlers) {
    try {
      const handler = toolHandlers[name as keyof typeof toolHandlers];
      if (typeof handler === 'function') {
        console.error(`✅ Executing ${name}...`);
        const result = await handler(args);
        console.error(`✅ ${name} completed successfully`);
        return result;
      }
      throw new McpError(ErrorCode.MethodNotFound, `Tool ${name} not found`);
    } catch (error) {
      console.error(`❌ Error in ${name}:`, String(error));
      if (error instanceof McpError) {
        throw error;
      }
      throw new McpError(ErrorCode.InternalError, `Tool execution failed: ${error}`);
    }
  }

  throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
});

// Handle resource requests
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  console.error('📋 Listing resources...');
  try {
    const result = await resourceHandler.listResources();
    console.error(`✅ Found ${result.resources.length} resources`);
    return result;
  } catch (error) {
    console.error('❌ Error listing resources:', String(error));
    throw new McpError(ErrorCode.InternalError, `Failed to list resources: ${error}`);
  }
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;
  console.error(`📖 Reading resource: ${uri}`);

  try {
    const result = await resourceHandler.readResource(uri);
    console.error(`✅ Resource read successfully: ${uri}`);
    return result;
  } catch (error) {
    console.error(`❌ Error reading resource ${uri}:`, String(error));
    if (error instanceof Error && error.message.includes('not found')) {
      throw new McpError(ErrorCode.InvalidParams, `Resource not found: ${uri}`);
    }
    throw new McpError(ErrorCode.InternalError, `Failed to read resource: ${error}`);
  }
});

server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => {
  console.error('📋 Listing resource templates...');
  try {
    const result = await resourceHandler.listResourceTemplates();
    console.error(`✅ Found ${result.resourceTemplates.length} resource templates`);
    return result;
  } catch (error) {
    console.error('❌ Error listing resource templates:', String(error));
    throw new McpError(ErrorCode.InternalError, `Failed to list resource templates: ${error}`);
  }
});

// Start server
export async function mcpServerCommand(options: {
  port?: string;
  stdio?: boolean;
  verbose?: boolean;
}) {
  console.error('🚀 Starting AI Office MCP Server...');
  console.error('📁 Working Directory:', process.cwd());
  console.error(`🔧 Registered ${Object.keys(toolHandlers).length} tools`);

  if (options.stdio) {
    console.error('🔌 Connecting via stdio transport...');
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('✅ MCP Server connected and ready!');
  } else {
    // HTTP transport not available - stdio only for now
    console.error('❌ HTTP transport not available. Use --stdio for IDE integration.');
    process.exit(1);
  }
}

// Test server capabilities when run directly
async function testServerCapabilities() {
  console.error('🔧 Testing tool registration...');

  const toolNames = Object.keys(toolHandlers);
  console.error(`✅ Found ${toolNames.length} tools: ${toolNames.join(', ')}`);

  // Test a few tool handlers to ensure they're properly initialized
  console.error('🧪 Running quick diagnostic tests...');

  try {
    // Test route handler by checking if it's a function
    if (typeof toolHandlers.ai_office_route === 'function') {
      console.error('✅ Route handler initialized');
    }

    // Test status handler by checking if it's a function
    if (typeof toolHandlers.ai_office_get_status === 'function') {
      console.error('✅ Status handler initialized');
    }

    // Test task handlers
    const taskHandlers = ['ai_office_task_create', 'ai_office_task_move', 'ai_office_task_list', 'ai_office_task_count'];
    taskHandlers.forEach(handler => {
      const handlerFn = toolHandlers[handler as keyof typeof toolHandlers];
      if (typeof handlerFn === 'function') {
        console.error(`✅ ${handler} handler initialized`);
      }
    });

    console.error('🎯 All core handlers are ready for IDE integration');

  } catch (error: any) {
    console.error('❌ Handler test failed:', error.message);
    throw error;
  }
}

// Auto-start if run directly (works with both bun and node --experimental-detect-module)
const isMain = typeof (import.meta as any).main !== 'undefined'
  ? (import.meta as any).main
  : process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'));

// Check if running from IDE (stdio mode expected) or directly (interactive mode)
const isRunningFromIDE = process.env.MCP_SERVER_MODE === 'stdio' ||
                        process.argv.includes('--stdio') ||
                        !process.stdin.isTTY;

if (isMain) {
  if (isRunningFromIDE) {
    console.error('🚀 Auto-starting MCP Server in stdio mode...');
    mcpServerCommand({ stdio: true }).catch(console.error);
  } else {
    console.error('🚀 AI Office MCP Server - Interactive Mode');
    console.error('');
    console.error('This server is designed to run via IDE integration (stdio mode).');
    console.error('For direct testing, use:');
    console.error('  bun run bin/ai-office.ts doctor');
    console.error('  bun run bin/ai-office.ts route');
    console.error('');
    console.error('To force stdio mode, run:');
    console.error('  bun run src/mcp-server/index.ts --stdio');
    console.error('');
    console.error('Testing server capabilities...');
    testServerCapabilities().then(() => {
      console.error('✅ Server test completed. Exiting gracefully.');
      process.exit(0);
    }).catch((error) => {
      console.error('❌ Server test failed:', error);
      process.exit(1);
    });
  }
}

// Handle process termination for stdio mode
process.on('SIGINT', () => {
  console.error('\n👋 MCP Server shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('\n👋 MCP Server shutting down...');
  process.exit(0);
});

// Handle stdin close (when IDE disconnects)
process.stdin.on('close', () => {
  console.error('📡 IDE disconnected, shutting down...');
  process.exit(0);
});
