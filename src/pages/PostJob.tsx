import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PostJob = () => {
  const { currentUser } = useAuth(); // get logged-in user
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [urgency, setUrgency] = useState('Flexible');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !budget) return;

    try {
      const job = {
        title,
        description,
        budget: Number(budget),
        location: location || 'Not specified',
        urgency: urgency || 'Flexible',
        category: category || 'General',
        estimatedTime: '2-4 hours',
        applicants: 0,
        timePosted: 'Just now',
        createdAt: serverTimestamp(),
        poster: {
          name: currentUser?.displayName || 'Anonymous',
          avatar: currentUser?.photoURL || '/placeholder.svg',
          rating: 4.5,
          jobsPosted: 1,
          memberSince: '2025', // you can fetch this from user profile later
        },
      };

      await addDoc(collection(db, 'jobs'), job);

      setTitle('');
      setDescription('');
      setBudget('');
      setLocation('');
      setCategory('');
      alert('Job posted successfully!');
    } catch (err) {
      console.error('Error posting job:', err);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Post a New Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Job Title</Label>
              <Input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g., Fix leaky tap" 
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Describe the job..." 
              />
            </div>
            <div>
              <Label>Budget (R)</Label>
              <Input 
                type="number"
                value={budget} 
                onChange={(e) => setBudget(e.target.value)} 
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                placeholder="e.g., Sandton, Johannesburg" 
              />
            </div>
            <div>
              <Label>Category</Label>
              <Input 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                placeholder="e.g., Plumbing, Electrical" 
              />
            </div>
            <div>
              <Label>Urgency</Label>
              <select 
                value={urgency} 
                onChange={(e) => setUrgency(e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="Flexible">Flexible</option>
                <option value="Today">Today</option>
                <option value="This week">This week</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <Button type="submit" className="w-full">Post Job</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostJob;
