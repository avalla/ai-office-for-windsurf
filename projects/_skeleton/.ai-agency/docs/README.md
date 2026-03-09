# Documentation

Project documentation, specifications, and guides.

## Structure

- `prd/` - Product Requirements Documents
- `qa/` - Quality assurance documentation
- `runbooks/` - Operational procedures and guides
- `api/` - API documentation
- `guides/` - User guides and tutorials

## Essential Guides for AI Assistants

### 🚀 Quick Start
- **[Quick Start Guide](guides/quick-start.md)** - 5-minute setup and daily commands
- **[Metaframework Commands](guides/metaframework-commands.md)** - Complete command reference

### Key Commands for Discovery
```bash
# Show all available tools
bun .ai-agency/cli.js help

# Task management with auto-testing
bun .ai-agency/cli.js task-manager create T001 "Task" TODO team
bun .ai-agency/cli.js task-manager move T001 REVIEW  # Auto-runs tests

# Review testing
bun .ai-agency/cli.js review-tester queue
bun .ai-agency/cli.js review-tester test T001

# Project status
bun .ai-agency/cli.js report summary
bun .ai-agency/cli.js report workflow

# Tech stack management
bun .ai-agency/cli.js tech-stack-manager stacks
bun .ai-agency/cli.js tech-stack-manager apply crazy-studio game
```

## Documentation Standards

1. Use clear, concise language
2. Include examples and code snippets
3. Keep documentation in sync with implementation
4. Use consistent formatting and structure
5. Review and update documentation regularly

## Contributing

When adding documentation:
1. Place files in the appropriate subfolder
2. Use markdown format
3. Include relevant examples
4. Update this README if adding new sections
5. Add command references to metaframework-commands.md
