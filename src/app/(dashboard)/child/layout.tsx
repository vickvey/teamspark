"use client";

import React, { useState } from "react";
import Header from "@/components/dashboard/child/dashboard-header";
import Sidebar from "@/components/dashboard/child/sidebar";

export default function ChildDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-linear-to-br from-green-100 to-blue-100 text-gray-800">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      {/* Add a left margin on md+ equal to the sidebar width (w-64) so the fixed sidebar doesn't overlap content */}
      <main className="flex-1 min-h-0 p-4 md:p-8 lg:ml-64 transition-all">
        {/* Header */}
        <Header />
        {/* Dashboard Grid / Children */}
        {children}
      </main>
    </div>
  );
}
