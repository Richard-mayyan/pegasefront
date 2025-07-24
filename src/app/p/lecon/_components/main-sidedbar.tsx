import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Zap, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MainSidebar() {
  return (
    <Sidebar
      side="left"
      collapsible="none"
      className="bg-gray-200 border-r border-gray-300"
    >
      <SidebarHeader className="flex flex-col items-center gap-4 py-4">
        <div className="flex items-center gap-2">
          <Zap className="h-8 w-8 text-teal-600" />
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-1 flex flex-col items-center gap-4 py-4">
        <SidebarMenu className="w-full flex flex-col items-center gap-2">
          <SidebarMenuItem className="w-auto">
            <SidebarMenuButton className="h-16 w-16 rounded-lg bg-white text-gray-700 flex items-center justify-center text-xs font-semibold shadow-sm">
              Logo C1
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="w-auto">
            <SidebarMenuButton className="h-16 w-16 rounded-lg bg-white text-gray-700 flex items-center justify-center text-xs font-semibold shadow-sm">
              Logo C2
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="flex flex-col items-center py-4">
        <Button
          size="icon"
          className="h-16 w-16 rounded-lg bg-white text-gray-700 shadow-sm hover:bg-gray-100"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
