---
trigger: model_decision
description: Apply when running Lighthouse audits for performance, accessibility, SEO, and best practices
---

# MCP: Lighthouse

## When to Use
- **Performance Auditing**: Verify Core Web Vitals (LCP, FID, CLS)
- **SEO Analysis**: Check SEO best practices
- **Accessibility Checks**: Verify a11y compliance
- **PWA Validation**: Verify Progressive Web App requirements
- **Pre-deployment QA**: Ensure quality before release

## Best Practices

### When to Run Audits
- **After significant UI changes**: Verify performance impact
- **Before production deploy**: Final quality check
- **After adding new dependencies**: Verify bundle bloat
- **Periodic**: Monitor regressions over time

### Audit Scope
- **Categories**: performance, accessibility, best-practices, seo, pwa
- **Device**: mobile (default) or desktop
- **Throttling**: apply for realistic testing (default true)

### Interpreting Results
- **Score < 50**: Critical, requires immediate intervention
- **Score 50-89**: Improvable, plan optimizations
- **Score 90+**: Excellent, maintain standard

### Common Optimizations
- **Performance**: lazy loading, code splitting, image optimization
- **Accessibility**: ARIA labels, color contrast, keyboard navigation
- **SEO**: meta tags, structured data, sitemap
- **Best Practices**: HTTPS, CSP headers, modern APIs

## Anti-Patterns
- ❌ Don't ignore failed audits before deploy
- ❌ Don't test only on desktop (mobile is more critical)
- ❌ Don't assume high score = perfect UX
- ❌ Don't audit only homepage, test critical pages
