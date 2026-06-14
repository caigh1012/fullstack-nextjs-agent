/**
 * 对于 agent 进行代理调用
 */
import { getHistory } from '@/lib/agent/memory';
import prisma from '@/lib/database/prisma';
import type { MessageResponse } from '@/types/message';
import { BaseMessage } from '@langchain/core/messages';

export async function fetchThreadHistory(threadId: string): Promise<MessageResponse[]> {
  const thread = await prisma.thread.findUnique({ where: { id: threadId } });
  if (!thread) return [];
  try {
    const history = await getHistory(threadId);
    return history.map((msg: BaseMessage) => msg.toDict() as MessageResponse);
  } catch (e) {
    console.error('fetchThreadHistory error', e);
    return [];
  }
}
