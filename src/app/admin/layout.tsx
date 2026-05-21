"use client";
import React from "react";
import AdminSidebar from "@/components/AdminSidebar";
import DemoBadge from "@/components/DemoBadge";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto relative">
        <div className="absolute top-4 right-4">
          <DemoBadge />
        </div>
        {children}
      </main>
    </div>
  );
}
