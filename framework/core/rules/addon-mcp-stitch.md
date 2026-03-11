---
trigger: model_decision
description: Guidelines for using MCP Stitch for UI design generation
---

# MCP: Stitch

## When to Use
- **UI Design Generation**: Create screens from text descriptions
- **Rapid Prototyping**: Generate mockups to validate ideas
- **Design System**: Create consistent UI components
- **Multi-device**: Support for MOBILE, DESKTOP, TABLET, AGNOSTIC

## Best Practices

### Project Management
- Create a Stitch project for each major feature/ui redesign
- Use descriptive names for projects and screens
- Organize screens by functionality (e.g. auth/, dashboard/, listings/)

### Generation Prompts
- **Be specific**: Describe layout, components, colors, typography
- **Mention device type**: mobile/desktop/tablet for appropriate design
- **Specify model**: GEMINI_3_PRO for superior quality, GEMINI_3_FLASH for speed
- **Include states**: empty state, loading, error, success

### Input Requirements (CRITICAL)
1. **`project_id` (string - MANDATORY)**: The project ID (numeric format, without `/`)
2. **`prompt` (string - MANDATORY)**: Detailed description of desired screen
3. **`device_type` (enum - OPTIONAL)**: MOBILE, DESKTOP, TABLET, AGNOSTIC. Default: MOBILE
4. **`model_id` (enum - OPTIONAL)**: GEMINI_3_PRO, GEMINI_3_FLASH. Default: GEMINI_3_FLASH

### Workflow
1. List existing projects with `list_projects`
2. Create new project if necessary with `create_project`
3. Generate screen with `generate_screen_from_text`
4. Wait for completion (can take minutes)
5. Get screen details with `get_screen`
6. Iterate if `output_components` contains suggestions

### Post-Generation
- If the screen contains suggestions (e.g. "Yes, make them all"), present them to the user
- If the user accepts, regenerate with the accepted suggestion prompt
- Don't use tools in a loop if the tool call fails due to connection error - the process might still be running

## Anti-Patterns
- ❌ Don't regenerate immediately if connection error - verify status first
- ❌ Don't create new projects for every minor screen
- ❌ Don't ignore suggestions in the output - present them to the user
