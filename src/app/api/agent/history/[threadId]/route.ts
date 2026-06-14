import { fetchThreadHistory } from '@/services/agentService';

/**
 * 查询会话历史记录
 */
import { NextResponse } from 'next/server';

export async function GET(_req: Request, { params }: { params: Promise<{ threadId: string }> }) {
  try {
    const { threadId } = await params;
    const messages = await fetchThreadHistory(threadId);
    return NextResponse.json(messages, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Get thread history failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
