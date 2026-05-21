"use client";
import React from 'react';
import KpiCard from '@/components/KpiCard';
import { CogIcon } from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const [demoMode, setDemoMode] = React.useState(true);
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="flex items-center space-x-4">
        <label className="text-gray-700 dark:text-gray-200">Demo Mode</label>
        <input
          type="checkbox"
          checked={demoMode}
          onChange={() => setDemoMode(!demoMode)}
          className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">Toggle to simulate real data vs mock data.</p>
    </div>
  );
}
