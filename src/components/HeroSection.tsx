import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 via-background to-secondary-light/20" />
      <div className="absolute top-10 right-10 h-32 w-32 rounded-full bg-gradient-primary opacity-10 animate-float" />
      <div className="absolute bottom-20 left-10 h-24 w-24 rounded-full bg-gradient-secondary opacity-10 animate-float" style={{ animationDelay: '1s' }} />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <Badge variant="glow" className="mb-6 animate-pulse-glow">
            <Sparkles className="mr-1 h-3 w-3" />
            Building Stronger Communities Together
          </Badge>

          {/* Main Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Get your{' '}
            <span className="text-gradient">community problems</span>{' '}
            solved by{' '}
            <span className="text-gradient">skilled youth</span>
          </h1>

          {/* Subheading */}
          <p className="mb-8 text-lg text-muted-foreground md:text-xl lg:text-2xl max-w-3xl mx-auto">
            Connect with talented young people in your neighborhood who can help with home maintenance, 
            tech support, tutoring, and more. Empowering youth while solving community challenges.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button variant="hero" size="lg" className="group">
              Find Local Help
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg">
              Offer Your Skills
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            <Card className="border-0 bg-transparent">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">2,500+</div>
                <div className="text-sm text-muted-foreground">Jobs Completed</div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-transparent">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-secondary">850+</div>
                <div className="text-sm text-muted-foreground">Active Youth</div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-transparent">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-accent">4.9/5</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-transparent">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Communities</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;