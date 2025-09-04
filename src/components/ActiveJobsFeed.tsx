import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { MapPin, Clock, Star, Heart } from 'lucide-react';

const ActiveJobsFeed = () => {
  const navigate = useNavigate();
  const jobs = [
    {
      id: 1,
      title: 'Fix leaking kitchen tap',
      description: 'Need someone to repair a dripping tap in my kitchen. Has been leaking for 2 days.',
      category: 'Home Maintenance',
      price: 'R120',
      distance: '0.8km',
      urgency: 'urgent',
      timePosted: '2 hours ago',
      poster: {
        name: 'Sarah M.',
        rating: 4.8,
        avatar: '/placeholder-avatar-1.jpg'
      },
      image: '/placeholder-leak.jpg'
    },
    {
      id: 2,
      title: 'Help with math homework',
      description: 'Grade 10 student needs help with trigonometry assignments. Regular tutoring opportunity.',
      category: 'Educational Help',
      price: 'R80/hour',
      distance: '1.2km',
      urgency: 'flexible',
      timePosted: '4 hours ago',
      poster: {
        name: 'David K.',
        rating: 4.9,
        avatar: '/placeholder-avatar-2.jpg'
      },
      image: '/placeholder-math.jpg'
    },
    {
      id: 3,
      title: 'Setup new smartphone',
      description: 'Elderly person needs help setting up contacts, apps, and basic phone functions.',
      category: 'Tech Services',
      price: 'R150',
      distance: '0.5km',
      urgency: 'this-week',
      timePosted: '6 hours ago',
      poster: {
        name: 'Margaret L.',
        rating: 5.0,
        avatar: '/placeholder-avatar-3.jpg'
      },
      image: '/placeholder-phone.jpg'
    },
    {
      id: 4,
      title: 'Garden cleanup and weeding',
      description: 'Small garden needs weeding and general cleanup. Perfect for someone who enjoys outdoor work.',
      category: 'Home Maintenance',
      price: 'R200',
      distance: '2.1km',
      urgency: 'flexible',
      timePosted: '1 day ago',
      poster: {
        name: 'John P.',
        rating: 4.6,
        avatar: '/placeholder-avatar-4.jpg'
      },
      image: '/placeholder-garden.jpg'
    }
  ];

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return <Badge variant="destructive" className="text-xs">Urgent</Badge>;
      case 'this-week':
        return <Badge variant="secondary" className="text-xs">This Week</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Flexible</Badge>;
    }
  };

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Jobs Near You</h2>
          <p className="text-muted-foreground">Fresh opportunities in your area</p>
        </div>

        <div className="space-y-6">
          {jobs.map((job) => (
            <Card 
              key={job.id} 
              className="overflow-hidden hover:shadow-hover transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/job/${job.id}`)}
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Job Image */}
                  <div className="w-full md:w-48 h-48 md:h-auto bg-gradient-to-br from-primary-light to-secondary-light flex items-center justify-center">
                    <div className="text-6xl opacity-20">📸</div>
                  </div>

                  {/* Job Details */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                          {getUrgencyBadge(job.urgency)}
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{job.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.distance} away</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{job.timePosted}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {job.category}
                          </Badge>
                        </div>
                      </div>

                      <Button variant="ghost" size="icon" className="flex-shrink-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary-foreground">
                            {job.poster.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">{job.poster.name}</div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Star className="h-3 w-3 fill-secondary text-secondary" />
                            <span>{job.poster.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">{job.price}</div>
                        </div>
                        <Button 
                          variant="action" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/job/${job.id}`);
                          }}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            View All Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ActiveJobsFeed;