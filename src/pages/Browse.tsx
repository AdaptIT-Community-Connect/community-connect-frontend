import React, { useState } from 'react';
import Header from '../components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Filter,
  Heart,
  Star,
  Users,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Browse = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for different types of opportunities
  const opportunities = [
    {
      id: 1,
      title: "Community Garden Helper",
      description: "Help maintain our neighborhood community garden. Great for beginners!",
      category: "volunteer",
      location: "Johannesburg CBD",
      timeCommitment: "2-3 hours/week",
      compensation: null,
      image: "/placeholder.svg",
      organizer: "Green Community JHB",
      rating: 4.8,
      spotsLeft: 5,
      skills: ["Gardening", "Outdoor Work"],
      urgent: false
    },
    {
      id: 2,
      title: "Math Tutoring Session",
      description: "Looking for help with Grade 10 mathematics. Can pay R150/hour.",
      category: "job",
      location: "Sandton",
      timeCommitment: "3 hours/week",
      compensation: "R150/hour",
      image: "/placeholder.svg",
      organizer: "Sarah M.",
      rating: 5.0,
      spotsLeft: 1,
      skills: ["Mathematics", "Teaching"],
      urgent: true
    },
    {
      id: 3,
      title: "Dog Walking Service",
      description: "Need someone reliable to walk my golden retriever daily.",
      category: "job",
      location: "Rosebank",
      timeCommitment: "1 hour/day",
      compensation: "R200/week",
      image: "/placeholder.svg",
      organizer: "Mike Chen",
      rating: 4.9,
      spotsLeft: 1,
      skills: ["Pet Care", "Reliability"],
      urgent: false
    },
    {
      id: 4,
      title: "Youth Mentorship Program",
      description: "Join our mentorship program to guide young people in your community.",
      category: "volunteer",
      location: "Soweto",
      timeCommitment: "4 hours/month",
      compensation: null,
      image: "/placeholder.svg",
      organizer: "Youth Development NPO",
      rating: 4.7,
      spotsLeft: 10,
      skills: ["Communication", "Leadership"],
      urgent: false
    },
    {
      id: 5,
      title: "Event Photography",
      description: "Photographer needed for community birthday celebration this weekend.",
      category: "job",
      location: "Pretoria",
      timeCommitment: "4 hours",
      compensation: "R800",
      image: "/placeholder.svg",
      organizer: "Community Center",
      rating: 4.6,
      spotsLeft: 2,
      skills: ["Photography", "Event Work"],
      urgent: true
    },
    {
      id: 6,
      title: "Food Distribution Helper",
      description: "Help distribute meals to families in need every Saturday morning.",
      category: "volunteer",
      location: "Alexandra Township",
      timeCommitment: "3 hours/week",
      compensation: null,
      image: "/placeholder.svg",
      organizer: "Helping Hands Foundation",
      rating: 4.9,
      spotsLeft: 8,
      skills: ["Community Service", "Physical Work"],
      urgent: false
    }
  ];

  const categories = [
    { value: 'all', label: 'All Opportunities' },
    { value: 'job', label: 'Paid Jobs' },
    { value: 'volunteer', label: 'Volunteer Work' },
  ];

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || opp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const OpportunityCard = ({ opportunity }: { opportunity: any }) => (
    <Card className="hover:shadow-hover transition-all duration-300 cursor-pointer animate-fade-in hover-scale"
          onClick={() => navigate(`/job/${opportunity.id}`)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">{opportunity.title}</CardTitle>
              {opportunity.urgent && (
                <Badge variant="destructive" className="text-xs">Urgent</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-3">{opportunity.description}</p>
          </div>
          <Button variant="ghost" size="sm" className="p-1 h-auto">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{opportunity.timeCommitment}</span>
          </div>
          {opportunity.compensation && (
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span>{opportunity.compensation}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{opportunity.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{opportunity.spotsLeft} spots left</span>
            </div>
          </div>
          
          <div className="flex gap-1">
            {opportunity.skills.slice(0, 2).map((skill: string) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t">
          <p className="text-xs text-muted-foreground">
            By {opportunity.organizer}
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-20 pb-20">
        {/* Search and Filters */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search opportunities..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-muted-foreground">Active Opportunities</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <DollarSign className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-xs text-muted-foreground">Paid Jobs</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Heart className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">67</p>
                <p className="text-xs text-muted-foreground">Volunteer Work</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Calendar className="h-4 w-4 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-xs text-muted-foreground">This Week</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Opportunities Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {selectedCategory === 'all' ? 'All Opportunities' : 
               selectedCategory === 'job' ? 'Paid Jobs' : 'Volunteer Work'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {filteredOpportunities.length} opportunities found
            </p>
          </div>
          
          <div className="grid gap-4">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
          
          {filteredOpportunities.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-4">
                <div className="mx-auto h-24 w-24 bg-muted rounded-full flex items-center justify-center">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">No opportunities found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Browse;