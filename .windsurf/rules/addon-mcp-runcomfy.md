---
trigger: model_decision
description: Guidelines for using MCP RunComfy for AI image/video generation
---

# MCP: RunComfy

## When to Use
- **AI Image Generation**: Create images from text prompts (text-to-image)
- **AI Video Generation**: Generate videos from prompts or images (text-to-video, image-to-video)
- **AI Image Editing**: Edit existing images (image-to-image)
- **Content Creation**: Visual assets for UI, marketing, prototypes

## Best Practices

### Pre-Generation
- **Clear and detailed prompts**: Describe subject, style, composition, lighting
- **Appropriate aspect ratio**: 16:9 for landscape video, 9:16 for mobile, 1:1 for social
- **Select correct model**:
  - `flux-2-pro` for high quality images
  - `wan-2.1` or `kling` for videos
  - `flux-2-dev-edit` for image editing

### During Generation
- **Wait for completion**: Generations can take minutes
- **Check status**: Use `check_status` to verify status (in_queue, in_progress, completed)
- **Don't retry immediately**: If connection error, check status before retry

### Post-Generation
- **Download immediately**: Files may be temporary, download immediately
- **Verify quality**: Check result before using in production
- **Organize files**: Use descriptive names and appropriate folders

### Image-to-Image Editing
- Provide publicly accessible `image_url`
- Precisely describe required changes in the prompt
- Specify whether to maintain or change style, composition, elements

### Video Generation
- Specify `duration` in seconds (model-dependent, typically 5-10s)
- For image-to-video, provide starting `image_url`
- Wait for completion before other actions

## Anti-Patterns
- ❌ Don't use local or private URLs for image_url
- ❌ Don't generate in a loop without checking status
- ❌ Don't assume generation is instantaneous
- ❌ Don't download files without verifying generation is completed
