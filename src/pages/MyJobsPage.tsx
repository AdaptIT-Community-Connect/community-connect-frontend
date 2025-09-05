"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../contexts/AuthContext"
import JobCard from "@/components/JobCard"

interface Job {
  id: string
  title: string
  description: string
  budget: number
  status: string
  createdAt: any
  clientId?: string
  assignedWorkerId?: string
}

export default function MyJobsPage() {
  const [postedJobs, setPostedJobs] = useState<Job[]>([])
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const { currentUser, userProfile } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) return

    // 🔹 Posted jobs
    const postedQuery = query(collection(db, "jobs"), where("clientId", "==", currentUser.uid))
    const unsubscribePosted = onSnapshot(postedQuery, (snapshot) => {
      const jobsData: Job[] = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() } as Job))
      setPostedJobs(jobsData)
    })

    // 🔹 Applied jobs
    const fetchAppliedJobs = async () => {
      const jobsSnapshot = await getDocs(collection(db, "jobs"))
      const jobsData: Job[] = []

      for (const jobSnap of jobsSnapshot.docs) {
        const appsRef = collection(db, "jobs", jobSnap.id, "applications")
        const appsSnapshot = await getDocs(appsRef)
        const hasApplied = appsSnapshot.docs.some((doc) => doc.data().workerId === currentUser.uid)

        if (hasApplied) {
          jobsData.push({ id: jobSnap.id, ...jobSnap.data() } as Job)
        }
      }

      setAppliedJobs(jobsData)
      setLoading(false)
    }

    fetchAppliedJobs()

    return () => {
      unsubscribePosted()
    }
  }, [currentUser])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading your jobs...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button onClick={() => navigate("/home")} className="text-blue-600 hover:text-blue-500 mr-4">
                ← Back
              </button>
              <h1 className="text-xl font-semibold">My Jobs</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Posted Jobs */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Jobs I Posted</h2>
          {postedJobs.length === 0 ? (
            <p className="text-gray-500">You haven't posted any jobs yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {postedJobs.map((job) => (
                <JobCard key={job.id} job={job} userRole="homeowner" />
              ))}
            </div>
          )}
        </div>

        {/* Applied Jobs */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Jobs I Applied For</h2>
          {appliedJobs.length === 0 ? (
            <p className="text-gray-500">You haven't applied for any jobs yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {appliedJobs.map((job) => (
                <JobCard key={job.id} job={job} userRole="worker" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
