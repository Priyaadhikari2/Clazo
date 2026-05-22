"use client";

import AdminLayout from "@/app/admin/layout";
import KpiCard from "@/components/KpiCard";
import { exams } from "@/lib/mockData/admin";
import { BookOpenIcon } from "@heroicons/react/24/outline";

export default function ExamsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 p-4">
        <h1 className="text-2xl font-bold">
          Exam Management
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <KpiCard
            title="Total Exams"
            value={String(exams.length)}
            icon={<BookOpenIcon className="h-6 w-6" />}
          />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Upcoming Exams
          </h2>

          <table className="w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Class</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {exams.map((exam: any, index: number) => (
                <tr
                  key={index}
                  className="border-t"
                >
                  <td className="p-3">
                    {exam.subject || "Mathematics"}
                  </td>

                  <td className="p-3">
                    {exam.class || "10-A"}
                  </td>

                  <td className="p-3">
                    {exam.date || "2026-06-01"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}