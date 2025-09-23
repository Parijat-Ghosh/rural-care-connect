import { Router } from 'express';
import { AIController } from '../controllers/ai-controller';
import { validateBody } from '../middlewares/validate-middleware';
import { z } from 'zod';

const aiRouter = Router();

// Simplified schema - only message required
const chatSchema = z.object({
  message: z.string()
    .min(1, 'Message is required')
    .max(2000, 'Message must not exceed 2000 characters')
  // Removed conversation_history completely
});

aiRouter.post('/chat', 
  validateBody(chatSchema),
  AIController.chat
);

export default aiRouter;
