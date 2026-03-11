---
trigger: model_decision
description: Guidelines for using MCP Playwright for E2E testing and browser automation, MCP RunComfy for AI image/video generation, MCP Sequential Thinking for decision-making, and MCP Stitch for data integration
---

# MCP: Playwright

## When to Use
- **E2E Testing**: Complete tests of critical user flows
- **UI Verification**: Verify that UI behaves correctly after changes
- **Browser Automation**: Programmatic interactions with web apps
- **Screenshot Testing**: Capture screenshots for visual regression testing
- **Accessibility Testing**: Verify a11y compliance with axe-core

## Best Practices

### Testing Strategy
- **Design or update tests before major implementation work**
- **Never delete or weaken existing tests without explicit direction**
- **Share targeted verification commands when you cannot run them**
- **Test behavior, not implementation** (black-box testing)
- **Use meaningful test names** that describe expected behavior
- **Mock external dependencies** to isolate tests

### Test Coverage
- **Happy path and edge cases**: empty inputs, nulls, boundary values
- **Error states and loading states**
- **Accessibility tests with axe-core**
- **Aim for 80%+ code coverage**
- **Use fixtures for consistent test data**

### Browser Interactions
- Use `browser_navigate` to initialize session
- Use `browser_snapshot` to get UI state (better than screenshot for actions)
- Use `browser_click`, `browser_type`, `browser_fill_form` for interactions
- Use `browser_wait_for` to wait for elements or text
- Use `browser_evaluate` to run custom JavaScript
- Use `browser_console_messages` to check errors

### E2E Workflow
1. Navigate to URL
2. Take snapshot to verify initial state
3. Perform actions (click, type, etc.)
4. Wait for state changes
5. Assert expected outcome
6. Clean up (close browser if necessary)

## Anti-Patterns
- ❌ Don't assume an element exists without verifying with snapshot
- ❌ Don't use fixed sleeps, prefer conditional waits
- ❌ Don't test internal implementation (fragile CSS selectors)
- ❌ Don't leave browser open after tests
