import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Circle, Plus, Users } from "lucide-react";
import MainSidebar from "./lecon/_components/main-sidedbar";
import MainNavbar from "./lecon/_components/main-navbar";

export default function DashboardLayout({ children }: any) {
  return (
    <SidebarProvider>
      <MainSidebar />
      <SidebarInset className="bg-white">
        <MainNavbar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
