import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, Laptop, BookOpen, AlertTriangle, ArrowRight } from 'lucide-react';

const QuickActionCards = () => {
  const categories = [
    {
      id: 'home',
      title: 'Home Maintenance',
      description: 'Plumbing, electrical, gardening, cleaning, and repairs',
      icon: Home,
      color: 'bg-gradient-to-br from-primary to-primary-glow',
      jobs: 156,
    },
    {
      id: 'tech',
      title: 'Tech Services',
      description: 'Computer repair, phone setup, smart home installation',
      icon: Laptop,
      color: 'bg-gradient-to-br from-accent to-accent-glow',
      jobs: 89,
    },
    {
      id: 'education',
      title: 'Educational Help',
      description: 'Tutoring, homework help, language lessons, skills training',
      icon: BookOpen,
      color: 'bg-gradient-to-br from-secondary to-secondary-glow',
      jobs: 203,
    },
    {
      id: 'urgent',
      title: 'Report Issue',
      description: 'Community problems, safety concerns, infrastructure issues',
      icon: AlertTriangle,
      color: 'bg-gradient-to-br from-destructive to-destructive/80',
      jobs: 34,
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">How can we help you today?</h2>
          <p className="text-muted-foreground">Choose a category to get started</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.id}
                className="border-0 overflow-hidden transform "
              >
                <CardHeader className={`${category.color} text-white p-6 pb-4`}>
                  <div className="flex items-center justify-between">
                    <IconComponent className="h-8 w-8" />
                    <ArrowRight className="h-5 w-5 opacity-0 " />
                  </div>
                  <CardTitle className="text-lg font-semibold mt-4">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-6 pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    {/* <Badge variant="secondary" className="text-xs">
                      {category.priceRange}
                    </Badge> */}
                    <span className="text-xs text-muted-foreground">
                      {category.jobs} active jobs
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickActionCards;