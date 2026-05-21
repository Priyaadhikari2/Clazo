"use client";
import React from 'react';
import AdminLayout from '@/app/admin/layout';
import { students } from '@/lib/mockData/admin';
import KpiCard from '@/components/KpiCard';

export default function StudentsPage() {
  const total = students.length;
  const avgAttendance = students.reduce((a, s) => a + s.attendance, 0) / total || 0;
  const feePaidCount = students.filter(s => s.feePaid).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Student Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KpiCard title="Total Students" value={total} />
          <KpiCard title="Avg Attendance" value={`${avgAttendance.toFixed(1)}%`} />
          <KpiCard title="Fees Paid" value={feePaidCount} />
        </div>
      </div>
    </AdminLayout>
  );
}
