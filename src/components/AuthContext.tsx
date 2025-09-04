"use client"

import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import { auth, db } from "../firebase"
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "firebase/auth"
import type { User as FirebaseUser } from "firebase/auth" // Type-only import
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore"

// Define all types inline for quick setup
interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface RecentJob {
  id: number | string;
  title: string;
  client: string;
  rating: number;
  date: string;
  amount: string;
}

interface UserStats {
  responseRate: string;
  avgResponseTime: string;
  completionRate: string;
}

interface UserProfile {
  id?: string;
  displayName: string;
  email: string;
  role: 'homeowner' | 'worker';
  bio: string;
  skills: string[];
  createdAt: Date | string;
  rating: number;
  completedJobs: number;
  recentJobs: RecentJob[];
  location: string;
  phone: string;
  avatar: string;
  joinDate?: string;
  stats: UserStats;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  signup: (email: string, password: string, userData: Partial<UserProfile>) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<boolean>;
  refreshUserProfile: () => Promise<void>;
}

// Export the context so it can be used elsewhere
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  async function signup(email: string, password: string, userData: Partial<UserProfile>) {
    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Update user profile with display name
      await updateProfile(user, {
        displayName: userData.displayName
      })

      // Create user profile in Firestore with complete structure
      const userProfileData: UserProfile = {
        displayName: userData.displayName || "",
        email: user.email || "",
        role: userData.role || "homeowner",
        bio: userData.bio || "",
        skills: userData.skills || [],
        createdAt: new Date(),
        rating: 0,
        completedJobs: 0,
        recentJobs: [],
        location: "",
        phone: "",
        avatar: user.photoURL || "",
        stats: {
          responseRate: "0%",
          avgResponseTime: "0 hours",
          completionRate: "0%"
        }
      }

      await setDoc(doc(db, "users", user.uid), userProfileData)

      // Update local state
      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      })
      
      // Fetch the newly created profile
      const userDoc = await getDoc(doc(db, "users", user.uid))
      if (userDoc.exists()) {
        setUserProfile({ id: userDoc.id, ...userDoc.data() } as UserProfile)
      }

      return userCredential
    } catch (error) {
      console.error("Error signing up:", error)
      throw error
    }
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    setUserProfile(null)
    return signOut(auth)
  }

  // Function to update user profile
  async function updateUserProfile(updates: Partial<UserProfile>) {
    if (!currentUser) return false
    
    try {
      // Update in Firestore
      const userRef = doc(db, "users", currentUser.uid)
      await updateDoc(userRef, updates)
      
      // Update local state
      const updatedDoc = await getDoc(userRef)
      if (updatedDoc.exists()) {
        setUserProfile({ id: updatedDoc.id, ...updatedDoc.data() } as UserProfile)
      }
      
      return true
    } catch (error) {
      console.error("Error updating profile:", error)
      throw error
    }
  }

  // Function to refresh user profile
  async function refreshUserProfile() {
    if (!currentUser) return
    
    try {
      const userDoc = await getDoc(doc(db, "users", currentUser.uid))
      if (userDoc.exists()) {
        setUserProfile({ id: userDoc.id, ...userDoc.data() } as UserProfile)
      }
    } catch (error) {
      console.error("Error refreshing profile:", error)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
      if (user) {
        const userData: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        }
        
        setCurrentUser(userData)
        
        // Fetch user profile from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid))
          if (userDoc.exists()) {
            setUserProfile({ id: userDoc.id, ...userDoc.data() } as UserProfile)
          } else {
            // Create a basic profile if it doesn't exist
            const defaultProfile: UserProfile = {
              displayName: user.displayName || "",
              email: user.email || "",
              role: "homeowner",
              bio: "",
              skills: [],
              createdAt: new Date(),
              rating: 0,
              completedJobs: 0,
              recentJobs: [],
              location: "",
              phone: "",
              avatar: user.photoURL || "",
              stats: {
                responseRate: "0%",
                avgResponseTime: "0 hours",
                completionRate: "0%"
              }
            }
            
            await setDoc(doc(db, "users", user.uid), defaultProfile)
            
            const newUserDoc = await getDoc(doc(db, "users", user.uid))
            if (newUserDoc.exists()) {
              setUserProfile({ id: newUserDoc.id, ...newUserDoc.data() } as UserProfile)
            }
          }
        } catch (error) {
          console.error("Error fetching user profile:", error)
        }
      } else {
        setCurrentUser(null)
        setUserProfile(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value: AuthContextType = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    updateUserProfile,
    refreshUserProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}