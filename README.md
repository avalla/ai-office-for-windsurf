# AI Office Framework

🚀 **AI-driven multi-role collaboration framework for software projects**

## 🎯 Quick Start

### Install via npm (recommended)

```bash
# Install globally
npm install -g @ai-office/mcp-adapter

# Install in your project
cd your-project
ai-office install --ide windsurf   # or cursor, antigravity, vscode
```

### Install via npx (no global install)

```bash
npx @ai-office/mcp-adapter install --ide windsurf
```

### CLI Commands

```bash
ai-office install   # Install framework in current project
ai-office init      # Alias for install
ai-office update    # Update framework files
ai-office doctor    # Check installation health
ai-office uninstall # Remove framework
ai-office serve     # Start the MCP server (stdio)
```

## 📋 What It Provides

- **🤖 21 AI Agents** - Specialized roles (CEO, Architect, Developer, QA, etc.)
- **🏢 6 Agencies** - Pre-configured workflows (Software Studio, Creative Agency, etc.)
- **🔧 MCP Integration** - 30 tools + Resources for Windsurf/Cursor/Antigravity/VS Code
- **📋 Task Management** - Kanban board with automated workflows
- **🎯 Pipeline Stages** - From PRD to Release with quality gates
- **📚 Resources** - Framework artifacts accessible via MCP resources

## 🔧 MCP Setup

The `ai-office install` command auto-configures your IDE. You can also set it up manually:

**Windsurf** — `.windsurf/mcp_config.json`:
```json
{
  "mcpServers": {
    "ai-office": {
      "command": "npx",
      "args": ["-y", "@ai-office/mcp-adapter", "serve", "--stdio"]
    }
  }
}
```

**Cursor** — `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "ai-office": {
      "command": "npx",
      "args": ["-y", "@ai-office/mcp-adapter", "serve", "--stdio"]
    }
  }
}
```

**VS Code** — `.vscode/mcp.json`:
```json
{
  "servers": {
    "ai-office": {
      "command": "npx",
      "args": ["-y", "@ai-office/mcp-adapter", "serve", "--stdio"]
    }
  }
}
```

**Antigravity** — `.antigravity/mcp_config.json` (same as Windsurf format)

**⚠️ Important:**
- The `--stdio` flag is **required** for IDE integration
- Set `AI_OFFICE_PROJECT_ROOT` env var if you need to override the project root
- Server uses current working directory as project root (supports multiple projects)

## 📁 Project Structure

```
your-project/
├── .ai-office/           # Framework configuration
│   ├── agencies/         # Available agencies
│   ├── agents/           # AI agent profiles
│   ├── tasks/            # Task board (BACKLOG, TODO, WIP, etc.)
│   └── templates/        # Project templates
├── .windsurf/           # IDE integration
│   ├── workflows/       # AI workflows
│   ├── skills/          # AI skills
│   └── mcp_config.json  # MCP server configuration
└── your-project-files/  # Your actual project
```

## 🤖 Available Tools

**Pipeline & Status:**
- `ai_office_route` - Route requests to pipeline stages
- `ai_office_get_status` - Get project/feature status
- `ai_office_set_status` - Update status
- `ai_office_list_status` - List all status files
- `ai_office_advance` - Move to next pipeline stage
- `ai_office_scaffold` - Generate stage artifacts
- `ai_office_validate` - Validate quality gates
- `ai_office_pipeline_info` - Get pipeline stages and transitions

**Task Management:**
- `ai_office_task_create` - Create new tasks
- `ai_office_task_move` - Move tasks between columns
- `ai_office_task_list` - List tasks by column
- `ai_office_task_count` - Count tasks per column
- `ai_office_move_task` - Move task with dependency check
- `ai_office_update_task` - Update task properties
- `ai_office_validate_dependencies` - Validate task/milestone dependencies

**Agency & Team:**
- `ai_office_list_agencies` - List available agencies
- `ai_office_get_agency` - Get agency details
- `ai_office_select_agency` - Select agency for project
- `ai_office_compose_team` - Manage team composition

**Framework:**
- `ai_office_install` - Install framework in project
- `ai_office_update` - Update framework
- `ai_office_uninstall` - Remove framework
- `ai_office_doctor` - Check installation health
- `ai_office_generate_repo_graph` - Repository dependency graph
- `ai_office_review` - Multi-sector document review
- `ai_office_report` - Generate project reports

## 📚 Available Resources

- `ai-office://pipeline` - Framework pipeline configuration
- `ai-office://team` - Team roles and agents
- `ai-office://status/{slug}` - Project/feature status files
- `ai-office://tasks/{column}` - Task board by column
- `ai-office://agencies/{name}` - Agency configurations
- `ai-office://docs/{doc}` - Framework documentation

*Resources are automatically discovered and accessible via your IDE's resource browser*

## 🏢 Available Agencies

1. **Software Studio** - Full-stack web/mobile apps
2. **Creative Agency** - Media & content production
3. **Game Studio** - Game development
4. **Lean Startup** - Rapid MVP development
5. **Penetration Test Agency** - Security testing
6. **Media Agency** - Video/movie production

## 🚀 Version

**v5.0.0** - MCP-only architecture with Bun runtime

---

*AI Office - Where AI agents collaborate to build great software*
