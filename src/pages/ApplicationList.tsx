import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

type Application = {
  id: string;
  jobId: string;
  status: string;
  coverLetter: string;
  createdAt: any;
  jobTitle: string;
  jobBudget: number;
  jobStatus: string;
  clientInfo?: {
    displayName?: string;
    email?: string;
  };
};

export default function ApplicationList() {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const [myApplications, setMyApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Redirect logic in useEffect
  useEffect(() => {
    if (userProfile && userProfile.role !== "worker") {
      navigate("/home");
    }
  }, [userProfile, navigate]);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!currentUser || userProfile?.role !== "worker") return;

      try {
        const applications: Application[] = [];

        const jobsSnap = await getDocs(collection(db, "jobs"));

        for (const jobDoc of jobsSnap.docs) {
          const jobData = jobDoc.data();
          const appsSnap = await getDocs(
            query(
              collection(db, "jobs", jobDoc.id, "applications"),
              where("workerId", "==", currentUser.uid)
            )
          );

          // ✅ Use Promise.all to await async mapping
          const jobApplications = await Promise.all(
            appsSnap.docs.map(async (appDoc) => {
              const appData = appDoc.data();

              let clientInfo: { displayName?: string; email?: string } | undefined;
              if (jobData.clientId) {
                const clientSnap = await getDoc(doc(db, "users", jobData.clientId));
                if (clientSnap.exists()) {
                  clientInfo = clientSnap.data() as {
                    displayName?: string;
                    email?: string;
                  };
                }
              }

              return {
                id: appDoc.id,
                jobId: jobDoc.id,
                status: appData.status,
                coverLetter: appData.coverLetter,
                createdAt: appData.createdAt,
                jobTitle: jobData.title,
                jobBudget: jobData.budget,
                jobStatus: jobData.status,
                clientInfo,
              } as Application;
            })
          );

          applications.push(...jobApplications);
        }

        setMyApplications(applications);
      } catch (err) {
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [currentUser, userProfile]);

  if (loading) {
    return <div className="p-6 text-center">Loading applications…</div>;
  }

  if (myApplications.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">You haven’t applied to any jobs yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      <ul className="space-y-4">
        {myApplications.map((app) => (
          <li
            key={app.id}
            className="p-4 bg-white rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{app.jobTitle}</h2>
              <p className="text-gray-600">
                Budget: ${app.jobBudget} – Status: {app.jobStatus}
              </p>
              <p className="text-gray-500">
                Client: {app.clientInfo?.displayName || "Unknown"}
              </p>
              <p className="mt-2 text-gray-700">Your Status: {app.status}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
