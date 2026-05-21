"use client";
import React from 'react';
import KpiCard from '@/components/KpiCard';
import { resources } from '@/lib/mockData/admin';
import { Squares2X2Icon } from '@heroicons/react/24/outline';

export default function ResourcesPage() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Resources</h1>
      <KpiCard title="Total Resources" value={resources.length.toString()} icon={<Squares2X2Icon className="h-6 w-6" />} />
      <section className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{r.id}</td>
                <td className="p-2">{r.type}</td>
                <td className="p-2">{r.name}</td>
                <td className="p-2">{r.status}</td>
                <td className="p-2">{r.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
