import React from 'react';
import Link from 'next/link';
import { HomeIcon, AcademicCapIcon, UsersIcon, CalendarIcon, ChartBarIcon, CogIcon, BookOpenIcon, TruckIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Teachers', href: '/admin/teachers', icon: AcademicCapIcon },
  { name: 'Students', href: '/admin/students', icon: UsersIcon },
  { name: 'Classes', href: '/admin/classes', icon: CalendarIcon },
  { name: 'Exams', href: '/admin/exams', icon: BookOpenIcon },
  { name: 'Reports', href: '/admin/reports', icon: ChartBarIcon },
  { name: 'Finance', href: '/admin/finance', icon: CurrencyDollarIcon },
  { name: 'Resources', href: '/admin/resources', icon: TruckIcon },
  { name: 'Settings', href: '/admin/settings', icon: CogIcon },
];

export default function AdminSidebar() {
  return (
    <nav className="h-full bg-gray-800 text-white w-64 flex flex-col p-4">
      <div className="mb-8 text-2xl font-semibold text-center">Clazo Admin</div>
      <ul className="space-y-2">
        {navItems.map(item => (
          <li key={item.name}>
            <Link href={item.href} className="flex items-center p-2 rounded hover:bg-gray-700">
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
