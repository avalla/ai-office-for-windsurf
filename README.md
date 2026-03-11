
# 🤖 AI Office for Windsurf

> A comprehensive **AI Software Company framework** designed specifically for Windsurf IDE, enabling systematic project development with multi-role workflows and enterprise-grade quality assurance.

![Framework Status](https://img.shields.io/badge/Status-Production%20Ready-green)
![Version](https://img.shields.io/badge/Version-3.1-blue)
[![License](https://img.shields.io/badge/License-MIT-yellow)](https://opensource.org/licenses/MIT)
![Windsurf](https://img.shields.io/badge/Windsurf-IDE%20Integration-purple)

## 🌟 Overview

AI Office for Windsurf is a **modular framework** that transforms how software projects are developed by implementing a complete AI-driven software company workflow. It provides structured processes, quality gates, and documentation standards that ensure consistent, high-quality project delivery.

### 🎯 Key Features

- **🔄 Multi-Role Workflows**: CEO, Architect, Planner, Developer, QA, Reviewer, Release Manager, Ops
- **🧠 Memory Layer**: Persistent learning and decision tracking
- **📋 Quality Gates**: Multi-sector reviews for all artifacts
- **🏗️ Architecture Mapping**: System-wide dependency and relationship tracking
- **🔒 Security Helpers**: Supabase/SQL security patterns and best practices
- **📊 Logging & Decisions**: Complete audit trail for all project decisions
- **📚 Template System**: Standardized documentation and code templates
- **🚀 Project Orchestration**: End-to-end workflow automation

## 🏗️ Architecture

### Framework Structure

```
ai-office-windsurf/
├── 📁 .windsurf/                    # Framework core
│   ├── 📁 workflows/               # Workflow definitions
│   ├── 📁 skills/                  # Reusable AI skills
│   ├── 📁 rules/                   # Framework rules and constraints
│   ├── 📁 templates/               # Document and code templates
│   └── 📄 office-config.md         # Agency configuration (agents, roles)
├── 📁 office/                       # Agency operations
│   ├── 📁 clients/                 # Client profiles
│   ├── 📁 meetings/                # Virtual meeting archives
│   └── 📁 reports/                 # Generated reports
├── 📁 docs/                        # Framework documentation
│   ├── 📁 architecture/            # System architecture docs
│   ├── 📁 memory/                  # Learning and patterns
│   ├── 📁 logs/                    # System logs
│   └── 📁 runbooks/                # Operational guides
├── 📁 projects/                    # Multi-project workspace
│   ├── 📁 _skeleton/               # Project template
│   └── 📁 <project-name>/          # Individual projects
└── 📁 architecture/                # High-level architecture
```

### Agency Configuration

The agency is configured in `.windsurf/office-config.md` with:

- **Agent Roster:** 21 specialized agents across orchestration, executive, design, creative, technical, quality, and operations layers
- **Communication Protocols:** Inter-agent communication, meeting cadence
- **Decision Authority Matrix:** Who decides what
- **Operational Parameters:** Quality thresholds, iteration limits
- **Client Interaction Model:** Engagement types and communication style

### Multi-Project Workspace

Each project under `projects/<project>/` has its own:

- **📁 docs/** - Project artifacts (PRD, ADR, plans, tasks)
- **📁 architecture/** - Project-specific architecture
- **📁 memory/** - Project learning and decisions
- **📁 .ai-agency/** - AI Office integration

## 🚀 Getting Started

### Prerequisites

- **Windsurf IDE** installed and configured
- **Cascade AI** enabled in Windsurf
- Repository cloned and up to date

### Quick Start

1. **Create New Project**
   ```bash
   # Create project folder
   mkdir projects/<project-name>

   # Copy skeleton template
   cp -r projects/_skeleton/* projects/<project-name>/
   ```

2. **Start Workflow**
   - Invoke workflow via slash command: `/00_router`
   - The system will orchestrate the entire pipeline

3. **Follow the Pipeline**
   - Each state requires multi-sector review before advancement
   - All artifacts are automatically validated
   - Progress is tracked in status files

### Workflow States

| State | Role | Purpose | Output |
|-------|------|---------|--------|
| **00_router** | Router | Project routing & initialization | Status file |
| **01_create_project** | PM | Project setup & core artifacts | PRD, ADR, Plan |
| **01_import_project** | PM | Import existing project into framework | Config, ADR |
| **10_ceo_prd** | CEO | Product requirements | PRD |
| **20_arch_adr** | Architect | Technical decisions | ADR |
| **05_planner** | Planner | Macro planning | Plan |
| **30_plan_tasks** | Planner | Task breakdown | Tasks |
| **40_dev_implement** | Developer | Implementation | Code |
| **45_security_pentest** | Security | Security assessment | Pentest report |
| **50_qa_validate** | QA | Quality assurance | Test results |
| **60_review_merge** | Reviewer | Code review | Approval |
| **70_release** | Release | Release preparation | Changelog |
| **90_postmortem_memory** | Ops | Learning & improvements | Postmortem |

### Agency Operations Workflows

| Workflow | Purpose | Trigger |
|----------|---------|---------|
| **office-client-onboard** | Onboard new clients, establish communication | `/office-client-onboard` |
| **office-project-status** | Consolidated view of all projects | `/office-project-status` |
| **office-agent-meeting** | Virtual meetings between agents | `/office-agent-meeting` |
| **office-report** | Generate agency reports | `/office-report` |

## 📚 Documentation

### 🎯 Primary Documents (Start Here)

| Document | Purpose | Location |
|----------|---------|----------|
| **Framework Map** | System contracts & relationships | `docs/repo-graph.md` |
| **Architecture Overview** | System design & components | `architecture/system-overview.md` |
| **Quick Start Guide** | New project onboarding | `docs/runbooks/start-new-project-quickstart.md` |

### 📖 Secondary Documents

| Document | Purpose | Location |
|----------|---------|----------|
| **Operational Checklist** | Step-by-step guidance | `docs/runbooks/start-new-project-operational-checklist.md` |
| **Beta Roadmap** | Development timeline | `docs/beta-operational-roadmap.md` |
| **Risk Assessment** | Known risks & mitigations | `docs/beta-residual-risks.md` |
| **Decision History** | Framework evolution | `docs/decision-log.md` |

## 🎯 Demo Projects

### 🌐 ai-office-demo
- **Status**: ✅ Complete (full cycle executed)
- **Location**: `projects/ai-office-demo/`
- **Technology**: Vite + React + TypeScript + Tailwind CSS
- **Purpose**: Demo website showcasing AI Office capabilities

## 🔧 Core Components

### 🔄 Workflow System
- **State Machine**: Ensures proper progression through development stages
- **Quality Gates**: Multi-sector reviews prevent weak handoffs
- **Artifact Tracking**: Complete audit trail of all project decisions
- **Loop Guards**: Automatic iteration handling for failed states

### 🧠 Memory Layer
- **Decision Logging**: All decisions tracked with rationale
- **Pattern Recognition**: Reusable patterns across projects
- **Learning Loop**: Continuous improvement through postmortems
- **Knowledge Base**: Persistent storage of best practices

### 🛡️ Quality Assurance
- **Multi-Sector Reviews**: Product, Architecture, Security, Reliability, QA, Operations
- **Automated Validation**: Built-in checks for all artifacts
- **Template Enforcement**: Consistent documentation standards
- **Audit Trail**: Complete history of all changes and reviews

## 📊 Framework Benefits

### 🎯 Business Benefits
- **Consistent Quality**: Enterprise-grade standards across all projects
- **Predictable Delivery**: Reliable timelines and outcomes
- **Risk Mitigation**: Systematic identification and handling of risks
- **Scalable Process**: Works for projects of any size

### 👥 Team Benefits
- **Clear Roles**: Defined responsibilities for each workflow state
- **Reduced Context Switching**: Focused work within defined stages
- **Knowledge Sharing**: Persistent memory and decision tracking
- **Continuous Learning**: Postmortem-driven improvements

### 🔧 Technical Benefits
- **Standardized Architecture**: Consistent patterns across projects
- **Security by Design**: Built-in security considerations
- **Performance Focus**: Systematic performance optimization
- **Maintainable Code**: Quality gates and review processes

## 🔒 Security & Compliance

### 🛡️ Security Features
- **Security Reviews**: Dedicated security assessment workflow (`45_security_pentest`)
- **Penetration Testing**: Comprehensive security testing and vulnerability assessment
- **OWASP Compliance**: Testing against OWASP Top 10 security risks
- **Dependency Scanning**: Automated vulnerability detection with Snyk
- **Security Reporting**: Detailed vulnerability reports with remediation guidance
- **Supabase Helpers**: SQL security patterns and RLS policies
- **Secure Templates**: Security-conscious code and documentation templates

### 📋 Compliance
- **Audit Ready**: Complete documentation and decision trails
- **Quality Standards**: Enterprise-grade development practices
- **Regulatory Support**: Framework adaptable to compliance requirements
- **Documentation**: Comprehensive records for audit purposes

## 🚀 Advanced Features

### 🔄 Workflow Orchestration
- **Automatic State Transitions**: System-managed workflow progression
- **Error Handling**: Graceful failure recovery and iteration
- **Parallel Processing**: Multiple projects can run simultaneously
- **Resource Management**: Efficient allocation of AI resources

### 📊 Analytics & Reporting
- **Project Metrics**: Track progress, quality, and performance
- **Decision Analytics**: Analyze patterns and improve processes
- **Quality Metrics**: Monitor code quality and testing coverage
- **Performance Tracking**: Measure development velocity and efficiency

## 🤝 Contributing

### 🏗️ Framework Development
- **Workflow Enhancement**: Add new workflow states or modify existing ones
- **Template Improvements**: Enhance documentation and code templates
- **Skill Development**: Create new reusable AI skills
- **Rule Updates**: Refine framework rules and constraints

### 📝 Documentation
- **Guide Updates**: Keep documentation current with framework changes
- **Examples**: Add real-world usage examples
- **Best Practices**: Document proven approaches and patterns
- **Troubleshooting**: Help users resolve common issues

## 📞 Support & Community

### 🆘 Getting Help
- **Documentation**: Start with primary documents listed above
- **Quick Start**: Follow the new project onboarding guide
- **Examples**: Review demo projects for implementation patterns
- **Templates**: Use skeleton project as starting point

### 💬 Community
- **Discussions**: Share experiences and best practices
- **Issues**: Report bugs and request features
- **Contributions**: Submit pull requests for improvements
- **Feedback**: Help improve the framework

## � Acknowledgments

Special thanks to the **[get-shit-done](https://github.com/gsd-build/get-shit-done)** project for inspiring the metaframework approach and demonstrating the power of spec-driven development systems. Their work on context engineering and meta-prompting has been instrumental in shaping the AI Office methodology.

## �📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**🤖 Built by the AI Office Team**

![AI Office](https://img.shields.io/badge/AI%20Office-Powered%20by%20AI-blue)
![Windsurf](https://img.shields.io/badge/Windsurf-IDE%20Integration-purple)

**Transforming software development with AI-driven workflows**

</div>

---

*Generated: 2026-03-07 | Framework Version: 3.1 | Last Updated: 2026-03-07*
