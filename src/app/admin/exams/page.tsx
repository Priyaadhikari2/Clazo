"use client";

import KpiCard from '@/components/KpiCard';
import { exams } from '@/lib/mockData/admin';
import { BookOpenIcon } from '@heroicons/react/24/outline';

export default function ExamsPage() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Exam Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard
          title="Total Exams"
          value={exams.length.toString()}
          icon={<BookOpenIcon className="h-6 w-6" />}
        />
        {/* Additional exam table or charts can be added here */}
      </div>
    </div>
  );
}


import KpiCard from '@/components/KpiCard';
import { exams } from '@/lib/mockData/admin';
import { BookOpenIcon } from '@heroicons/react/24/outline';

export default function ExamsPage() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Exam Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard
          title="Total Exams"
          value={exams.length.toString()}
          icon={<BookOpenIcon className="h-6 w-6" />}
        />
      </div>
      {/* Additional exam table or charts can be added here */}
    </div>
  );
}


import KpiCard from '@/components/KpiCard';
import { exams } from '@/lib/mockData/admin';
import { BookOpenIcon } from '@heroicons/react/24/outline';

export default function ExamsPage() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Exam Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard
          title="Total Exams"
          value={exams.length.toString()}
          icon={<BookOpenIcon className="h-6 w-6" />}
        />
      </div>
      {/* Additional exam table or charts can be added here */}
    </div>
  );
}


import KpiCard from '@/components/KpiCard';
import { exams } from '@/lib/mockData/admin';
import { BookOpenIcon } from '@heroicons/react/24/outline';

export default function ExamsPage() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Exam Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard
          title="Total Exams"
          value={exams.length.toString()}
          icon={<BookOpenIcon className="h-6 w-6" />}
        />
      </div>
      {/* Additional exam table or charts can be added here */}
    </div>
  );
}


import KpiCard from '@/components/KpiCard';
import { exams } from '@/lib/mockData/admin';
import { BookOpenIcon } from '@heroicons/react/24/outline';

export default function ExamsPage() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Exam Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard
          title="Total Exams"
          value={exams.length.toString()}
          icon={<BookOpenIcon className="h-6 w-6" />}
        />
      </div>
      {/* Additional exam table or charts can be added here */}
    </div>
  );
}


import KpiCard from '@/components/KpiCard';
import { exams } from '@/lib/mockData/admin';
import { BookOpenIcon } from '@heroicons/react/24/outline';

export default function ExamsPage() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Exam Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard title="Total Exams" value={exams.length.toString()} icon={<BookOpenIcon className="h-6 w-6" />} />
      </div>
      {/* Additional exam table or charts can be added here */}
    </div>
  );
}



  return (
    <AdminLayout>
      <div className="space-y-6 p-4">
        <h1 className="text-2xl font-bold">Exam Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <KpiCard title="Total Exams" value={exams.length} icon={<BookOpenIcon className="h-6 w-6" />} />
        </div>
        {/* Additional exam table or charts can be added here */}
      </div>
    </AdminLayout>
  );
}
