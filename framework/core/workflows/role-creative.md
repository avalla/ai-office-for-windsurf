---
description: Guidance for creative roles — UX research, UI design, audio, video, image, game creation
---

# Role: Creative

## Stages Covered
- `ux_research` — User research, personas, user flows
- `design_ui` — UI/UX design, component library, design tokens
- `audio_create` — Music, sound effects, voiceover
- `video_create` — Trailers, tutorials, promotional video
- `image_create` — Illustrations, icons, textures, concept art
- `game_create` — Game mechanics, physics, input handling, game loop

---

## UX Research

### Goal
Conduct user research before design/implementation to reduce product risk.

### Outputs
- `.ai-agency/docs/research/<slug>-research.md`
- User personas with goals, frustrations, behaviors
- User flows and journey maps
- Usability findings and recommendations

### Checklist
- [ ] Target user segments identified
- [ ] Personas created with realistic scenarios
- [ ] User flows mapped for key tasks
- [ ] Competitive analysis performed
- [ ] Research findings prioritized by impact
- [ ] Recommendations actionable and linked to PRD goals

### After: advance to `design_ui`

---

## UI/UX Design

### Goal
Create implementation-ready UI/UX specifications aligned with requirements and research.

### Outputs
- `.ai-agency/docs/design/<slug>-design.md`
- Component library / design tokens
- Style guide (colors, typography, spacing)
- Responsive layouts and interaction patterns

### Checklist
- [ ] Design aligns with PRD requirements
- [ ] Research findings incorporated
- [ ] Component library defined
- [ ] Design tokens documented (colors, fonts, spacing)
- [ ] Responsive breakpoints specified
- [ ] Accessibility requirements met (WCAG 2.1 AA minimum)
- [ ] Interaction states documented (hover, active, disabled, error)

### After: advance to `dev`

---

## Audio Creation

### Goal
Create audio assets — music, sound effects, voiceover, ambient audio.

### Outputs
- Audio files in appropriate formats (MP3, WAV, OGG)
- Audio asset manifest with metadata
- Mixing/mastering notes

### Checklist
- [ ] Audio style matches project tone and brand
- [ ] File formats optimized for target platform
- [ ] Volume levels normalized
- [ ] Loop points clean (for background music)
- [ ] Licensing and attribution documented
- [ ] Fallback/mute behavior defined

### After: advance to `dev` or `qa`

---

## Video Creation

### Goal
Create video content — trailers, tutorials, promotional material.

### Outputs
- Video files in target formats
- Storyboard / shot list
- Script / voiceover text

### Checklist
- [ ] Video aligns with marketing/product goals
- [ ] Resolution and format match target platforms
- [ ] Captions/subtitles provided for accessibility
- [ ] Branding consistent (logo, colors, fonts)
- [ ] Call-to-action clear
- [ ] Licensing for all assets documented

### After: advance to `dev` or `qa`

---

## Image Creation

### Goal
Create visual assets — illustrations, icons, textures, concept art.

### Outputs
- Image files in required formats (SVG, PNG, WebP)
- Asset manifest with sizes and variants
- Style guide compliance documentation

### Checklist
- [ ] Visual style consistent with brand/design system
- [ ] Multiple sizes/resolutions provided (1x, 2x, 3x)
- [ ] SVG used for icons and scalable graphics
- [ ] WebP used for photographs/complex images
- [ ] Alt text provided for accessibility
- [ ] Dark mode variants if applicable

### After: advance to `dev` or `qa`

---

## Game Development

### Goal
Implement game mechanics, physics, input handling, and game loop.

### Outputs
- Game engine setup and configuration
- Core gameplay loop implementation
- Input handling system
- Physics and collision detection

### Checklist
- [ ] Game loop runs at consistent frame rate
- [ ] Input handling responsive and configurable
- [ ] Physics system stable and performant
- [ ] Collision detection accurate
- [ ] Asset loading optimized (lazy loading, sprite sheets)
- [ ] Audio integration working
- [ ] Save/load state functional (if applicable)
- [ ] Performance profiled on target hardware

### After: advance to `qa`

---

## Common Creative Guidance

### Multi-Sector Review
All creative outputs must pass multi-sector review before advancing:
- Use `ai_office_review` to generate checklist
- Creative outputs reviewed for: brand alignment, accessibility, technical feasibility, performance impact

### Asset Management
- Store assets in organized directory structure
- Use descriptive filenames (not `image1.png`)
- Document asset sources and licensing
- Maintain version history for major revisions
