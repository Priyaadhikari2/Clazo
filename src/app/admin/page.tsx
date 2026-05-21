"use client";
import React from "react";
import KpiCard from "@/components/KpiCard";
import { teachers, students, classes, exams, finance, resources, notifications } from "@/lib/mockData/admin";
import {
  AcademicCapIcon,
  UsersIcon,
  CalendarIcon,
  BookOpenIcon,
  CurrencyDollarIcon,
  TruckIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const totalTeachers = teachers.length;
  const totalStudents = students.length;
  const totalClasses = classes.length;
  const totalExams = exams.length;
  const avgStudentAttendance = students.reduce((a, s) => a + s.attendance, 0) / totalStudents || 0;
  const feePaidPct = Math.round((students.filter((s) => s.feePaid).length / totalStudents) * 100);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <KpiCard title="Teachers" value={totalTeachers} icon={<AcademicCapIcon className="h-6 w-6" />} />
        <KpiCard title="Students" value={totalStudents} icon={<UsersIcon className="h-6 w-6" />} />
        <KpiCard title="Classes" value={totalClasses} icon={<CalendarIcon className="h-6 w-6" />} />
        <KpiCard title="Exams" value={totalExams} icon={<BookOpenIcon className="h-6 w-6" />} />
        <KpiCard title="Revenue" value={`$${finance.totalFeesCollected.toLocaleString()}`} icon={<CurrencyDollarIcon className="h-6 w-6" />} />
        <KpiCard title="Pending Fees" value={`$${finance.pendingFees.toLocaleString()}`} icon={<CurrencyDollarIcon className="h-6 w-6" />} />
        <KpiCard title="Avg Attendance" value={`${avgStudentAttendance.toFixed(1)}%`} icon={<UsersIcon className="h-6 w-6" />} />
        <KpiCard title="Fee Collection" value={`${feePaidPct}%`} icon={<CurrencyDollarIcon className="h-6 w-6" />} />
      </div>

      {/* Recent Notifications */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <BellIcon className="h-5 w-5" /> Recent Notifications
        </h2>
        <div className="space-y-2">
          {notifications.map((n) => (
            <div key={n.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">{n.message}</span>
              <span className="text-xs text-gray-400">{n.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Stats Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Teachers */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Top Teachers</h2>
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Performance</th>
                <th className="p-2 text-left">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {[...teachers].sort((a, b) => b.performance - a.performance).slice(0, 5).map((t) => (
                <tr key={t.id} className="border-t border-gray-100 dark:border-gray-700">
                  <td className="p-2 text-gray-700 dark:text-gray-300">{t.name}</td>
                  <td className="p-2"><span className="text-yellow-500">★</span> {t.performance}/5</td>
                  <td className="p-2">{t.attendance}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Recent Transactions */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Recent Transactions</h2>
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {finance.transactions.slice(0, 5).map((t) => (
                <tr key={t.id} className="border-t border-gray-100 dark:border-gray-700">
                  <td className="p-2 text-gray-700 dark:text-gray-300">{t.description}</td>
                  <td className="p-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      t.type === 'fee' ? 'bg-green-100 text-green-700' :
                      t.type === 'salary' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>{t.type}</span>
                  </td>
                  <td className="p-2 text-right font-medium">${t.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
