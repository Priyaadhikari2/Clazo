"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Users, BookOpen, FileText, Shield } from "lucide-react";

export default function AdminDashboard() {
  const { profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!profile || profile.role !== "admin")) {
      router.push("/login");
    }
  }, [profile, loading, router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
  if (!profile) return null;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg text-blue-600 dark:text-blue-400">
              <Users className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Students</h2>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">128</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-lg text-purple-600 dark:text-purple-400">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Teachers</h2>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-lg text-green-600 dark:text-green-400">
              <FileText className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Assignments</h2>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">64</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-orange-100 dark:bg-orange-900/50 p-3 rounded-lg text-orange-600 dark:text-orange-400">
              <BookOpen className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Materials</h2>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">45</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Platform Overview</h2>
        <p className="text-gray-500 dark:text-gray-400">
          The Clazo platform is running smoothly. All services are operational.
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 p-4 rounded-lg">
            <p className="text-sm font-medium text-green-800 dark:text-green-300">✓ Authentication Service</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">Operational</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 p-4 rounded-lg">
            <p className="text-sm font-medium text-green-800 dark:text-green-300">✓ AI Tutor API</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">Operational</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 p-4 rounded-lg">
            <p className="text-sm font-medium text-green-800 dark:text-green-300">✓ Database</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">Operational</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 p-4 rounded-lg">
            <p className="text-sm font-medium text-green-800 dark:text-green-300">✓ File Storage</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">Operational</p>
          </div>
        </div>
      </div>
    </div>
  );
}
