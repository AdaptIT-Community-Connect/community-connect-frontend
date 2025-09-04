import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, User, Award } from 'lucide-react';

interface FormData {
  name: string;
  phone?: string;
  age?: string;
  location: string;
  bio?: string;
  skills: string;
}

interface ProfileCompletionProps {
  onComplete: () => void;
}

const ProfileCompletion: React.FC<ProfileCompletionProps> = ({ onComplete }) => {
  const [user] = useAuthState(auth);
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!user) return;
    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          uid: user.uid,
          email: user.email,
          name: data.name || user.displayName,
          phone: data.phone || '',
          location: data.location,
          bio: data.bio || '',
          skills: data.skills.split(',').map(s => s.trim()).filter(Boolean),
          age: data.age ? parseInt(data.age) : null,
          rating: 0,
          completedJobs: 0,
          joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          profileCompleted: true,
          lastUpdated: new Date(),
        },
        { merge: true }
      );

      onComplete();
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const steps = [
    {
      title: 'Basic Information',
      icon: <User className="h-5 w-5" />,
      fields: (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Full Name *</label>
            <Input {...register('name', { required: 'Name is required' })} placeholder="Enter your full name" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <Input {...register('phone')} placeholder="+27 12 345 6789" />
          </div>
          <div>
            <label className="text-sm font-medium">Age</label>
            <Input {...register('age')} type="number" placeholder="25" min="16" max="100" />
          </div>
        </div>
      )
    },
    {
      title: 'Location',
      icon: <MapPin className="h-5 w-5" />,
      fields: (
        <div>
          <label className="text-sm font-medium">Location *</label>
          <Input {...register('location', { required: 'Location is required' })} placeholder="e.g., Johannesburg, South Africa" />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>
      )
    },
    {
      title: 'Skills & Bio',
      icon: <Award className="h-5 w-5" />,
      fields: (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Skills *</label>
            <Input
              {...register('skills', { 
                required: 'At least one skill is required',
                validate: value => value.split(',').map(s => s.trim()).filter(Boolean).length > 0 || 'Please enter at least one skill'
              })}
              placeholder="e.g., Web Development, Graphic Design, Plumbing"
            />
            {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium">Bio</label>
            <Textarea {...register('bio')} placeholder="Tell us about yourself..." rows={4} />
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">{steps[currentStep - 1].icon} {steps[currentStep - 1].title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {steps[currentStep - 1].fields}
            <div className="flex justify-between">
              <Button type="button" variant="outline" disabled={currentStep === 1} onClick={() => setCurrentStep(currentStep - 1)}>Previous</Button>
              {currentStep < steps.length ? (
                <Button type="button" onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
              ) : (
                <Button type="submit">Complete Profile</Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCompletion;
