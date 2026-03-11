---
trigger: model_decision
description: Guidelines for using MCP Fetch tool to retrieve web content
---

# MCP: Fetch

## When to Use
- **URL fetching**: Retrieve content from internet URLs (HTML, JSON, API)
- **Web scraping**: Extract data from public pages
- **Research**: Verify dependencies, documentation, updated libraries
- **Context expansion**: Navigate links found in content recursively

## Best Practices

### Pre-Fetch
- **Verify necessity**: Is the knowledge out-of-date? If yes, fetch is necessary
- **Valid URLs**: Only valid and reachable HTTP/HTTPS URLs
- **Wait for user approval**: Non-pre-approved URLs require user confirmation

### During Fetch
- **Max length**: Use appropriate `max_length` (default 5000 char)
- **Pagination**: If content is long, use `start_index` to continue
- **Raw mode**: Use `raw: true` when real HTML is needed, not simplified

### Post-Fetch
- **Recursive analysis**: If you find relevant links, fetch those too
- **Data extraction**: Extract only relevant information, ignore boilerplate
- **Verify completeness**: Is the content truncated? Request more chunks

## Common Use Cases

### Package/Library Verification
```
Fetch https://www.npmjs.com/package/[package-name]
Fetch https://github.com/[owner]/[repo]/blob/main/README.md
```

### API Documentation
```
Fetch https://docs.[service].com/api-reference
```

### Problem Research
```
Fetch https://github.com/[owner]/[repo]/issues?q=[problem]
Fetch https://stackoverflow.com/questions/[id]
```

## Anti-Patterns
- ❌ Don't fetch URLs already fetched in the same session
- ❌ Don't assume fetched content is complete without verifying
- ❌ Don't fetch URLs not provided by the user without approval
