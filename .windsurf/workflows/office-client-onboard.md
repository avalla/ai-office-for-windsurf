# Workflow: office-client-onboard

## ROLE
PM + CEO

## GOAL
Onboard a new client into the AI Office agency, establishing communication channels, understanding requirements, and setting up project infrastructure.

## TRIGGER
- User requests new client engagement
- `/office-client-onboard` slash command
- Router identifies new client scenario

## OUTPUTS (must)
- Client profile in `office/clients/<client-slug>/profile.md`
- Communication preferences documented
- Initial project(s) identified
- NDA/confidentiality acknowledgment (if needed)

## STEPS

1. **Client Identification**
   - Ask for client name/identifier
   - Generate client slug (kebab-case)
   - Create `office/clients/<client-slug>/` directory

2. **Gather Client Information**
   - Business domain/industry
   - Technical background
   - Preferred communication style
   - Timezone constraints
   - Priority level (standard/premium/enterprise)

3. **Establish Communication Protocol**
   - Primary contact method (Cascade chat, email, other)
   - Update frequency preference
   - Escalation path
   - Meeting cadence (if applicable)

4. **Initial Project Scoping**
   - Identify first project(s)
   - Determine engagement type:
     - Full project development
     - Feature enhancement
     - Bug fixing
     - Consulting/review
     - Project import
   - Route to appropriate workflow

5. **Create Client Profile**
   ```markdown
   # Client Profile: <Client Name>
   
   ## Basic Info
   - **Slug:** <client-slug>
   - **Industry:** <industry>
   - **Onboarded:** YYYY-MM-DD
   - **Priority:** standard|premium|enterprise
   
   ## Communication
   - **Preferred Channel:** <channel>
   - **Update Frequency:** daily|weekly|on-demand
   - **Timezone:** <timezone>
   
   ## Projects
   - [<project-1>](../../projects/<project-1>/)
   
   ## Notes
   <initial notes>
   ```

6. **Route to Project Workflow**
   - If new project: route to `/01_create_project`
   - If import: route to `/01_import_project`
   - If consulting: route to appropriate analysis workflow

## CLIENT DIRECTORY STRUCTURE
```
office/
├── clients/
│   ├── <client-slug>/
│   │   ├── profile.md
│   │   ├── communications/
│   │   │   └── <date>-summary.md
│   │   └── contracts/
│   │       └── nda-acknowledgment.md (if needed)
```

## QUALITY GATES
- Client profile complete
- Communication protocol established
- At least one project identified
- Proper routing decision made

---

Created: 2026-03-09
