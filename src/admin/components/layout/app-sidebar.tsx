import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavUser } from "./nav-user";
import { NavGroup } from "./nav-group";
import { getsidebarData } from "./data/sidebar-data";
import { useAuth } from "@/components/layouts/AuthProvider";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const context = useAuth();
  if (!context.user) return;

  const sidebarData = getsidebarData(context.user);
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={sidebarData.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
