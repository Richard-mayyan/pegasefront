"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Plus, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAppData } from "@/components/layouts/AppDataProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export default function MainSidebar() {
  const { currentCommunity, communities, setCommunity } = useAppData();
  const [hoveredCommunity, setHoveredCommunity] = useState<number | null>(null);

  const handleCommunitySelect = (selectedCommunity: any) => {
    setCommunity(selectedCommunity);
  };

  const router = useRouter();
  return (
    <Sidebar
      side="left"
      collapsible="none"
      className="bg-gray-100 border-r border-gray-300 w-20 h-screen sticky top-0 overflow-hidden z-30"
    >
      <SidebarHeader className="flex flex-col items-center gap-4 py-4">
        <div className="flex items-center gap-2">
          {/* Logo Pegasus - cheval ailé */}
          <img src="/logo.svg" alt="Pegasus Logo" className="w-12 h-12" />
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 flex flex-col items-center gap-3 py-4">
        <SidebarMenu className="w-full flex flex-col items-center gap-2">
          {communities && communities.length > 0 ? (
            communities.map((comm, index) => (
              <SidebarMenuItem key={comm.id} className="w-auto relative">
                <SidebarMenuButton
                  style={{
                    // borderWidth: "2px",
                    // borderColor: "green",
                    // borderColor:
                    //   currentCommunity?.id === comm.id
                    //     ? comm.color
                    //     : "transparent",
                    backgroundColor: comm.color,
                    backgroundImage: `url(${comm.images?.[0]?.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className={`h-12 w-12 rounded-lg border-2 transition-all duration-200 flex items-center justify-center text-xs font-semibold shadow-sm ${
                    currentCommunity?.id === comm.id
                      ? ` border-customBg text-white shadow-md`
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                  }`}
                  onClick={() => handleCommunitySelect(comm)}
                  onMouseEnter={() => setHoveredCommunity(index)}
                  onMouseLeave={() => setHoveredCommunity(null)}
                >
                  {/* {comm.name.charAt(0).toUpperCase()}
                  {comm.name.charAt(1)?.toUpperCase() || ""} */}
                </SidebarMenuButton>

                {/* Indicateur de sélection */}
                {currentCommunity?.id === comm.id && (
                  <div className="absolute -right-1 -top-1 w-3 h-3 bg-teal-500 rounded-full border-2 border-white shadow-sm" />
                )}

                {/* Tooltip au survol */}
                {hoveredCommunity === index && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-50">
                    {comm.name}
                    {comm.description && (
                      <div className="text-gray-300 text-xs mt-1 max-w-32">
                        {comm.description}
                      </div>
                    )}
                  </div>
                )}
              </SidebarMenuItem>
            ))
          ) : (
            <div className="text-center text-gray-500 text-xs px-2">
              Aucune communauté
            </div>
          )}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="flex flex-col items-center py-4">
        <Button
          onClick={() => router.push(ROUTES.createCommunity)}
          size="icon"
          className="h-12 w-12 rounded-lg bg-gray-300 text-gray-700 shadow-sm hover:bg-gray-400"
          title="Ajouter une communauté"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
