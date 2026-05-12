"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { isMockMode } from "@/lib/mockMode";
import { Loader2, Plus, Trash2, ClipboardList, Calendar } from "lucide-react";
import Link from "next/link";

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: any;
  teacherId: string;
  subject: string;
}

const mockAssignments: Assignment[] = [
  { id: "mock-t1", title: "Algebra Quiz 3", description: "Quiz on chapters 5-6.", dueDate: null, teacherId: "mock", subject: "Mathematics" },
  { id: "mock-t2", title: "Essay on Photosynthesis", description: "500-word essay on photosynthesis.", dueDate: null, teacherId: "mock", subject: "Biology" },
];

export default function AssignmentsPage() {
  const { profile } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchAssignments = async () => {
    if (!profile) return;
    setLoading(true);
    try {
      if (isMockMode()) {
        setAssignments(mockAssignments);
      } else {
        const { db } = await import("@/lib/firebase");
        const { collection, query, where, getDocs } = await import("firebase/firestore");
        const q = query(collection(db, "assignments"), where("teacherId", "==", profile.uid));
        const snap = await getDocs(q);
        const fetched: Assignment[] = [];
        snap.forEach((d) => fetched.push({ id: d.id, ...d.data() } as Assignment));
        fetched.sort((a, b) => (a.dueDate?.toMillis?.() || 0) - (b.dueDate?.toMillis?.() || 0));
        setAssignments(fetched);
      }
    } catch (err) { console.error("Error fetching assignments:", err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAssignments(); }, [profile]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSubmitting(true);
    setError("");
    try {
      if (isMockMode()) {
        const newA: Assignment = { id: "mock-" + Date.now(), title, description, subject, dueDate: null, teacherId: profile.uid };
        setAssignments(prev => [...prev, newA]);
      } else {
        const { db } = await import("@/lib/firebase");
        const { collection, addDoc, Timestamp } = await import("firebase/firestore");
        await addDoc(collection(db, "assignments"), { title, description, subject, dueDate: Timestamp.fromDate(new Date(dueDate)), teacherId: profile.uid });
        fetchAssignments();
      }
      setShowForm(false);
      setTitle(""); setDescription(""); setSubject(""); setDueDate("");
    } catch (err: any) { setError(err.message || "Failed to create assignment"); }
    finally { setSubmitting(false); }
  };

  const fmtDate = (d: any) => { try { return d?.toDate().toLocaleDateString(); } catch { return "No Due Date"; } };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Assignments</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Create and manage student assignments.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          {showForm ? <Trash2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}{showForm ? "Cancel" : "New Assignment"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
          <h2 className="text-xl font-semibold mb-6 dark:text-white">Create New Assignment</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" placeholder="e.g., Essay on Photosynthesis" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                <input type="text" required value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" placeholder="e.g., Biology" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" rows={4} placeholder="Detail the requirements..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
              <input type="datetime-local" required value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full md:w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-end mt-6">
              <button type="submit" disabled={submitting} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50">
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}{submitting ? "Creating..." : "Create Assignment"}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-purple-600" /></div>
      ) : assignments.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
          <ClipboardList className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No assignments</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Create your first assignment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {assignments.map((a) => (
            <div key={a.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow flex flex-col border-l-4 border-l-purple-500">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 uppercase tracking-wide">{a.subject}</span>
                <div className="flex items-center text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md"><Calendar className="h-3 w-3 mr-1" />{fmtDate(a.dueDate)}</div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{a.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1 line-clamp-3 whitespace-pre-wrap">{a.description}</p>
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                <Link href={`/teacher/assignments/${a.id}/submissions`} className="text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 flex items-center">
                  View Submissions &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
