"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { isMockMode } from "@/lib/mockMode";
import { Loader2, ClipboardList, Calendar, CheckCircle, Paperclip, X, FileText } from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: any;
  teacherId: string;
  subject: string;
}

const mockAssignments: Assignment[] = [
  { id: "mock-a1", title: "Algebra Quiz 3", description: "Complete the quiz covering chapters 5-6.", dueDate: null, teacherId: "t1", subject: "Mathematics" },
  { id: "mock-a2", title: "Essay on Photosynthesis", description: "Write a 500-word essay on photosynthesis.", dueDate: null, teacherId: "t1", subject: "Biology" },
  { id: "mock-a3", title: "History Research Paper", description: "Research key events of the Industrial Revolution.", dueDate: null, teacherId: "t2", subject: "History" },
];

export default function StudentAssignmentsPage() {
  const { profile } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissionContent, setSubmissionContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submittedIds, setSubmittedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        if (isMockMode()) {
          setAssignments(mockAssignments);
        } else {
          const { db } = await import("@/lib/firebase");
          const { collection, query, getDocs, where } = await import("firebase/firestore");
          const q = query(collection(db, "assignments"));
          const snap = await getDocs(q);
          const fetched: Assignment[] = [];
          snap.forEach((d) => fetched.push({ id: d.id, ...d.data() } as Assignment));
          fetched.sort((a, b) => (a.dueDate?.toMillis?.() || 0) - (b.dueDate?.toMillis?.() || 0));
          setAssignments(fetched);
          if (profile) {
            const subQ = query(collection(db, "submissions"), where("studentId", "==", profile.uid));
            const subSnap = await getDocs(subQ);
            const ids = new Set<string>();
            subSnap.forEach(d => ids.add(d.data().assignmentId));
            setSubmittedIds(ids);
          }
        }
      } catch (err) { console.error("Error fetching assignments:", err); }
      finally { setLoading(false); }
    };
    fetch();
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !selectedAssignment || (!submissionContent.trim() && !selectedFile)) return;
    setSubmitting(true);
    setUploadProgress(0);
    
    try {
      let fileUrl = "";
      let fileName = "";

      if (isMockMode()) {
        if (selectedFile) {
          // Simulate upload
          for (let i = 0; i <= 100; i += 20) {
            setUploadProgress(i);
            await new Promise(r => setTimeout(r, 100));
          }
          fileUrl = "#mock-url";
          fileName = selectedFile.name;
        }
        setSubmittedIds(prev => new Set(prev).add(selectedAssignment.id));
      } else {
        const { db, storage } = await import("@/lib/firebase");
        const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
        const { ref, uploadBytesResumable, getDownloadURL } = await import("firebase/storage");

        if (selectedFile) {
          fileName = selectedFile.name;
          const storageRef = ref(storage, `submissions/${profile.uid}/${selectedAssignment.id}/${fileName}`);
          const uploadTask = uploadBytesResumable(storageRef, selectedFile);

          await new Promise((resolve, reject) => {
            uploadTask.on('state_changed', 
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
              }, 
              (error) => reject(error), 
              () => resolve(null)
            );
          });
          fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
        }

        await addDoc(collection(db, "submissions"), {
          assignmentId: selectedAssignment.id, 
          studentId: profile.uid,
          studentName: profile.name,
          content: submissionContent, 
          fileUrl,
          fileName,
          submittedAt: serverTimestamp(),
        });
        setSubmittedIds(prev => new Set(prev).add(selectedAssignment.id));
      }
      setSelectedAssignment(null);
      setSubmissionContent("");
      setSelectedFile(null);
      setUploadProgress(0);
    } catch (err) { 
      console.error("Error submitting:", err); 
      alert("Failed to submit. Please try again.");
    } finally { 
      setSubmitting(false); 
    }
  };

  const fmtDate = (d: any) => { try { return d?.toDate().toLocaleDateString(); } catch { return "No Due Date"; } };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Assignments</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">View and submit your pending work.</p>
      </div>

      {selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Submit: {selectedAssignment.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">{selectedAssignment.description}</p>
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Answer</label>
              <textarea value={submissionContent} onChange={(e) => setSubmissionContent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 mb-4" rows={4} placeholder="Type your answer here..." />
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Attach File (Optional)</label>
                {!selectedFile ? (
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Paperclip className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PDF, Image, or Doc</p>
                      </div>
                      <input type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-lg">
                    <div className="flex items-center gap-3 truncate">
                      <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="text-sm font-medium text-blue-900 dark:text-blue-300 truncate">{selectedFile.name}</span>
                    </div>
                    <button type="button" onClick={() => setSelectedFile(null)} className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full text-blue-600 dark:text-blue-400 transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {submitting && uploadProgress > 0 && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setSelectedAssignment(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors">Cancel</button>
                <button type="submit" disabled={submitting} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}{submitting ? "Submitting..." : "Submit Assignment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>
      ) : assignments.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
          <ClipboardList className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No assignments</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">You&apos;re all caught up!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {assignments.map((a) => {
            const done = submittedIds.has(a.id);
            return (
              <div key={a.id} className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border ${done ? 'border-green-200 dark:border-green-900/50' : 'border-gray-100 dark:border-gray-700'} hover:shadow-md transition-shadow flex flex-col`}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 uppercase tracking-wide">{a.subject}</span>
                  <div className="flex items-center text-xs font-medium text-gray-500 dark:text-gray-400"><Calendar className="h-3 w-3 mr-1" />{fmtDate(a.dueDate)}</div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{a.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1 line-clamp-3">{a.description}</p>
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                  {done ? (
                    <div className="flex items-center justify-center gap-2 w-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-medium py-2 rounded-lg"><CheckCircle className="h-5 w-5" />Submitted</div>
                  ) : (
                    <button onClick={() => setSelectedAssignment(a)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors">Start Assignment</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
