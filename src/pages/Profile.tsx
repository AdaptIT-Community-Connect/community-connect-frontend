import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import Header from '../components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Loader2 } from 'lucide-react';
import ProfileCompletion from '@/components/ProfileCompletion';
import { db, auth } from '@/lib/firebase';

interface UserData {
  uid?: string;
  name: string;
  age?: number | string;
  location?: string;
  avatar?: string;
  rating?: number;
  completedJobs?: number;
  joinDate?: string;
  phone?: string;
  email?: string;
  bio?: string;
  skills?: string[];
  profileCompleted?: boolean;
}

interface FormData {
  name: string;
  phone?: string;
  age?: string;
  location?: string;
  bio?: string;
  skills?: string;
}

const Profile: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const { reset } = useForm<FormData>();

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data() as UserData;

          // Reset form with converted values
          reset({
            ...data,
            age: data.age ? String(data.age) : '',
            skills: data.skills ? data.skills.join(', ') : '',
          });

          setUserData(data);

          // Show profile completion if not completed
          if (!data.profileCompleted) setShowProfileCompletion(true);
        } else {
          setShowProfileCompletion(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user, reset]);

  // Handle profile completion callback
  const handleProfileComplete = async () => {
    if (!user) return;
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data() as UserData;

        setUserData(data);
        reset({
          ...data,
          age: data.age ? String(data.age) : '',
          skills: data.skills ? data.skills.join(', ') : '',
        });
      }
      setShowProfileCompletion(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Please sign in to view your profile
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {showProfileCompletion && <ProfileCompletion onComplete={handleProfileComplete} />}
      <Header />

      {!showProfileCompletion && userData && (
        <main className="container mx-auto px-4 pt-20 pb-24 max-w-4xl">
          <div className="bg-white p-6 rounded shadow space-y-3">
            <h2 className="text-2xl font-bold">{userData.name}</h2>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
            <p><strong>Age:</strong> {userData.age}</p>
            <p><strong>Location:</strong> {userData.location}</p>
            <p><strong>Bio:</strong> {userData.bio}</p>
            {userData.skills && userData.skills.length > 0 && (
              <p><strong>Skills:</strong> {userData.skills.join(', ')}</p>
            )}
            <p><strong>Rating:</strong> {userData.rating}</p>
            <p><strong>Completed Jobs:</strong> {userData.completedJobs}</p>
            <p><strong>Joined:</strong> {userData.joinDate}</p>
          </div>
        </main>
      )}

      <BottomNavigation />
    </div>
  );
};

export default Profile;
