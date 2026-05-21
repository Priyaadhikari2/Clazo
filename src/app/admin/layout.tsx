import React from "react";
import Sidebar from "@/components/AdminSidebar";
import DemoBadge from "@/components/DemoBadge";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto relative">
        <DemoBadge />
        {children}
      </main>
    </div>
  );
}
