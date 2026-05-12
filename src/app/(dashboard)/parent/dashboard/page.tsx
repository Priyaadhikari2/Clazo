"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Users, TrendingUp, BookOpen, Bell, ArrowUpRight, Calendar, Plus, Search, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { db } from "@/lib/firebase";
import { doc, updateDoc, arrayUnion, collection, query, where, getDocs } from "firebase/firestore";

const mockPerformanceData = [
  { name: 'Mon', score: 82 },
  { name: 'Tue', score: 85 },
  { name: 'Wed', score: 84 },
  { name: 'Thu', score: 89 },
  { name: 'Fri', score: 87 },
  { name: 'Sat', score: 91 },
  { name: 'Sun', score: 92 },
];

export default function ParentDashboard() {
  const { profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [childrenData, setChildrenData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [linking, setLinking] = useState(false);
  const [childEmail, setChildEmail] = useState("");
  const [linkError, setLinkError] = useState("");

  useEffect(() => {
    if (!authLoading && (!profile || profile.role !== "parent")) {
      router.push("/login");
    }
  }, [profile, authLoading, router]);

  useEffect(() => {
    const fetchChildren = async () => {
      if (!profile?.profileData?.children?.length) {
        setChildrenData([]);
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "users"),
          where("uid", "in", profile.profileData.children)
        );
        const querySnapshot = await getDocs(q);
        const fetched: any[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() });
        });
        setChildrenData(fetched);
      } catch (err) {
        console.error("Error fetching children:", err);
      } finally {
        setLoading(false);
      }
    };

    if (profile && profile.role === "parent") {
      fetchChildren();
    }
  }, [profile]);

  const handleLinkChild = async (e: React.FormEvent) => {
    e.preventDefault();
    setLinking(true);
    setLinkError("");

    try {
      // Find student by email
      const q = query(collection(db, "users"), where("email", "==", childEmail), where("role", "==", "student"));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setLinkError("No student found with this email address.");
        setLinking(false);
        return;
      }

      const studentDoc = querySnapshot.docs[0];
      const studentId = studentDoc.data().uid;

      // Update parent's profileData
      const parentRef = doc(db, "users", profile!.uid);
      await updateDoc(parentRef, {
        "profileData.children": arrayUnion(studentId)
      });

      // Refresh page to show new data
      window.location.reload();
    } catch (err: any) {
      setLinkError(err.message || "Failed to link child.");
    } finally {
      setLinking(false);
    }
  };

  if (authLoading || loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 bg-blue-200 dark:bg-blue-900 rounded-full mb-4"></div>
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
  if (!profile) return null;

  const hasChildren = childrenData.length > 0;

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome, {profile.name}!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {hasChildren 
              ? "Here's what's happening with your children's learning today."
              : "Let's get started by linking your child's account."}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-800">
          <Calendar className="h-4 w-4" />
          <span>Academic Year 2024-25</span>
        </div>
      </header>

      {!hasChildren ? (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-blue-100 dark:border-blue-900/30 text-center max-w-2xl mx-auto mt-12">
          <div className="bg-blue-100 dark:bg-blue-900/50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-blue-600 dark:text-blue-400">
            <Plus className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Link Your Child</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Enter your child's registered Clazo email address to start tracking their academic progress, assignments, and AI Tutor activity.
          </p>
          <form onSubmit={handleLinkChild} className="space-y-4 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                type="email"
                required
                placeholder="child@example.com"
                value={childEmail}
                onChange={(e) => setChildEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            {linkError && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">{linkError}</p>}
            <button 
              disabled={linking}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 dark:shadow-none transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {linking ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
              {linking ? "Linking..." : "Link Child Account"}
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md">Active</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{childrenData.length}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Linked {childrenData.length === 1 ? 'Student' : 'Students'}</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-xl text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div className="flex items-center text-xs font-medium text-green-600">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +2.5%
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">87.4%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Average Proficiency</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-100 dark:bg-orange-900/50 p-3 rounded-xl text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                  <Bell className="h-6 w-6" />
                </div>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">3</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Unread Alerts</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Progress Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Learning Velocity</h2>
                <select className="text-sm bg-gray-50 dark:bg-gray-900 border-none rounded-lg px-2 py-1 outline-none cursor-pointer">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ fontWeight: 'bold' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#3b82f6" 
                      strokeWidth={4} 
                      dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
                      activeDot={{ r: 6, strokeWidth: 0 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center justify-between">
                Recent Activity
                <button className="text-sm font-medium text-blue-600 hover:underline">View Log</button>
              </h2>
              <div className="space-y-6 flex-1">
                {childrenData.map((child) => (
                  <div key={child.uid} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400 mt-1">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{child.name} active in AI Tutor</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Focusing on: Calculus Fundamentals</p>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider">Just Now</p>
                    </div>
                  </div>
                ))}
                {!childrenData.length && <p className="text-center text-gray-500 py-8">No recent activity</p>}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Subject Breakdown</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { subject: "Mathematics", score: 92, color: "bg-blue-500" },
                { subject: "Science", score: 88, scoreColor: "text-green-600", color: "bg-green-500" },
                { subject: "English", score: 85, scoreColor: "text-purple-600", color: "bg-purple-500" },
                { subject: "History", score: 78, scoreColor: "text-orange-600", color: "bg-orange-500" },
              ].map((item) => (
                <div key={item.subject} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-gray-700 dark:text-gray-300">{item.subject}</span>
                    <span className="font-mono text-gray-500 dark:text-gray-400">{item.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full transition-all duration-1000`} style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
