import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar } from '@/components/chat/Avatar';
import { currentUser } from '@/data/mockData';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  Camera,
  User,
  Lock,
  Bell,
  Moon,
  Sun,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Settings() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const [name, setName] = useState(currentUser.name);
  const [status, setStatus] = useState('Available');
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveProfile = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast({
      title: 'Profile updated',
      description: 'Your changes have been saved.',
    });
  };

  const handleLogout = () => {
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    navigate('/login');
  };

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', onClick: () => navigate('/profile') },
        { icon: Lock, label: 'Change Password', onClick: () => {} },
        { icon: Shield, label: 'Privacy', onClick: () => {} },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', onClick: () => navigate('/notifications') },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', onClick: () => {} },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-16 border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-10 px-4 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/chat')}
          className="h-9 w-9"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Settings</h1>
      </header>

      <div className="max-w-2xl mx-auto p-4 pb-24 md:p-6 space-y-6">
        {/* Profile Section */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-soft animate-fade-in-up">
          <div className="flex flex-col items-center">
            <div className="relative">
              <Avatar
                src={currentUser.avatar}
                alt={currentUser.name}
                size="xl"
                status={currentUser.status}
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full gradient-primary flex items-center justify-center shadow-medium hover:scale-105 transition-transform">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="mt-4 w-full max-w-sm space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  placeholder="What's on your mind?"
                />
              </div>

              <Button
                onClick={handleSaveProfile}
                disabled={isLoading}
                className="w-full gradient-primary shadow-glow hover:opacity-90 transition-opacity"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div
          className="bg-card rounded-2xl border border-border p-4 shadow-soft animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Moon className="h-5 w-5 text-primary" />
              ) : (
                <Sun className="h-5 w-5 text-primary" />
              )}
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  {theme === 'dark' ? 'Currently enabled' : 'Currently disabled'}
                </p>
              </div>
            </div>
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
          </div>
        </div>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <div
            key={group.title}
            className="bg-card rounded-2xl border border-border overflow-hidden shadow-soft animate-fade-in-up"
            style={{ animationDelay: `${(groupIndex + 2) * 100}ms` }}
          >
            <div className="px-4 py-3 border-b border-border">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {group.title}
              </h2>
            </div>
            <div className="divide-y divide-border">
              {group.items.map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30 animate-fade-in-up"
          style={{ animationDelay: '500ms' }}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>

        {/* App Version */}
        <p className="text-center text-xs text-muted-foreground animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          Talkify v1.0.0
        </p>
      </div>
    </div>
  );
}
