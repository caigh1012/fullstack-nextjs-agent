import { Thread } from '@/types/message';

export interface ChatServiceConfig {
  baseUrl?: string;
  endpoints?: {
    history?: string;
    chat?: string;
    stream?: string;
    threads?: string;
  };
  headers?: Record<string, string>;
}

const config: ChatServiceConfig = {
  baseUrl: '/api/agent',
  endpoints: {
    history: '/history',
    chat: '/chat',
    stream: '/stream',
    threads: '/threads',
  },
};

function getUrl(endpoint: keyof Required<ChatServiceConfig>['endpoints']): string {
  return `${config.baseUrl}${config.endpoints?.[endpoint] || ''}`;
}

/**
 * 请求会话列表
 */
export async function fetchThreads(): Promise<Thread[]> {
  const response = await fetch(getUrl('threads'), {
    headers: config.headers,
  });
  if (!response.ok) {
    throw new Error('Failed to load threads');
  }
  return await response.json();
}

/**
 * 创建新会话
 */
export async function createNewThread(): Promise<Thread> {
  const response = await fetch(getUrl('threads'), {
    method: 'POST',
    headers: config.headers,
  });
  if (!response.ok) {
    throw new Error('Failed to create thread');
  }
  return await response.json();
}

/**
 * 删除会话
 */
export async function deleteThread(threadId: string): Promise<void> {
  const response = await fetch(getUrl('threads'), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
    body: JSON.stringify({ id: threadId }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to delete thread');
  }
}
