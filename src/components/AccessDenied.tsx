import React from "react";
import { currentUser } from "@/lib/mockAuth";

export default function AccessDenied() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">Access Denied</h1>
    </div>
  );
}
