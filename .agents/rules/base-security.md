---
trigger: always_on
---

# Security Best Practices

## Secrets Management
- Never commit secrets, API keys, or credentials to version control.
- Use `.env.example` for template files; actual secrets via secret managers.
- Rotate secrets and keys regularly; document rotation procedures.

## Input Validation
- Validate and sanitize all inputs at system boundaries (API, jobs, webhooks).
- Use parameterized queries; never string concatenation for SQL/queries.
- Never log sensitive data (passwords, tokens, PII).

## Webhook & External Operations
- Store and verify webhook signatures; persist raw events for audit/replay.
- Implement idempotency keys for external side-effect operations.

## Logging & Monitoring
- Log security-relevant events (auth changes, role changes, failed checks).
- Keep security logs separate from application logs.

## Dependencies
- Pin dependency versions; review security advisories regularly.
- Run automated security scans on dependencies and code.
