import { ResponsiveSidebar } from "../components/responsive-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <ResponsiveSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}