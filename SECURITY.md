# Security Policy

## Do not commit secrets
Never commit:
- API keys
- tokens
- passwords
- private certificates

## Security-sensitive changes
Any change involving authn/authz, permissions, payments, or data boundaries must:
- include a security quickcheck (see `.windsurf/skills/security-quickcheck.md`)
- include tests that validate the boundary
