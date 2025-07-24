"use client";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SearchProvider } from "./context/search-context";
import { AppSidebar } from "./layout/app-sidebar";
import SkipToMain from "./skip-to-main";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = cookies();
  const sidebarState = cookieStore.get("sidebar:state");
  const defaultOpen = sidebarState?.value !== "false";

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar />
        <div
          id="content"
          className={cn(
            "max-w-full w-full ml-auto",
            "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon))]",
            "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
            "transition-[width] ease-linear duration-200",
            "h-svh flex flex-col"
          )}
        >
          {children}
        </div>
      </SidebarProvider>
    </SearchProvider>
  );
}
