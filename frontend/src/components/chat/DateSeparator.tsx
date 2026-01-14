import { format, isToday, isYesterday } from 'date-fns';

interface DateSeparatorProps {
  date: Date;
}

export function DateSeparator({ date }: DateSeparatorProps) {
  const formatDate = (d: Date) => {
    if (isToday(d)) return 'Today';
    if (isYesterday(d)) return 'Yesterday';
    return format(d, 'MMMM d, yyyy');
  };

  return (
    <div className="flex items-center justify-center my-4">
      <div className="bg-muted/80 backdrop-blur-sm px-3 py-1 rounded-full">
        <span className="text-xs font-medium text-muted-foreground">
          {formatDate(date)}
        </span>
      </div>
    </div>
  );
}
