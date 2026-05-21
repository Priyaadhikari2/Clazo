"use client";
import React, { useState } from 'react';
import KpiCard from '@/components/KpiCard';
import { teachers } from '@/lib/mockData/admin';

export default function TeachersPage() {
  const [search, setSearch] = useState('');
  const filtered = teachers.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.email.toLowerCase().includes(search.toLowerCase())
  );
  const total = teachers.length;
  const avgAttendance = teachers.reduce((a, t) => a + t.attendance, 0) / total || 0;
  const avgPerformance = teachers.reduce((a, t) => a + t.performance, 0) / total || 0;

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Teacher Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard title="Total Teachers" value={total.toString()} />
        <KpiCard title="Avg Attendance" value={`${avgAttendance.toFixed(1)}%`} />
        <KpiCard title="Avg Performance" value={avgPerformance.toFixed(1)} />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search teachers..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-64"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Subjects</th>
              <th className="p-2 text-left">Attendance</th>
              <th className="p-2 text-left">Salary Paid</th>
              <th className="p-2 text-left">Performance</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id} className="border-t">
                <td className="p-2">{t.name}</td>
                <td className="p-2">{t.email}</td>
                <td className="p-2">{t.subjects.join(', ')}</td>
                <td className="p-2">{t.attendance}%</td>
                <td className="p-2">{t.salaryPaid ? '✓' : '✗'}</td>
                <td className="p-2">{t.performance}/5</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
