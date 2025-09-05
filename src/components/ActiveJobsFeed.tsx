import React, { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import type { DocumentData } from "firebase/firestore"

import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"

interface Applicant {
  uid: string
  status: "applied" | "in-progress" | "hired"
  appliedAt: any
}

interface Job {
  id: string
  title: string
  description: string
  category: string
  budget: number
  urgency: string
  location: string
  createdAt?: any
  poster: {
    uid: string
    name: string
    email?: string
  } | DocumentData
  applicants?: Applicant[] | DocumentData
}

const ActiveJobsFeed: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Job[]
      setJobs(jobList)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const getApplicationStatus = (job: Job) => {
    if (!currentUser || !Array.isArray(job.applicants)) return null
    const applicant = job.applicants.find((a) => a.uid === currentUser.uid)
    return applicant?.status || null
  }

  if (loading) {
    return <p className="text-center py-10">Loading jobs...</p>
  }

  return (
    <div className="container mx-auto px-4 pt-20 pb-24 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Active Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-center">No jobs available yet.</p>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => {
            // Correct owner check
            const isOwner =
              currentUser &&
              job.poster &&
              String(currentUser.uid) === String(job.poster.uid)

            const appStatus = getApplicationStatus(job)

            let applyLabel = "View & Apply"
            if (appStatus === "applied") applyLabel = "Applied"
            else if (appStatus === "in-progress") applyLabel = "In-Progress"

            return (
              <Card key={job.id} className="p-4">
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p className="text-sm text-gray-600">{job.description}</p>

                <div className="mt-2 flex justify-between text-sm">
                  <span className="bg-gray-200 px-2 py-1 rounded">{job.category}</span>
                  <span className="font-medium">R{job.budget}</span>
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  {job.location} • Posted by {job.poster?.name || "Anonymous"} (
                  {job.poster?.email || "No email"})
                </div>

                <div className="mt-4 flex gap-2">
                  {/* Apply button only shows if NOT the owner */}
                  {!isOwner && (
                    <Button
                      variant={appStatus ? "secondary" : "outline"}
                      onClick={() => navigate(`/job/${job.id}`)}
                    >
                      {applyLabel}
                    </Button>
                  )}

                  {/* Owner cannot apply but can view applicants */}
                  {isOwner && (
                    <Button variant="outline" onClick={() => navigate(`/job/${job.id}`)}>
                      View Applicants
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ActiveJobsFeed
