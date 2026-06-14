import { prisma } from '@/lib/database/prisma';

/**
 * 查询会话历史记录
 */
import { NextResponse } from 'next/server';

export async function GET(_req: Request, { params }: { params: Promise<{ threadId: string }> }) {
  try {
    const { threadId } = await params;
    const thread = await prisma.thread.findUnique({ where: { id: threadId } });
    if (!thread) return [];
    try {
      // const history = await getHistory(threadId);
      // return history.map((msg: BaseMessage) => msg.toDict() as MessageResponse);
    } catch (e) {
      console.error('fetchThreadHistory error', e);
      return [];
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Get thread history failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
