import { MessageCircle } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 animate-fade-in-up">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <LoadingSpinner size="lg" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
