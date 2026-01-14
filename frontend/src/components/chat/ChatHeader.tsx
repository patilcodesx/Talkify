import { Chat, User } from '@/types/chat';
import { Avatar } from './Avatar';
import { Button } from '@/components/ui/button';
import { Phone, Video, MoreVertical, ArrowLeft, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ChatHeaderProps {
  chat: Chat;
  onBack?: () => void;
  showBackButton?: boolean;
}

export function ChatHeader({ chat, onBack, showBackButton }: ChatHeaderProps) {
  const otherParticipant = chat.participants.find((p) => p.id !== 'current-user');

  const getStatusText = () => {
    if (chat.isTyping) {
      return <span className="text-primary">typing...</span>;
    }

    if (chat.type === 'group') {
      return `${chat.participants.length} members`;
    }

    if (otherParticipant?.status === 'online') {
      return <span className="text-online">Online</span>;
    }

    if (otherParticipant?.lastSeen) {
      return `Last seen ${formatDistanceToNow(otherParticipant.lastSeen, { addSuffix: true })}`;
    }

    return 'Offline';
  };

  return (
    <div className="h-16 border-b border-border bg-card/95 backdrop-blur-sm px-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="md:hidden h-9 w-9 -ml-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}

        <Avatar
          src={chat.avatar}
          alt={chat.name}
          size="md"
          status={chat.type === 'direct' ? otherParticipant?.status : undefined}
        />

        <div className="flex flex-col">
          <h2 className="font-semibold text-foreground leading-tight">
            {chat.name}
          </h2>
          <span className="text-xs text-muted-foreground">
            {getStatusText()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground hover:text-foreground"
        >
          <Video className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground hover:text-foreground"
        >
          <Phone className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {chat.type === 'group' && (
              <DropdownMenuItem>
                <Users className="h-4 w-4 mr-2" />
                View Members
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Search Messages</DropdownMenuItem>
            <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete Chat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
