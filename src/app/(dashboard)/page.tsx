"use client";
import React from "react"
import { ResponsiveSidebar } from "../components/responsive-sidebar"
import ProfilePage from "./profile/page"


export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <ResponsiveSidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto space-y-12">
        <ProfilePage />
      </div>
    </div>
  )
}