import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Home, Laptop, BookOpen, AlertTriangle, Camera, MapPin, ArrowLeft, ArrowRight } from 'lucide-react';

const categories = [
  { id: 'home', name: 'Home Maintenance', icon: Home, price: 'R150-500', color: 'bg-gradient-primary' },
  { id: 'tech', name: 'Tech Services', icon: Laptop, price: 'R100-300', color: 'bg-gradient-secondary' },
  { id: 'education', name: 'Educational Help', icon: BookOpen, price: 'R80-200', color: 'bg-gradient-accent' },
  { id: 'emergency', name: 'Community Issues', icon: AlertTriangle, price: 'R200-800', color: 'bg-gradient-hero' },
];

const PostJob = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    urgency: 'flexible',
    budget: [250],
    location: '',
    photos: [] as File[],
  });

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setStep(2);
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // Handle job submission
    console.log('Submitting job:', { category: selectedCategory, ...jobData });
    navigate('/');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">What do you need help with?</h2>
        <p className="text-muted-foreground">Choose a category that best describes your problem</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card 
              key={category.id}
              className="cursor-pointer hover:scale-105 transition-all duration-300 group"
              onClick={() => handleCategorySelect(category.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300`}>
                  <Icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <Badge variant="secondary">{category.price}</Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Tell us about your job</h2>
        <p className="text-muted-foreground">Provide details to help youth understand what you need</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            placeholder="e.g., Fix leaky kitchen tap"
            value={jobData.title}
            onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the problem in detail..."
            className="min-h-[100px]"
            value={jobData.description}
            onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
          />
        </div>

        <div>
          <Label>Upload Photos</Label>
          <div className="border-2 border-dashed border-input rounded-lg p-6 text-center">
            <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Click to upload photos of the problem</p>
          </div>
        </div>

        <div>
          <Label>Urgency Level</Label>
          <RadioGroup value={jobData.urgency} onValueChange={(value) => setJobData({ ...jobData, urgency: value })}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="urgent" id="urgent" />
              <Label htmlFor="urgent">Urgent (within 24 hours)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="week" id="week" />
              <Label htmlFor="week">This week</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="flexible" id="flexible" />
              <Label htmlFor="flexible">Flexible timing</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Budget Range: R{jobData.budget[0]}</Label>
          <Slider
            value={jobData.budget}
            onValueChange={(value) => setJobData({ ...jobData, budget: value })}
            max={1000}
            min={50}
            step={25}
            className="mt-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>R50</span>
            <span>R1000+</span>
          </div>
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="location"
              placeholder="Enter your address or area"
              className="pl-10"
              value={jobData.location}
              onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleNext} className="flex-1" disabled={!jobData.title || !jobData.description}>
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Review your job post</h2>
        <p className="text-muted-foreground">Make sure everything looks good before posting</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {jobData.title}
            <Badge variant="secondary">R{jobData.budget[0]}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{jobData.description}</p>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {jobData.location || 'Location not specified'}
            </div>
            <Badge variant="outline">
              {jobData.urgency === 'urgent' ? 'Urgent' : 
               jobData.urgency === 'week' ? 'This week' : 'Flexible'}
            </Badge>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Estimated completion: 1-3 days</p>
            <p>Category: {categories.find(c => c.id === selectedCategory)?.name}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-3">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button variant="action" onClick={handleSubmit} className="flex-1">
          Post Job
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </main>
    </div>
  );
};

export default PostJob;