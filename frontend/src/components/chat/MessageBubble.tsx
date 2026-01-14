import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';
import { Check, CheckCheck } from 'lucide-react';
import { format } from 'date-fns';
import { ImagePreviewModal } from '@/components/common/ImagePreviewModal';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
  senderAvatar?: string;
  senderName?: string;
}

export function MessageBubble({
  message,
  isOwn,
  showAvatar,
  senderAvatar,
  senderName,
}: MessageBubbleProps) {
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const formatTime = (date: Date) => format(date, 'h:mm a');

  const renderStatus = () => {
    if (!isOwn) return null;

    switch (message.status) {
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

  return (
    <>
      <div
        className={cn(
          'flex gap-2 animate-message-in',
          isOwn ? 'justify-end' : 'justify-start'
        )}
      >
        {!isOwn && showAvatar && senderAvatar && (
          <img
            src={senderAvatar}
            alt={senderName || 'User'}
            className="w-8 h-8 rounded-full object-cover self-end"
          />
        )}
        {!isOwn && showAvatar && !senderAvatar && (
          <div className="w-8 h-8" />
        )}

        <div
          className={cn(
            'max-w-[70%] flex flex-col',
            isOwn ? 'items-end' : 'items-start'
          )}
        >
          {!isOwn && senderName && showAvatar && (
            <span className="text-xs text-muted-foreground mb-1 ml-1">
              {senderName}
            </span>
          )}

          <div
            className={cn(
              'px-4 py-2.5 shadow-soft',
              isOwn ? 'message-bubble-sent' : 'message-bubble-received'
            )}
          >
            {message.type === 'image' && message.mediaUrl && (
              <img
                src={message.mediaUrl}
                alt="Shared image"
                className="rounded-lg mb-2 max-w-full cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setImagePreviewOpen(true)}
              />
            )}

            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>

            <div
              className={cn(
                'flex items-center gap-1.5 mt-1',
                isOwn ? 'justify-end' : 'justify-start'
              )}
            >
              <span className="text-[10px] text-muted-foreground">
                {formatTime(message.timestamp)}
              </span>
              {renderStatus()}
            </div>
          </div>
        </div>
      </div>

      {message.type === 'image' && message.mediaUrl && (
        <ImagePreviewModal
          src={message.mediaUrl}
          isOpen={imagePreviewOpen}
          onClose={() => setImagePreviewOpen(false)}
        />
      )}
    </>
  );
}
