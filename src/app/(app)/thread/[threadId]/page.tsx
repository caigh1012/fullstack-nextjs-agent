'use client';
import Thread from '@/components/Thread';
import { useParams } from 'next/navigation';

export default function ThreadPage() {
  const params = useParams();
  const threadId = params.threadId as string;
  return <Thread threadId={threadId} />;
}
