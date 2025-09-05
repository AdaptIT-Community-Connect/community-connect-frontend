"use client"

import { useNavigate } from "react-router-dom"

// Define a Job type (replace fields with your real Firestore schema if needed)
type Job = {
  id: string
  title: string
  description: string
  budget: number
  status: "open" | "assigned" | "completed" | string
  createdAt: any // Firestore Timestamp or Date
  clientName?: string
}

type JobCardProps = {
  job: Job
  userRole: "worker" | "homeowner"
}

export default function JobCard({ job, userRole }: JobCardProps) {
  const navigate = useNavigate()

  const formatDate = (date: any): string => {
    if (date?.toDate) {
      return date.toDate().toLocaleDateString()
    }
    return new Date(date).toLocaleDateString()
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800"
      case "assigned":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}
          >
            {job.status}
          </span>
          <span className="text-sm text-gray-500">{formatDate(job.createdAt)}</span>
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-2">{job.title}</h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{job.description}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-green-600">${job.budget}</span>
          {userRole === "worker" && job.clientName && (
            <span className="text-sm text-gray-500">by {job.clientName}</span>
          )}
        </div>

        <button
          onClick={() => navigate(`/job/${job.id}`)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          {userRole === "homeowner" ? "View Applications" : "View Details"}
        </button>
      </div>
    </div>
  )
}
