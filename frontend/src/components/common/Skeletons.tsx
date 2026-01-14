import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ChatSkeletonProps {
  count?: number;
  className?: string;
}

export function ChatListSkeleton({ count = 5, className }: ChatSkeletonProps) {
  return (
    <div className={cn('space-y-2 p-2', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl">
          <Skeleton className="w-12 h-12 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
          <div className="flex flex-col items-end gap-2">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function MessageSkeleton({ count = 5, className }: ChatSkeletonProps) {
  return (
    <div className={cn('space-y-4 p-4', className)}>
      {Array.from({ length: count }).map((_, i) => {
        const isOwn = i % 3 === 0;
        return (
          <div
            key={i}
            className={cn('flex gap-2', isOwn ? 'justify-end' : 'justify-start')}
          >
            {!isOwn && <Skeleton className="w-8 h-8 rounded-full shrink-0" />}
            <div
              className={cn(
                'space-y-2',
                isOwn ? 'items-end' : 'items-start'
              )}
            >
              <Skeleton
                className={cn(
                  'h-16 rounded-2xl',
                  isOwn ? 'w-48 rounded-br-sm' : 'w-64 rounded-bl-sm'
                )}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProfileSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6 p-4', className)}>
      {/* Header */}
      <div className="flex items-center gap-4">
        <Skeleton className="w-20 h-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center space-y-2">
            <Skeleton className="h-8 w-16 mx-auto" />
            <Skeleton className="h-3 w-12 mx-auto" />
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
