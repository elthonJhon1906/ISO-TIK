import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { BaseSidebar } from "@/components/sidebar";
import { AdminSidebarContent } from "./AdminSidebarContent";
import { AdminNavbar } from "./AdminNavbar";

export function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <BaseSidebar title="Admin" subtitle="Sistem TIK">
        <AdminSidebarContent />
      </BaseSidebar>

      <SidebarInset className="bg-[#dce2ee]">
        <AdminNavbar />
        <div className="p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
