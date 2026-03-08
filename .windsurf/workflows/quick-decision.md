# Workflow: Quick Action vs Task Decision

## ROLE
Decision orchestrator for user requests.

## GOAL
Determine if a user request should be handled as a formal task (with documentation, tracking, and workflow) or as a quick direct modification. Always ask the user to choose before proceeding.

## TRIGGER
Any user request that could be either:
- A quick modification/fix
- A formal task with documentation

## STEPS
1) **Analyze Request Type**:
   - Is this a quick fix/modification? (e.g., "fix this bug", "add this feature", "disable indexing")
   - Could this benefit from formal task tracking? (e.g., complex features, research tasks, multi-step work)

2) **Present Choice to User**:
   ```
   I received your request: [brief description]

   I can proceed in two ways:

   🚀 **Direct Modification**: I make the change immediately without creating formal tasks
      - Fast and immediate
      - No formal task documentation
      - Suitable for simple fixes or minor changes

   📋 **Formal Task**: I create a documented task with full tracking
      - Formal documentation
      - Progress tracking
      - Suitable for complex or high-impact work

   How would you like to proceed?
   ```

3) **Route Based on Choice**:
   - **Direct Modification**: Execute immediately using available tools
   - **Formal Task**: Route to `00_router` for formal task creation

## EXAMPLES

**Quick Direct Actions**:
- "disable search engine indexing" → Direct Modification
- "fix dark mode bug" → Direct Modification
- "add meta tag" → Direct Modification

**Formal Tasks**:
- "implement a full authentication system" → Formal Task
- "research and comparative analysis of cultural exports" → Formal Task
- "develop a new theoretical framework" → Formal Task

## IMPLEMENTATION NOTES
- Always ask user preference before proceeding
- Use clear emoji and formatting for choice presentation
- Route appropriately based on user decision
- Log the decision in conversation for context
