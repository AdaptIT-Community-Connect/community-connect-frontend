import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { doc, getDoc, collection, addDoc, query, where, onSnapshot } from "firebase/firestore"
import { db } from "@/firebase"
import { useAuth } from "@/contexts/AuthContext"

interface Job {
  id: string
  title: string
  description: string
  budget: number
  status: "open" | "assigned" | "completed"
  createdAt: any
  clientId: string
  assignedWorkerId?: string
}

interface Application {
  id: string
  workerId: string
  status: "pending" | "hired"
  createdAt: any
}

export default function JobDetails() {
  const { id } = useParams<{ id: string }>()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const [job, setJob] = useState<Job | null>(null)
  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch job and listen for user's application in real-time
  useEffect(() => {
    if (!id) return
    let unsubscribe: (() => void) | undefined

    const fetchJob = async () => {
      try {
        const jobRef = doc(db, "jobs", id)
        const jobSnap = await getDoc(jobRef)
        if (!jobSnap.exists()) {
          setError("Job not found")
          setLoading(false)
          return
        }
        setJob({ id: jobSnap.id, ...(jobSnap.data() as Omit<Job, "id">) })

        // Listen for current user's application
        if (currentUser && currentUser.uid !== jobSnap.data()?.clientId) {
          const appsRef = collection(db, "jobs", id, "applications")
          const q = query(appsRef, where("workerId", "==", currentUser.uid))
          unsubscribe = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
              const appDoc = snapshot.docs[0]
              setApplication({ id: appDoc.id, ...(appDoc.data() as Omit<Application, "id">) })
            } else {
              setApplication(null)
            }
          })
        }
      } catch (err) {
        console.error("Error fetching job/application:", err)
        setError("Failed to load job")
      } finally {
        setLoading(false)
      }
    }

    fetchJob()

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [id, currentUser])

  const handleApply = async () => {
    if (!currentUser || !job) return

    try {
      const appRef = collection(db, "jobs", job.id, "applications")
      const docRef = await addDoc(appRef, {
        workerId: currentUser.uid,
        createdAt: new Date(),
        status: "pending",
      })
      setApplication({
        id: docRef.id,
        workerId: currentUser.uid,
        createdAt: new Date(),
        status: "pending",
      })
      alert("Application submitted successfully!")
    } catch (err) {
      console.error("Error applying for job:", err)
      alert("Failed to apply for job")
    }
  }

  if (loading) return <div className="p-4">Loading job details...</div>
  if (error) return <div className="p-4 text-red-500">{error}</div>
  if (!job) return <div className="p-4">No job found.</div>

  const isOwner = currentUser?.uid === job.clientId
  const hasApplied = !!application

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{job.title}</h1>
      <p className="mb-4">{job.description}</p>
      <p className="mb-2 text-gray-700">
        <span className="font-semibold">Budget:</span> R{job.budget}
      </p>
      <p className="mb-2 text-gray-700">
        <span className="font-semibold">Job Status:</span> {job.status}
      </p>

      {hasApplied && (
        <p className="mb-4 text-gray-700">
          <span className="font-semibold">Application Status:</span>{" "}
          {application?.status === "pending" ? "In-Progress" : "Hired / Completed"}
        </p>
      )}

      {currentUser ? (
        isOwner ? (
          <p className="text-blue-600 font-semibold">You posted this job.</p>
        ) : hasApplied ? (
          <button
            className={`px-4 py-2 rounded ${
              application?.status === "pending"
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-600 text-white cursor-not-allowed"
            }`}
            disabled
          >
            {application?.status === "pending" ? "In-Progress" : "Completed"}
          </button>
        ) : (
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Apply for this Job
          </button>
        )
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Log in to apply
        </button>
      )}
    </div>
  )
}
