import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const validate = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubmitted(true);

    toast({
      title: 'Reset link sent!',
      description: 'Check your email for password reset instructions.',
    });
  };

  if (isSubmitted) {
    return (
      <AuthLayout>
        <div className="animate-fade-in-up text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Check your email</h2>
          <p className="text-muted-foreground mb-6">
            We've sent a password reset link to<br />
            <span className="font-medium text-foreground">{email}</span>
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Didn't receive the email? Check your spam folder or
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setIsSubmitted(false);
              setEmail('');
            }}
            className="mb-4"
          >
            Try another email
          </Button>
          <p className="text-sm text-muted-foreground">
            <Link to="/login" className="text-primary hover:underline">
              ← Back to login
            </Link>
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="animate-fade-in-up">
        <Link
          to="/login"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Forgot password?</h2>
          <p className="text-muted-foreground mt-2">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  'pl-10',
                  error && 'border-destructive focus-visible:ring-destructive'
                )}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full gradient-primary shadow-glow hover:opacity-90 transition-opacity"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              'Reset password'
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Remember your password?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
