---
trigger: always_on
description: Guidelines for using MCP Sequential Thinking for complex problem solving
---

# MCP: Sequential Thinking

## When to Use
- **Complex Problem Solving**: Breaking down complex problems into steps
- **Planning and Design**: Room for revision and course correction
- **Analysis Requiring Course Correction**: Problems where full scope isn't clear initially
- **Multi-step Solutions**: Tasks that need context over multiple steps
- **Filtering Irrelevant Information**: Problems with noise

## Best Practices

### Workflow
1. **Start with initial estimate** of needed thoughts, but be ready to adjust
2. **Feel free to question or revise** previous thoughts
3. **Don't hesitate to add more thoughts** if needed, even at the "end"
4. **Express uncertainty when present**
5. **Mark thoughts that revise previous thinking** or branch into new paths
6. **Ignore information that is irrelevant** to the current step
7. **Generate a solution hypothesis** when appropriate
8. **Verify the hypothesis** based on the Chain of Thought steps
9. **Repeat the process until satisfied** with the solution
10. **Provide a single, ideally correct answer** as the final output

### Key Features
- Adjust `total_thoughts` up or down as you progress
- Question or revise previous thoughts
- Add more thoughts even after reaching what seemed like the end
- Express uncertainty and explore alternative approaches
- Not every thought needs to build linearly - you can branch or backtrack
- Generates a solution hypothesis
- Verifies the hypothesis based on the Chain of Thought steps

### When to Stop
- Only set `nextThoughtNeeded` to false when truly done
- A satisfactory answer is reached
- All items in a todo list are checked off
- The problem is completely solved

## Anti-Patterns
- ❌ Don't rush to conclusion without thorough analysis
- ❌ Don't ignore contradictions in previous thoughts
- ❌ Don't fail to verify the final hypothesis
- ❌ Don't stop when additional thinking would improve the solution
