"use client";

import KpiCard from "@/components/KpiCard";
import AdminLayout from "@/app/admin/layout";
import { exams } from "@/lib/mockData/admin";
import { BookOpenIcon } from "@heroicons/react/24/outline";

export default function ExamsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 p-4">
        <h1 className="text-2xl font-bold">Exam Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <KpiCard
            title="Total Exams"
            value={exams.length.toString()}
            icon={<BookOpenIcon className="h-6 w-6" />}
          />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Upcoming Exams
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Subject</th>
                  <th className="px-4 py-2 text-left">Class</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {exams.map((exam: any) => (
                  <tr
                    key={exam.id}
                    className="border-t border-gray-200"
                  >
                    <td className="px-4 py-2">
                      {exam.subject || "Mathematics"}
                    </td>

                    <td className="px-4 py-2">
                      {exam.class || "10-A"}
                    </td>

                    <td className="px-4 py-2">
                      {exam.date || "2026-06-01"}
                    </td>

                    <td className="px-4 py-2">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Scheduled
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}