import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background chat-pattern p-4">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 text-center max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center shadow-glow mx-auto mb-8">
          <MessageCircle className="w-10 h-10 text-white" />
        </div>

        {/* 404 Text */}
        <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Page Not Found
        </h2>

        <p className="text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={() => navigate('/')}
            className="gradient-primary shadow-glow hover:opacity-90 transition-all hover:scale-105 w-full sm:w-auto"
          >
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Suggestions */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Here are some helpful links:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/chat')}
              className="text-primary"
            >
              Chat
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/settings')}
              className="text-primary"
            >
              Settings
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/login')}
              className="text-primary"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
