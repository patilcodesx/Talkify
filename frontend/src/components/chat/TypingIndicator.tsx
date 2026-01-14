import { cn } from '@/lib/utils';

interface TypingIndicatorProps {
  userName?: string;
  className?: string;
}

export function TypingIndicator({ userName, className }: TypingIndicatorProps) {
  return (
    <div className={cn('flex items-center gap-2 text-sm text-muted-foreground', className)}>
      <div className="flex items-center gap-1 px-3 py-2 bg-muted rounded-full">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
      {userName && <span className="text-xs">{userName} is typing...</span>}
    </div>
  );
}
