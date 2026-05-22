"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  User,
  TrendingUp,
  BookOpen,
  Clock,
  ChevronRight,
  Award,
} from "lucide-react";

export default function ParentChildrenPage() {
  const { profile, loading: authLoading } = useAuth();
  const router = useRouter();

  const [childrenData, setChildrenData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!profile || profile.role !== "parent")) {
      router.push("/login");
    }
  }, [profile, authLoading, router]);

  useEffect(() => {
    if (profile && profile.role === "parent") {
      const mockChildren = [
        {
          id: "child-1",
          name: "John Doe",
          grade: "8th Grade",
          avgScore: 87,
          pendingAssignments: 2,
          completedAssignments: 12,
          lastActive: "Active Now",
          subjects: [
            { name: "Math", score: 92, progress: 85 },
            { name: "Science", score: 88, progress: 90 },
            { name: "History", score: 78, progress: 70 },
          ],
        },
        {
          id: "child-2",
          name: "Emma Doe",
          grade: "6th Grade",
          avgScore: 91,
          pendingAssignments: 1,
          completedAssignments: 15,
          lastActive: "5 mins ago",
          subjects: [
            { name: "English", score: 95, progress: 93 },
            { name: "Science", score: 89, progress: 87 },
            { name: "Art", score: 97, progress: 96 },
          ],
        },
      ];

      setChildrenData(mockChildren);
      setLoading(false);
    }
  }, [profile]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Children
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Comprehensive view of your children&apos;s academic journey.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all">
          <Award className="h-4 w-4" />
          Request Report
        </button>
      </div>

      {!childrenData.length ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
          <div className="bg-gray-100 dark:bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <User className="h-8 w-8" />
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            No children linked
          </h3>

          <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
            Please link your child&apos;s account from the dashboard.
          </p>

          <button
            onClick={() => router.push("/parent/dashboard")}
            className="mt-6 text-blue-600 font-bold hover:underline"
          >
            Go to Dashboard
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {childrenData.map((child) => (
            <div
              key={child.id}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6 sm:p-8 border-b border-gray-50 dark:border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="bg-blue-600 p-4 rounded-2xl text-white">
                      <User className="h-8 w-8" />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {child.name}
                      </h2>

                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {child.grade}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    Last active: {child.lastActive}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 dark:divide-gray-700">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="h-5 w-5 text-green-600" />

                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase">
                      Avg. Proficiency
                    </span>
                  </div>

                  <p className="text-4xl font-black text-gray-900 dark:text-white">
                    {child.avgScore}%
                  </p>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-5 w-5 text-orange-600" />

                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase">
                      To-Do Items
                    </span>
                  </div>

                  <p className="text-4xl font-black text-gray-900 dark:text-white">
                    {child.pendingAssignments}
                  </p>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="h-5 w-5 text-blue-600" />

                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase">
                      Completed Tasks
                    </span>
                  </div>

                  <p className="text-4xl font-black text-gray-900 dark:text-white">
                    {child.completedAssignments}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 bg-gray-50 dark:bg-gray-900/20">
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-6">
                  Subject Breakdown
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {child.subjects.map((sub: any) => (
                    <div
                      key={sub.name}
                      className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-gray-900 dark:text-white">
                          {sub.name}
                        </span>

                        <span className="text-xs font-bold text-blue-600">
                          {sub.score}%
                        </span>
                      </div>

                      <div className="w-full bg-gray-100 dark:bg-gray-900 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${sub.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    View Detailed Academic Record
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}