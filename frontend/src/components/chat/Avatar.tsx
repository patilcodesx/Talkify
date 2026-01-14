import { cn } from '@/lib/utils';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const statusSizeClasses = {
  sm: 'w-2.5 h-2.5 border',
  md: 'w-3 h-3 border-2',
  lg: 'w-3.5 h-3.5 border-2',
  xl: 'w-4 h-4 border-2',
};

export  function Avatar({ src, alt, size = 'md', status, className }: AvatarProps) {
  return (
    <div className={cn('relative flex-shrink-0', className)}>
      <img
        src={src}
        alt={alt}
        className={cn(
          sizeClasses[size],
          'rounded-full object-cover ring-2 ring-background'
        )}
      />
      {status && (
        <span
          className={cn(
            statusSizeClasses[size],
            'absolute bottom-0 right-0 rounded-full border-background',
            status === 'online' && 'bg-online',
            status === 'offline' && 'bg-offline',
            status === 'away' && 'bg-away'
          )}
        />
      )}
    </div>
  );
}
