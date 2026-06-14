import { prisma } from '@/lib/database/prisma';
import { Thread } from '@/types/message';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Thread 实体类
 */
type ThreadEntity = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * 获取数据库中的 threads 表数据
 */
export async function GET() {
  try {
    const dbThreads = await prisma.thread.findMany({ orderBy: { updatedAt: 'desc' }, take: 50 });
    const threads: Thread[] = dbThreads.map((t: ThreadEntity) => ({
      id: t.id,
      title: t.title,
      createdAt: t.createdAt.toISOString(),
      updatedAt: t.updatedAt.toISOString(),
    }));
    return NextResponse.json(threads, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Get threads failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * 新增 threads 数据
 */
export async function POST() {
  try {
    const created = await prisma.thread.create({ data: { title: 'New thread' } });
    const thread: Thread = {
      id: created.id,
      title: created.title,
      createdAt: created.createdAt.toISOString(),
      updatedAt: created.updatedAt.toISOString(),
    };
    return NextResponse.json(thread, { status: 201 });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Add thread failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * 更新 threads 数据
 */
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title } = body || {};
    if (!id || typeof title !== 'string') {
      return NextResponse.json({ error: 'id and title required' }, { status: 400 });
    }
    const updated = await prisma.thread.update({ where: { id }, data: { title } });
    return NextResponse.json(
      {
        id: updated.id,
        title: updated.title,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      },
      { status: 200 },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Update failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * 删除 threads 数据
 */
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body || {};
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Thread id required' }, { status: 400 });
    }

    // 首先检查 threads 的 id 是否存在
    const thread = await prisma.thread.findUnique({ where: { id } });
    if (!thread) {
      return NextResponse.json({ error: 'Thread not found' }, { status: 404 });
    }

    // Delete the thread from Prisma (metadata)
    await prisma.thread.delete({ where: { id } });

    return NextResponse.json({ message: 'Delete success' }, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Delete failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
