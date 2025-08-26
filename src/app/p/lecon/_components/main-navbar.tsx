"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Circle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import { useAppData } from "@/components/layouts/AppDataProvider";

export default function MainNavbar() {
  const pathname = usePathname();
  const { currentCommunity } = useAppData();
  if (!currentCommunity) {
    return null;
  }
  const navItems = [
    {
      label: "Chat",
      href: ROUTES.chat,

      isActive: pathname?.startsWith("/p/chat"),
    },
    {
      label: "Cours",
      href: ROUTES.lecons,
      isActive: pathname?.startsWith("/p/lecon"),
    },
    {
      label: "Coachings",
      href: ROUTES.coachings,

      isActive: pathname?.startsWith("/p/mescoachings"),
    },
    // {
    //   label: "Calendrier",
    //   href: ROUTES.calendrier,
    //   isActive: pathname?.startsWith("/p/calendrier"),
    // },
    // {
    //   label: "Membres",
    //   href: ROUTES.membres,
    //   isActive: pathname?.startsWith("/p/membres"),
    // },
    {
      label: "Communauté",
      href: ROUTES.goToMyCommunity(currentCommunity.id),
      isActive: pathname?.startsWith("/p/myCommunity"),
    },
    {
      label: "Profil",
      href: ROUTES.coachProfile,
      isActive: pathname?.startsWith("/p/profile"),
    },
  ];

  return (
    <nav className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white absolute top-0 left-0 right-0 z-[100]">
      <div className="flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-base font-medium transition-colors",
              item.isActive
                ? "text-teal-600 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-teal-600"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full border border-gray-300"
        >
          <Circle className="h-4 w-4 text-gray-500" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full border border-gray-300"
        >
          <Circle className="h-4 w-4 text-gray-500" />
        </Button>
        <Link
          href="/p/profile"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-8 w-8 rounded-full border border-gray-300"
          )}
        >
          <User className="h-4 w-4 text-gray-500" />
        </Link>
      </div>
    </nav>
  );
}
