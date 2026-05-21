import React from "react";

/**
 * Simple badge indicating the application is running in Demo/Mock mode.
 * Used across the admin layout and other pages.
 */
export default function DemoBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-300">
      Demo Mode
    </span>
  );
}
