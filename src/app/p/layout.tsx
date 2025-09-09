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
        <SidebarInset className=" h-full">
          <div className="w-full h-full  flex flex-col">
            <MainNavbar />
            <div className="flex-1  overflow-scroll">{children}</div>
          </div>
          {/* <MainNavbar /> */}
          {/* <div className="w-full  ">{children}</div> */}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
