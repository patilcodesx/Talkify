import { ReactNode } from 'react';
import { MessageCircle } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Talkify</h1>
          </div>

          <h2 className="text-3xl xl:text-4xl font-semibold text-white leading-tight mb-4">
            Connect with friends and colleagues instantly
          </h2>

          <p className="text-white/80 text-lg max-w-md">
            Experience seamless real-time messaging with a beautiful, 
            modern interface designed for productivity and connection.
          </p>

          <div className="mt-12 flex gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">10M+</p>
              <p className="text-white/70 text-sm">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">99.9%</p>
              <p className="text-white/70 text-sm">Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">256-bit</p>
              <p className="text-white/70 text-sm">Encryption</p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/10" />
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute top-1/3 -left-10 w-60 h-60 rounded-full bg-white/5" />
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">Talkify</h1>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
