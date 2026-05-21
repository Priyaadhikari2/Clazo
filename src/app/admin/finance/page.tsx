"use client";
import React from 'react';
import KpiCard from '@/components/KpiCard';
import { finance } from '@/lib/mockData/admin';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

export default function FinancePage() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Finance Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Fees Collected" value={`$${finance.totalFeesCollected}`} icon={<CurrencyDollarIcon className="h-6 w-6" />} />
        <KpiCard title="Pending Fees" value={`$${finance.pendingFees}`} icon={<CurrencyDollarIcon className="h-6 w-6" />} />
        <KpiCard title="Expenses" value={`$${finance.totalExpenses}`} icon={<CurrencyDollarIcon className="h-6 w-6" />} />
        <KpiCard title="Net Revenue" value={`$${finance.netRevenue}`} icon={<CurrencyDollarIcon className="h-6 w-6" />} />
      </div>
      <section className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {finance.transactions.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="p-2">{t.id}</td>
                <td className="p-2">{t.type}</td>
                <td className="p-2">${t.amount}</td>
                <td className="p-2">{t.date}</td>
                <td className="p-2">{t.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
