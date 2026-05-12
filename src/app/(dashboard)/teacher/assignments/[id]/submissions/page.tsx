"use client";

import { useState, useEffect, use } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { Loader2, ArrowLeft, User, CheckCircle, FileText, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  content: string;
  fileUrl?: string;
  fileName?: string;
  submittedAt: any;
}

export default function SubmissionsPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  
  const { profile } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [assignmentTitle, setAssignmentTitle] = useState("Assignment");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissionsAndDetails = async () => {
      setLoading(true);
      try {
        // Fetch assignment details
        const assignmentRef = doc(db, "assignments", id);
        const assignmentSnap = await getDoc(assignmentRef);
        if (assignmentSnap.exists()) {
          setAssignmentTitle(assignmentSnap.data().title);
        }

        // Fetch submissions
        const q = query(
          collection(db, "submissions"),
          where("assignmentId", "==", id)
        );
        const querySnapshot = await getDocs(q);
        const fetched: Submission[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() } as Submission);
        });
        setSubmissions(fetched);
      } catch (err) {
        console.error("Error fetching submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (profile && id) {
      fetchSubmissionsAndDetails();
    }
  }, [id, profile]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/teacher/assignments" 
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Assignments
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Submissions for "{assignmentTitle}"
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {submissions.length} {submissions.length === 1 ? 'student has' : 'students have'} submitted this assignment.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-purple-600" /></div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="bg-gray-100 dark:bg-gray-700 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No submissions yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Students haven't submitted their work for this assignment.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {submissions.map((sub) => (
            <div key={sub.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-full text-purple-600 dark:text-purple-400">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{sub.studentName}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Submitted on {sub.submittedAt?.toDate ? sub.submittedAt.toDate().toLocaleString() : "Unknown date"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full text-sm font-medium">
                  <CheckCircle className="h-4 w-4" />
                  Submitted
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Student's Answer:</h4>
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono text-sm mb-4">
                  {sub.content || "No text provided."}
                </p>

                {sub.fileUrl && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Attached File:</h4>
                    <a 
                      href={sub.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-300 dark:hover:border-purple-700 transition-colors group"
                    >
                      <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                        {sub.fileName || "View Attachment"}
                      </span>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-purple-600" />
                    </a>
                  </div>
                )}
              </div>

              {/* MVP Grade/Feedback placeholder area */}
              <div className="mt-4 flex justify-end">
                <button className="text-purple-600 hover:text-purple-700 dark:text-purple-400 font-medium text-sm">
                  Add Grade / Feedback
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
