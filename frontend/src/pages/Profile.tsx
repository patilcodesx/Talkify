import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/chat/Avatar';
import { currentUser } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Loader2,
  Edit3,
  Save,
} from 'lucide-react';
import { format } from 'date-fns';

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: currentUser.name,
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Product designer passionate about creating meaningful digital experiences. Love coffee ☕ and hiking 🏔️',
    joinedDate: new Date('2023-06-15'),
  });

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsEditing(false);
    toast({
      title: 'Profile updated',
      description: 'Your profile has been saved successfully.',
    });
  };

  const stats = [
    { label: 'Messages', value: '2,345' },
    { label: 'Contacts', value: '128' },
    { label: 'Groups', value: '12' },
  ];

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
          <h1 className="text-lg font-semibold">Profile</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          disabled={isLoading}
          className="h-9 w-9"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : isEditing ? (
            <Save className="h-5 w-5" />
          ) : (
            <Edit3 className="h-5 w-5" />
          )}
        </Button>
      </header>

      <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-soft animate-fade-in-up">
          {/* Cover */}
          <div className="h-32 gradient-primary relative">
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Avatar & Basic Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
              <div className="relative">
                <Avatar
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  size="xl"
                  status={currentUser.status}
                  className="ring-4 ring-card"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full gradient-primary flex items-center justify-center shadow-medium hover:scale-105 transition-transform">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
              <div className="flex-1 mt-2 sm:mt-0">
                {isEditing ? (
                  <Input
                    value={profile.name}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, name: e.target.value }))
                    }
                    className="text-xl font-bold mb-1"
                  />
                ) : (
                  <h2 className="text-xl font-bold text-foreground">
                    {profile.name}
                  </h2>
                )}
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-online" />
                  Online
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 p-4 bg-secondary/50 rounded-xl">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div
          className="bg-card rounded-2xl border border-border p-6 shadow-soft animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            About
          </h3>
          {isEditing ? (
            <Textarea
              value={profile.bio}
              onChange={(e) =>
                setProfile((p) => ({ ...p, bio: e.target.value }))
              }
              rows={3}
              className="resize-none"
            />
          ) : (
            <p className="text-foreground">{profile.bio}</p>
          )}
        </div>

        {/* Contact Info */}
        <div
          className="bg-card rounded-2xl border border-border p-6 shadow-soft animate-fade-in-up"
          style={{ animationDelay: '200ms' }}
        >
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Contact Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Email</p>
                {isEditing ? (
                  <Input
                    value={profile.email}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, email: e.target.value }))
                    }
                    className="h-8 mt-1"
                  />
                ) : (
                  <p className="text-foreground">{profile.email}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Phone</p>
                {isEditing ? (
                  <Input
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, phone: e.target.value }))
                    }
                    className="h-8 mt-1"
                  />
                ) : (
                  <p className="text-foreground">{profile.phone}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Location</p>
                {isEditing ? (
                  <Input
                    value={profile.location}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, location: e.target.value }))
                    }
                    className="h-8 mt-1"
                  />
                ) : (
                  <p className="text-foreground">{profile.location}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Joined</p>
                <p className="text-foreground">
                  {format(profile.joinedDate, 'MMMM d, yyyy')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button (visible when editing) */}
        {isEditing && (
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full gradient-primary shadow-glow hover:opacity-90 transition-opacity animate-fade-in-up"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
