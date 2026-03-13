/**
 * Route Tool Handler
 * 
 * Routes requests to appropriate pipeline stages.
 */

import { z } from 'zod';

const RouteSchema = z.object({
  request: z.string(),
  context: z.string().optional()
});

export async function routeHandler(args: unknown) {
  const { request, context } = RouteSchema.parse(args);
  
  // Simple routing logic
  let stage: string;
  let confidence: number;
  
  const requestLower = request.toLowerCase();
  
  if (requestLower.includes('new project') || requestLower.includes('create project')) {
    stage = 'create_project';
    confidence = 0.9;
  } else if (requestLower.includes('feature') || requestLower.includes('add') || requestLower.includes('implement')) {
    stage = 'prd';
    confidence = 0.8;
  } else if (requestLower.includes('bug') || requestLower.includes('fix') || requestLower.includes('issue')) {
    stage = 'dev';
    confidence = 0.7;
  } else if (requestLower.includes('import') || requestLower.includes('migrate')) {
    stage = 'create_project';
    confidence = 0.8;
  } else {
    stage = 'router';
    confidence = 0.5;
  }
  
  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        stage,
        confidence,
        reasoning: `Request "${request}" routed to ${stage} based on keywords`,
        next_steps: `Use ai_office_scaffold to create artifacts for ${stage}`
      }, null, 2)
    }]
  };
}
