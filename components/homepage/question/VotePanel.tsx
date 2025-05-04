'use client';

import { useTransition, useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

type VoteTarget = 'question' | 'answer';

interface VotePanelProps {
  type: VoteTarget;
  id: string;
  initialVotes: number;
  userVote: number | null;
  voteAction: (id: string, value: 1 | -1) => Promise<{ success: boolean }>;
}

export default function VotePanel({
  type,
  id,
  initialVotes,
  userVote,
  voteAction,
}: VotePanelProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [currentVote, setCurrentVote] = useState(userVote);
  const [isPending, startTransition] = useTransition();

  const handleVote = (value: 1 | -1) => {
    startTransition(() => {
      voteAction(id, value).then((res) => {
        if (res.success) {
          if (currentVote === value) {
            setCurrentVote(null);
            setVotes((v) => v - value);
          } else {
            setCurrentVote(value);
            setVotes((v) => v + value - (currentVote ?? 0));
          }
        }
      });
    });
  };

  return (
    <div className="flex md:flex-col items-center gap-3 md:gap-2 text-muted-foreground">
      <button
        onClick={() => handleVote(1)}
        className={`hover:text-foreground ${currentVote === 1 ? 'text-foreground' : ''}`}
        disabled={isPending}
      >
        <ArrowUp className="size-5 md:size-6" />
      </button>
      <span className="font-medium md:text-lg py-1">{votes}</span>
      <button
        onClick={() => handleVote(-1)}
        className={`hover:text-foreground ${currentVote === -1 ? 'text-foreground' : ''}`}
        disabled={isPending}
      >
        <ArrowDown className="size-5 md:size-6" />
      </button>
    </div>
  );
}