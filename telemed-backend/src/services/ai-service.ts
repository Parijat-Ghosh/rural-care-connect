import OpenAI from 'openai';

class AIService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.NVIDIA_API_KEY!,
      baseURL: 'https://integrate.api.nvidia.com/v1',
    });
  }

  async generateResponse(messages: any[]): Promise<string> {  // ✅ Changed type to any[]
    try {
      const completion = await this.client.chat.completions.create({
        model: "nvidia/llama3-chatqa-1.5-70b",
        messages: messages,
        temperature: 0.2,
        top_p: 0.7,
        max_tokens: 1024,
        stream: false,
      });

      return completion.choices[0]?.message?.content || 'No response generated';
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }
}

export const aiService = new AIService();
