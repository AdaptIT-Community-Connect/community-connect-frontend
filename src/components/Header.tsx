import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bell, User, Menu } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
              <span className="text-lg font-bold text-primary-foreground">Y</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Youth Aid Hub</h1>
              <p className="text-xs text-muted-foreground">Community • Skills • Growth</p>
            </div>
          </div>

          {/* Auth Actions or User Menu */}
          <div className="flex items-center space-x-3">
            {window.location.pathname === '/' ? (
              <>
                {/* Landing Page - Auth Buttons */}
                <Button variant="default" onClick={() => navigate('/login')}>
                  Create Account
                </Button>
              </>
            ) : (
              <>
                {/* App Pages - User Menu */}
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <MapPin className="h-4 w-4" />
                  <span>Cape Town</span>
                </Button>

                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => navigate('/notifications')}
                  >
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Badge 
                    variant="destructive" 
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    3
                  </Badge>
                </div>

                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => navigate('/profile')}
                >
                  <User className="h-4 w-4" />
                </Button>

                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;