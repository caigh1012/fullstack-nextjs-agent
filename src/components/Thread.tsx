interface ThreadProps {
  threadId: string;
  onFirstMessageSent?: (threadId: string) => void;
}

export default function Thread({ threadId, onFirstMessageSent }: ThreadProps) {
  return (
    <div>
      <h1>Thread Page</h1>
      <div>{threadId}</div>
    </div>
  );
}
