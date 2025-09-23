import { Request, Response, NextFunction } from 'express';
import { aiService } from '../services/ai-service';

export class AIController {
  
  static async chat(req: Request, res: Response, next: NextFunction) {
    try {
      const { message } = req.body;  // Only extract message

      if (!message) {
        return res.status(400).json({
          success: false,
          error: 'Message is required'
        });
      }

      // Simple format - just context + user message (no conversation history)
      const messages: any[] = [
        { 
          role: "context", 
          content: "You are a helpful AI assistant for a rural healthcare platform. You can help with general health questions, provide health information, write code, answer technical questions, or assist with any other queries. Always recommend consulting healthcare professionals for serious medical concerns." 
        },
        { role: "user", content: message }
      ];

      const response = await aiService.generateResponse(messages);

      res.json({
        success: true,
        data: {
          response: response,
          timestamp: new Date().toISOString(),
          model: "nvidia/llama3-chatqa-1.5-70b"
        }
      });

    } catch (error) {
      next(error);
    }
  }
}
