/* src/app/admin/reports/page.tsx */
"use client";

import KpiCard from '@/components/KpiCard';
import { activityLogs } from '@/lib/mockData/admin';
import { ChartBarIcon, CurrencyDollarIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

export default function ReportsPage() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <KpiCard
          title="Total Activities"
          value={activityLogs.length.toString()}
          icon={<ChartBarIcon className="h-6 w-6" />}
        />
        <KpiCard
          title="Recent Activity"
          value={activityLogs[activityLogs.length - 1]?.action ?? 'N/A'}
          icon={<ChartBarIcon className="h-6 w-6" />}
        />
      </div>
      <section className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Action</th>
              <th className="p-2 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {activityLogs.map((log) => (
              <tr key={log.id} className="border-t">
                <td className="p-2">{log.user}</td>
                <td className="p-2">{log.action}</td>
                <td className="p-2">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}


