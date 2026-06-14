import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { ChatDeepSeek } from '@langchain/deepseek';

export interface CreateChatModelOptions {
  provider?: string; // 'openai' | 'google' | 'anthropic'
  model: string;
  temperature?: number;
}

export function createChatModel({ provider = 'google', model, temperature = 1 }: CreateChatModelOptions): BaseChatModel {
  switch (provider) {
    case 'openai':
    // return new ChatOpenAI({ model, temperature });
    case 'anthropic':
    // return new ChatAnthropic({ model, temperature });
    case 'google':
    default:
      return new ChatDeepSeek({ model, temperature });
  }
}

export const DEFAULT_MODEL_PROVIDER = 'google';
export const DEFAULT_MODEL_NAME = 'gemini-3-flash-preview';
