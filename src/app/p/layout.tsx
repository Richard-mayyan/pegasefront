"use client";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Circle, Plus, Users } from "lucide-react";
import { useAppData } from "@/components/layouts/AppDataProvider";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import MainNavbar from "./_components/main-navbar";
import MainSidebar from "./_components/main-sidedbar";
import { useState } from "react";

export default function DashboardLayout({ children }: any) {
  const { currentCommunity, isLoadingCommunities } = useAppData();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isLoadingCommunities) {
    return <div>Loading...</div>;
  }
  if (!currentCommunity) {
    toast.error("Aucune communauté sélectionné");
    // window.location.href = ROUTES.createCommunity;
    // return redirect(ROUTES.createCommunity);
  }
  return (
    <SidebarProvider>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MainSidebar */}
      <div
        className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          fixed lg:relative
          top-0 left-0 z-50 lg:z-auto
          w-20 h-full
          transition-transform duration-300 ease-in-out
        `}
      >
        <MainSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className="w-full h-screen overflow-scroll relative hide-scrollbar">
        <SidebarInset className="h-full">
          <div className="w-full h-full flex flex-col">
            <MainNavbar onSidebarToggle={() => setIsSidebarOpen(true)} />
            <div className="flex-1 overflow-scroll hide-scrollbar">
              {children}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
