import React from 'react';
// Temporary debug import
import Header from '../components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Star, 
  Briefcase, 
  Calendar,
  Settings,
  Edit3,
  Phone,
  Mail,
  Award,
  TrendingUp
} from 'lucide-react';

const Profile = () => {
  console.log('Profile component loading, Header:', Header);
  // Mock user data
  const user = {
    name: "Ntokozo Skosana",
    age: 19,
    location: "KwaNdebele, Mpumalanga",
    avatar: "/placeholder.svg",
    rating: 4.8,
    completedJobs: 23,
    joinDate: "March 2024",
    phone: "+27 76 356 9282",
    email: "skosanantokozo83@gmail.com",
    bio: "University of the Witwatersrand Computer science sudent who's passionate about software development, data, and fintech innovation.",
    skills: ["Full-stack web application development", "Database Management", "Programming skills", "Graphical application and visualisation", "Software Installation"],
    recentJobs: [
      { id: 1, title: "Laptop Screen Repair", client: "Sarah K.", rating: 5, date: "2 days ago", amount: "R450" },
      { id: 2, title: "WiFi Setup", client: "John D.", rating: 5, date: "1 week ago", amount: "R200" },
      { id: 3, title: "Phone Data Transfer", client: "Mary L.", rating: 4, date: "2 weeks ago", amount: "R150" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-20 pb-24 max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 md:h-32 md:w-32">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl bg-gradient-primary text-white">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4" />
                    {user.location}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-primary">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-semibold">{user.rating}</span>
                    <span className="text-muted-foreground">rating</span>
                  </div>
                  <div className="flex items-center gap-2 text-secondary">
                    <Briefcase className="h-4 w-4" />
                    <span className="font-semibold">{user.completedJobs}</span>
                    <span className="text-muted-foreground">jobs completed</span>
                  </div>
                  <div className="flex items-center gap-2 text-accent">
                    <Calendar className="h-4 w-4" />
                    <span className="text-muted-foreground">Joined {user.joinDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button size="sm">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{user.bio}</p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    Skills & Services
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-gradient-secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Jobs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Recent Jobs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.recentJobs.map((job, index) => (
                  <div key={job.id}>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Client: {job.client} • {job.date}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="font-semibold text-primary">{job.amount}</div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${
                                i < job.rating ? 'fill-primary text-primary' : 'text-muted-foreground'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    {index < user.recentJobs.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.email}</span>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-subtle rounded-lg">
                    <div className="text-2xl font-bold text-primary">{user.rating}</div>
                    <div className="text-xs text-muted-foreground">Average Rating</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-subtle rounded-lg">
                    <div className="text-2xl font-bold text-secondary">{user.completedJobs}</div>
                    <div className="text-xs text-muted-foreground">Jobs Completed</div>
                  </div>
                </div>
                
                <div className="text-center p-4 bg-gradient-accent rounded-lg">
                  <div className="text-2xl font-bold text-accent-foreground">98%</div>
                  <div className="text-xs text-accent-foreground/70">Success Rate</div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full" variant="outline">
                View Public Profile
              </Button>
              <Button className="w-full bg-gradient-primary hover:opacity-90">
                Share Profile
              </Button>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Profile;