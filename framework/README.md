# AI Office Framework

## 📋 Overview

The AI Office Framework provides a comprehensive system for managing projects with AI-powered workflows, agencies, and agents.

## 🏗️ Structure

```
framework/
├── core/                              # 📁 Core framework content
│   ├── agencies/ (10 agencies)        # 🏢 Specialized agencies
│   ├── agents/ (21 agents)            # 👥 AI agent profiles
│   ├── rules/ (22 rules)              # 📏 Development rules
│   ├── skills/ (19 skills)            # 🛠️ Agent skills
│   ├── templates/ (6 templates)       # 📄 Project templates
│   └── workflows/ (15 workflows)       # 🔄 Workflow definitions
├── office-config.md                   # ⚙️ Office configuration
├── software-mcp-proposals.md          # 💻 Software/MCP proposals
└── package.json                       # 📦 Framework package
```

## 🏢 Agencies

Available agencies for different project types:

- **software-studio** - Software development projects
- **creative-agency** - Creative and design projects
- **game-studio** - Game development projects
- **lean-startup** - Lean startup methodology
- **media-agency** - Media production projects
- **penetration-test-agency** - Security testing
- **crazy-studio** - High-creative projects
- **theatrical-agency** - Spectacular launches
- **wolf-of-wall-crypto-agency** - Crypto projects

## 👥 Agents

21 specialized AI agents covering all project roles:

- **Leadership**: CEO, PM, Architect, Planner
- **Development**: Developer, Game Developer, Security
- **Creative**: Designer, UX Researcher, Audio/Video/Image Creators
- **Operations**: QA, Reviewer, Release Manager, Ops
- **Specialized**: Router, Culture Hacker, Provocation Director
- **Crypto**: Tokenomics Strategist, Scalper

## 🔄 Integration

The framework integrates with the AI Office MCP server located at `src/mcp-server/` providing:

- **17 MCP tools** for project management
- **Dependency validation** and automatic rechecking
- **Agency selection** and team composition
- **Repository analysis** and reporting

## 🚀 Usage

1. **MCP Server**: Use `src/mcp-server/` for IDE integration
2. **Framework Content**: Access agencies/agents from `framework/core/`
3. **Configuration**: Set up in `.windsurf/mcp_config.example.json`

## 📖 Documentation

- See `MIGRATION_COMPLETE.md` for MCP server details
- See `FRAMEWORK_ANALYSIS.md` for structural analysis
- See individual agency/agent documentation in `core/`

---

**AI Office Framework v5.0** - Complete project management system with AI-powered workflows.
