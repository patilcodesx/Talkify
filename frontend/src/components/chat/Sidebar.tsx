import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chat, User } from '@/types/chat';
import { Avatar } from './Avatar';
import { ChatListItem } from './ChatListItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Settings,
  MessageSquarePlus,
  Users,
  MoreVertical,
  Bell,
  User as UserIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface SidebarProps {
  currentUser: User;
  chats: Chat[];
  activeChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  onNavigateToSettings: () => void;
  className?: string;
}

export function Sidebar({
  currentUser,
  chats,
  activeChat,
  onSelectChat,
  onNavigateToSettings,
  className,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={cn(
        'w-full md:w-80 lg:w-96 flex flex-col bg-sidebar border-r border-sidebar-border',
        className
      )}
    >
      {/* Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-sidebar-border">
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <Avatar
            src={currentUser.avatar}
            alt={currentUser.name}
            size="md"
            status={currentUser.status}
          />
          <div className="flex flex-col text-left">
            <span className="font-semibold text-sidebar-foreground">
              {currentUser.name}
            </span>
            <span className="text-xs text-muted-foreground capitalize">
              {currentUser.status}
            </span>
          </div>
        </button>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/notifications')}
            className="h-9 w-9 text-muted-foreground hover:text-sidebar-foreground relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-sidebar-foreground"
          >
            <MessageSquarePlus className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-sidebar-foreground"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <UserIcon className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>New Group</DropdownMenuItem>
              <DropdownMenuItem>Starred Messages</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onNavigateToSettings}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary/30"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <p className="text-muted-foreground text-sm">
              {searchQuery ? 'No chats found' : 'No conversations yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredChats.map((chat, index) => (
              <div
                key={chat.id}
                className="animate-slide-in-left"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ChatListItem
                  chat={chat}
                  isActive={activeChat?.id === chat.id}
                  onClick={() => onSelectChat(chat)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
