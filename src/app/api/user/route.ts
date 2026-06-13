import { prisma } from '@/lib/database/prisma';
import { NextResponse } from 'next/server';

type PublicUser = {
  id: string;
  username: string;
  nickname: string;
  email: string | null;
  gender: string | null;
  avatarUrl: string | null;
  contactAddress: string | null;
  residenceAddress: string | null;
};

function parsePositiveInt(value: string | null, fallback: number) {
  if (!value) return fallback;
  const n = Number(value);
  if (!Number.isFinite(n) || !Number.isInteger(n) || n <= 0) return fallback;
  return n;
}

function parseBigInt(value: string | null) {
  if (!value) return null;
  if (!/^\d+$/.test(value)) return null;
  try {
    return BigInt(value);
  } catch {
    return null;
  }
}

function toPublicUser(user: {
  id: bigint;
  username: string;
  nickname: string;
  email: string | null;
  gender: unknown;
  avatarUrl: string | null;
  contactAddress: string | null;
  residenceAddress: string | null;
}): PublicUser {
  return {
    id: user.id.toString(),
    username: user.username,
    nickname: user.nickname,
    email: user.email,
    gender: user.gender ? String(user.gender) : null,
    avatarUrl: user.avatarUrl,
    contactAddress: user.contactAddress,
    residenceAddress: user.residenceAddress,
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams;

  const id = parseBigInt(search.get('id'));
  const username = search.get('username');
  const email = search.get('email');
  const nickname = search.get('nickname');

  const takeRaw = parsePositiveInt(search.get('take'), 20);
  const take = Math.min(Math.max(takeRaw, 1), 100);

  const page = parsePositiveInt(search.get('page'), 1);
  const skip = Math.max(0, (page - 1) * take);

  try {
    if (search.get('id') && id === null) {
      return NextResponse.json({ error: 'invalid id' }, { status: 400 });
    }

    if (id !== null) {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          username: true,
          nickname: true,
          email: true,
          gender: true,
          avatarUrl: true,
          contactAddress: true,
          residenceAddress: true,
        },
      });

      return NextResponse.json({ data: user ? toPublicUser(user) : null });
    }

    const where: {
      username?: string;
      email?: string;
      nickname?: { contains: string; mode: 'insensitive' };
    } = {};

    if (username) where.username = username;
    if (email) where.email = email;
    if (nickname) where.nickname = { contains: nickname, mode: 'insensitive' };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take,
        orderBy: { id: 'desc' },
        select: {
          id: true,
          username: true,
          nickname: true,
          email: true,
          gender: true,
          avatarUrl: true,
          contactAddress: true,
          residenceAddress: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({
      data: users.map(toPublicUser),
      pagination: {
        page,
        take,
        total,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
