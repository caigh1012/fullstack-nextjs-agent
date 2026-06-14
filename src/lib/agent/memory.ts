import { BaseMessage } from '@langchain/core/messages';
import { PostgresSaver } from '@langchain/langgraph-checkpoint-postgres';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'test') {
  dotenv.config();
}

/**
 * @returns PostgresSaver instance
 */
export function createPostgresMemory(): PostgresSaver {
  const connectionString = `${process.env.DATABASE_URL}`;
  return PostgresSaver.fromConnString(connectionString);
}

/**
 * 获取特定会话的邮件历史记录。
 * @param threadId 会话ID
 * @returns 历史记录
 */
export const getHistory = async (threadId: string): Promise<BaseMessage[]> => {
  const history = await postgresCheckpointer.get({
    configurable: { thread_id: threadId },
  });
  return Array.isArray(history?.channel_values?.messages) ? history.channel_values.messages : [];
};

export const postgresCheckpointer = createPostgresMemory();
