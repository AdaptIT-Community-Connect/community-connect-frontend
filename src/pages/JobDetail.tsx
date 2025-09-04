import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, Clock, Star, MessageCircle, ArrowLeft, Camera, User } from 'lucide-react';

// Mock job data - in real app this would come from API
const mockJob = {
  id: '1',
  title: 'Fix leaky kitchen tap',
  description: 'My kitchen tap has been leaking for a week now. The drip is constant and I think it might need a new washer or valve. The tap is a standard mixer tap in a modern kitchen.',
  budget: 250,
  location: 'Sandton, Johannesburg',
  urgency: 'This week',
  timePosted: '2 hours ago',
  category: 'Home Maintenance',
  photos: ['/placeholder.svg', '/placeholder.svg'],
  poster: {
    name: 'Sarah Mthembu',
    avatar: '/placeholder.svg',
    rating: 4.8,
    jobsPosted: 12,
    memberSince: 'June 2023'
  },
  estimatedTime: '2-4 hours',
  applicants: 3
};

const similarJobs = [
  { id: '2', title: 'Bathroom sink repair', budget: 180, distance: '0.8km' },
  { id: '3', title: 'Kitchen cabinet fix', budget: 320, distance: '1.2km' },
  { id: '4', title: 'Toilet installation', budget: 450, distance: '2.1km' }
];

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState('');

  const handleApply = () => {
    console.log('Applying with message:', applicationMessage);
    setShowApplyDialog(false);
    // Handle application submission
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to jobs
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Job Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{mockJob.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {mockJob.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {mockJob.timePosted}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">R{mockJob.budget}</div>
                    <Badge variant="secondary">{mockJob.urgency}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{mockJob.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Category:</span> {mockJob.category}
                    </div>
                    <div>
                      <span className="font-medium">Estimated time:</span> {mockJob.estimatedTime}
                    </div>
                    <div>
                      <span className="font-medium">Applicants:</span> {mockJob.applicants}
                    </div>
                    <div>
                      <span className="font-medium">Job ID:</span> #{mockJob.id}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Photos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="h-5 w-5 mr-2" />
                  Photos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {mockJob.photos.map((photo, index) => (
                    <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={photo} 
                        alt={`Job photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p>Interactive map would go here</p>
                    <p className="text-sm">{mockJob.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Poster Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Posted by
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Avatar className="w-16 h-16 mx-auto mb-3">
                  <AvatarImage src={mockJob.poster.avatar} />
                  <AvatarFallback>{mockJob.poster.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{mockJob.poster.name}</h3>
                <div className="flex items-center justify-center mt-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-sm">{mockJob.poster.rating} ({mockJob.poster.jobsPosted} jobs)</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Member since {mockJob.poster.memberSince}
                </p>
                <Button variant="outline" className="w-full mt-3">
                  View Profile
                </Button>
              </CardContent>
            </Card>

            {/* Apply Section */}
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
                  <DialogTrigger asChild>
                    <Button variant="action" className="w-full mb-3">
                      Apply for this Job
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Apply for Job</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="message">Tell them why you're perfect for this job</Label>
                        <Textarea
                          id="message"
                          placeholder="Hi! I'm interested in helping you with your tap repair. I have experience with plumbing repairs and can fix this quickly and professionally..."
                          className="min-h-[120px]"
                          value={applicationMessage}
                          onChange={(e) => setApplicationMessage(e.target.value)}
                        />
                      </div>
                      <div className="flex space-x-3">
                        <Button variant="outline" onClick={() => setShowApplyDialog(false)} className="flex-1">
                          Cancel
                        </Button>
                        <Button onClick={handleApply} className="flex-1">
                          Send Application
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message Poster
                </Button>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Jobs Nearby</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {similarJobs.map((job) => (
                  <div key={job.id} className="p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                    <h4 className="font-medium text-sm">{job.title}</h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground">{job.distance}</span>
                      <span className="text-sm font-semibold text-primary">R{job.budget}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDetail;