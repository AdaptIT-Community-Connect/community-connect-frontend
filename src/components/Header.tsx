import { Button } from '@/components/ui/button';
import { UserCircle, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
              <span className="text-lg font-bold text-primary-foreground">Y</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Youth Aid Hub</h1>
              <p className="text-xs text-muted-foreground">Community • Skills • Growth</p>
            </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#services" className="text-foreground/80 hover:text-foreground transition-colors">
            Services
          </a>
          <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">
            About
          </a>
          <a href="#contact" className="text-foreground/80 hover:text-foreground transition-colors">
            Contact
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            <UserCircle className="mr-2 h-4 w-4" />
            Sign In
          </Button>
          <Button variant="default" size="sm">
            Sign Up
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;