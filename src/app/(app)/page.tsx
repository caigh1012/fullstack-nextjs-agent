'use client';

import Thread from '@/components/Thread';
import { useThreads } from '@/hooks/useThreads';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const t = useTranslations('HomePage');
  const { threads, createThread } = useThreads();
  const router = useRouter();
  const [rootThreadId, setRootThreadId] = useState<string | null>(null);

  useEffect(() => {
    if (threads.length > 0 && !rootThreadId) {
      setRootThreadId(threads[0].id);
    }
  }, [threads, rootThreadId]);

  useEffect(() => {
    if (!rootThreadId) {
      (async () => {
        const t = await createThread();
        setRootThreadId(t.id);
      })();
    }
  }, [rootThreadId, createThread]);

  return (
    <div className="relative">
      {rootThreadId && (
        <Thread
          threadId={rootThreadId}
          onFirstMessageSent={(id) => router.replace(`/thread/${id}`)}
        />
      )}
      4545
    </div>
  );
}
