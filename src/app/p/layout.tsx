"use client";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Circle, Plus, Users } from "lucide-react";
import MainSidebar from "./lecon/_components/main-sidedbar";
import MainNavbar from "./lecon/_components/main-navbar";
import { useAppData } from "@/components/layouts/AppDataProvider";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export default function DashboardLayout({ children }: any) {
  const { currentCommunity, isLoadingCommunities } = useAppData();

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
      <MainSidebar />
      <div className="w-full h-screen  overflow-scroll relative ">
        <SidebarInset className="bg-white">
          <MainNavbar />
          <div className="w-full  overflow-scroll pt-[70px]">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
