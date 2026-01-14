import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import {
  ArrowLeft,
  Bell,
  MessageCircle,
  Users,
  Heart,
  UserPlus,
  Settings,
  Check,
  Trash2,
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'message' | 'group' | 'like' | 'follow';
  title: string;
  description: string;
  avatar: string;
  timestamp: Date;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'Sarah Chen',
    description: 'sent you a new message',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    timestamp: new Date(Date.now() - 300000),
    read: false,
  },
  {
    id: '2',
    type: 'group',
    title: 'Project Alpha Team',
    description: 'Marcus mentioned you in a message',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
    timestamp: new Date(Date.now() - 3600000),
    read: false,
  },
  {
    id: '3',
    type: 'follow',
    title: 'Emily Rodriguez',
    description: 'started following you',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    timestamp: new Date(Date.now() - 7200000),
    read: true,
  },
  {
    id: '4',
    type: 'like',
    title: 'James Park',
    description: 'liked your profile photo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    timestamp: new Date(Date.now() - 86400000),
    read: true,
  },
  {
    id: '5',
    type: 'group',
    title: 'Weekend Hangout',
    description: 'Lisa shared a photo',
    avatar: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=100&h=100&fit=crop',
    timestamp: new Date(Date.now() - 172800000),
    read: true,
  },
];

const notificationSettings = [
  { id: 'messages', label: 'New messages', enabled: true },
  { id: 'groups', label: 'Group activity', enabled: true },
  { id: 'mentions', label: 'Mentions', enabled: true },
  { id: 'followers', label: 'New followers', enabled: false },
];

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(notificationSettings);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return MessageCircle;
      case 'group':
        return Users;
      case 'like':
        return Heart;
      case 'follow':
        return UserPlus;
      default:
        return Bell;
    }
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-16 border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-10 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/chat')}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-xs text-muted-foreground">
                {unreadCount} unread
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-primary"
            >
              <Check className="h-4 w-4 mr-1" />
              Mark all read
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
            className="h-9 w-9"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-4">
        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-card rounded-2xl border border-border p-4 shadow-soft animate-fade-in-up">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Notification Settings
            </h3>
            <div className="space-y-4">
              {settings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between"
                >
                  <span className="text-foreground">{setting.label}</span>
                  <Switch
                    checked={setting.enabled}
                    onCheckedChange={(checked) =>
                      setSettings((prev) =>
                        prev.map((s) =>
                          s.id === setting.id ? { ...s, enabled: checked } : s
                        )
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-12 text-center animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No notifications
            </h3>
            <p className="text-muted-foreground">
              You're all caught up! Check back later.
            </p>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-soft">
            {notifications.map((notification, index) => {
              const Icon = getIcon(notification.type);
              return (
                <div
                  key={notification.id}
                  className={cn(
                    'flex items-start gap-3 p-4 hover:bg-accent/30 transition-colors animate-fade-in-up',
                    index !== notifications.length - 1 && 'border-b border-border',
                    !notification.read && 'bg-accent/20'
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative">
                    <img
                      src={notification.avatar}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-card border-2 border-card flex items-center justify-center">
                      <Icon className="h-3 w-3 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground">
                      <span className="font-semibold">{notification.title}</span>{' '}
                      <span className="text-muted-foreground">
                        {notification.description}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(notification.timestamp, {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteNotification(notification.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
