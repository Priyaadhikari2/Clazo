"use client";
import AdminLayout from '@/app/admin/layout';
import { classes } from '@/lib/mockData/admin';
import KpiCard from '@/components/KpiCard';

export default function ClassesPage() {
  const total = classes.length;
  const totalSections = classes.reduce((sum, c) => sum + (c.sections?.length || 0), 0);
  return (
    <AdminLayout>
      <div className="space-y-6 p-4">
        <h1 className="text-2xl font-bold">Class & Section Configuration</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KpiCard title="Total Classes" value={total} />
          <KpiCard title="Total Sections" value={totalSections} />
        </div>
      </div>
    </AdminLayout>
  );
}
