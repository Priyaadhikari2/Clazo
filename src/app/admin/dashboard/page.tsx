"use client";

import { useEffect, useState } from "react";
import { isMockMode } from "@/lib/mockMode";

interface Stats {
  totalStudents: number;
  totalTeachers: number;
  totalAssignments: number;
  totalMaterials: number;
  notifications: string[];
}

const mockStats: Stats = {
  totalStudents: 42,
  totalTeachers: 7,
  totalAssignments: 15,
  totalMaterials: 12,
  notifications: [
    "Server maintenance scheduled for tomorrow at 02:00 AM.",
    "New AI tutoring feature released.",
    "Student enrollment increased by 8% this month."
  ]
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (isMockMode()) {
      setStats(mockStats);
    } else {
      // Placeholder for real data fetching in production mode.
      setStats(null);
    }
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-full p-8">
        <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Students</h2>
          <p className="mt-2 text-4xl font-bold text-blue-600">{stats.totalStudents}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Teachers</h2>
          <p className="mt-2 text-4xl font-bold text-green-600">{stats.totalTeachers}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Assignments</h2>
          <p className="mt-2 text-4xl font-bold text-purple-600">{stats.totalAssignments}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Materials</h2>
          <p className="mt-2 text-4xl font-bold text-orange-600">{stats.totalMaterials}</p>
        </div>
      </div>
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Notifications</h2>
        <ul className="space-y-3">
          {stats.notifications.map((note, idx) => (
            <li key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
              <p className="text-gray-800 dark:text-gray-200">{note}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
