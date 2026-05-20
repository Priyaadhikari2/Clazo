"use client";

import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Menu, X, BookOpen, Settings, User, Sparkles, Users, Shield, LayoutDashboard, ClipboardList, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { isMockMode } from "@/lib/mockMode";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

function getNavItems(role: string | undefined): NavItem[] {
  switch (role) {
    case "teacher":
      return [
        { label: "Dashboard", href: "/teacher/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
        { label: "Materials", href: "/teacher/materials", icon: <FileText className="h-5 w-5" /> },
        { label: "Assignments", href: "/teacher/assignments", icon: <ClipboardList className="h-5 w-5" /> },
      ];
    case "student":
      return [
        { label: "Dashboard", href: "/student/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
        { label: "My Materials", href: "/student/materials", icon: <BookOpen className="h-5 w-5" /> },
        { label: "My Assignments", href: "/student/assignments", icon: <ClipboardList className="h-5 w-5" /> },
        { label: "AI Tutor", href: "/student/tutor", icon: <Sparkles className="h-5 w-5" />, highlight: true },
      ];
    case "parent":
      return [
        { label: "Dashboard", href: "/parent/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
        { label: "My Children", href: "/parent/children", icon: <Users className="h-5 w-5" /> },
      ];
    case "admin":
      return [
        { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
        { label: "Users", href: "/admin/users", icon: <Shield className="h-5 w-5" /> },
      ];
    default:
      return [];
  }
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { profile, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      if (isMockMode()) {
        localStorage.removeItem("clazo_mock_profile");
        window.location.href = "/";
        return;
      }
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) return null;

  const navItems = getNavItems(profile?.role);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
            <Image src="/logo.png" alt="Clazo Logo" width={100} height={32} className="h-8 w-auto" />
            <button 
              className="ml-auto lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    item.highlight
                      ? isActive
                        ? "text-purple-800 bg-purple-100 dark:text-purple-200 dark:bg-purple-900/50"
                        : "text-purple-700 bg-purple-50 hover:bg-purple-100 dark:text-purple-300 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 mt-4 border border-purple-100 dark:border-purple-800"
                      : isActive
                        ? "text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className={`mr-3 ${isActive ? 'text-current' : 'text-gray-400'}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4 px-2">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-full mr-3">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{profile?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{profile?.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top header */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="ml-auto flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
