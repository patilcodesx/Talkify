import { Chat } from '@/types/chat';
import { Avatar } from './Avatar';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Check, CheckCheck, Image } from 'lucide-react';

interface ChatListItemProps {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}

export function ChatListItem({ chat, isActive, onClick }: ChatListItemProps) {
  const otherParticipant = chat.participants.find((p) => p.id !== 'current-user');
  const isOwnMessage = chat.lastMessage?.senderId === 'current-user';

  const getTimeAgo = () => {
    if (!chat.lastMessage) return '';
    return formatDistanceToNow(chat.lastMessage.timestamp, { addSuffix: false });
  };

  const getStatusIcon = () => {
    if (!isOwnMessage || !chat.lastMessage) return null;

    switch (chat.lastMessage.status) {
      case 'sent':
        return <Check className="w-3.5 h-3.5 text-muted-foreground" />;
      case 'delivered':
        return <CheckCheck className="w-3.5 h-3.5 text-muted-foreground" />;
      case 'read':
        return <CheckCheck className="w-3.5 h-3.5 text-primary" />;
      default:
        return null;
    }
  };

  const getMessagePreview = () => {
    if (!chat.lastMessage) return 'No messages yet';

    if (chat.isTyping) {
      return <span className="text-primary italic">typing...</span>;
    }

    if (chat.lastMessage.type === 'image') {
      return (
        <span className="flex items-center gap-1">
          <Image className="w-3.5 h-3.5" />
          Photo
        </span>
      );
    }

    return chat.lastMessage.content;
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200',
        'hover:bg-accent/50 active:scale-[0.98]',
        isActive && 'bg-accent'
      )}
    >
      <Avatar
        src={chat.avatar}
        alt={chat.name}
        size="lg"
        status={chat.type === 'direct' ? otherParticipant?.status : undefined}
      />

      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-foreground truncate">
            {chat.name}
          </span>
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {getTimeAgo()}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 mt-0.5">
          <div className="flex items-center gap-1 min-w-0">
            {getStatusIcon()}
            <span className="text-sm text-muted-foreground truncate">
              {getMessagePreview()}
            </span>
          </div>

          {chat.unreadCount > 0 && (
            <span className="flex-shrink-0 min-w-5 h-5 px-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center">
              {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
