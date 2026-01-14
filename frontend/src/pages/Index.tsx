import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, ArrowRight, Shield, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Index() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Real-time messaging with instant delivery',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'End-to-end encryption for all your conversations',
    },
    {
      icon: Users,
      title: 'Groups & Teams',
      description: 'Create groups for friends, family, or work',
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 chat-pattern opacity-50" />

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="h-16 flex items-center justify-between px-4 md:px-8 lg:px-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Talkify</span>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Sign in
            </Button>
            <Button
              onClick={() => navigate('/register')}
              className="gradient-primary shadow-glow hover:opacity-90 transition-opacity"
            >
              Get Started
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-16 pb-24 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent mb-6 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-sm font-medium text-accent-foreground">
                Now with end-to-end encryption
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up"
              style={{ animationDelay: '100ms' }}
            >
              Connect with anyone,{' '}
              <span className="gradient-text">anywhere</span>
            </h1>

            <p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              Experience seamless real-time messaging with a beautiful, modern
              interface designed for productivity and meaningful connections.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              <Button
                size="lg"
                onClick={() => navigate('/register')}
                className="gradient-primary shadow-glow hover:opacity-90 transition-all hover:scale-105 px-8"
              >
                Start Chatting
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/chat')}
              >
                View Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${(index + 4) * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div
              className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 animate-fade-in-up"
              style={{ animationDelay: '700ms' }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: '10M+', label: 'Active Users' },
                  { value: '50B+', label: 'Messages Sent' },
                  { value: '99.9%', label: 'Uptime' },
                  { value: '150+', label: 'Countries' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-3xl md:text-4xl font-bold gradient-text">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-border">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">Talkify</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Talkify. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
