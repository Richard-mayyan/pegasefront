"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Circle, LogOut, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import { useAppData } from "@/components/layouts/AppDataProvider";
import { useAuth } from "@/components/layouts/AuthProvider";
import { RegisterProfileEnum } from "@/logic/domain/entities";
import { useState } from "react";

interface MainNavbarProps {
  onSidebarToggle?: () => void;
}

export default function MainNavbar({ onSidebarToggle }: MainNavbarProps) {
  const pathname = usePathname();
  const { currentCommunity } = useAppData();
  const { logout, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!currentCommunity || !user) {
    return null;
  }

  const chatItem = {
    label: "Chat",
    href: ROUTES.chat,
    isActive: pathname?.startsWith("/p/chat"),
  };
  const coursItem = {
    label: "Modules",
    href: ROUTES.modules,
    isActive: pathname?.startsWith("/p/modules"),
  };

  let studentItems = [
    chatItem,
    coursItem,
    {
      label: "Communauté",
      href: ROUTES.goToMyCommunity(currentCommunity.id),
      isActive: pathname?.startsWith("/p/myCommunity"),
    },
  ];

  let coachIems = [
    chatItem,
    coursItem,
    {
      label: "Coachings",
      href: ROUTES.coachings,

      isActive: pathname?.startsWith("/p/mescoachings"),
    },
    {
      label: "Calendrier",
      href: ROUTES.calendrier,
      isActive: pathname?.startsWith("/p/calendrier"),
    },
    {
      label: "Membres",
      href: ROUTES.membres,
      isActive: pathname?.startsWith("/p/membres"),
    },
    {
      label: "Communauté",
      href: ROUTES.goToMyCommunity(currentCommunity.id),
      isActive: pathname?.startsWith("/p/myCommunity"),
    },
    // {
    //   label: "Profil",
    //   href: ROUTES.coachProfile,
    //   isActive: pathname?.startsWith("/p/profile"),
    // },
  ];

  let navItems = [];
  if (user.profile === RegisterProfileEnum.Student) {
    navItems = studentItems;
  } else {
    navItems = coachIems;
  }
  return (
    <nav className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-gray-200 bg-white relative">
      {/* Logo/Brand - Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onSidebarToggle}
          className="lg:hidden h-8 w-8"
        >
          <Menu className="h-4 w-4" />
        </Button>
        <div className="text-lg font-bold text-customBg">Pegase</div>
      </div>

      {/* Desktop Navigation - Center */}
      <div className="hidden lg:flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-sm font-medium transition-colors",
              item.isActive
                ? " relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-customBg"
                : "text-gray-400 hover:bg-gray-100"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Desktop User Actions - Right side */}
      <div className="hidden sm:flex items-center gap-4">
        {user.profile === RegisterProfileEnum.Coach && (
          <Link
            href="/p/profile"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-8 w-8 rounded-full border border-gray-300"
            )}
          >
            <User className="h-4 w-4 text-gray-500" />
          </Link>
        )}
        <Button variant="ghost" size="sm" onClick={() => logout()}>
          <LogOut className="h-4 w-4 mr-2" /> Déconnexion
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="h-8 w-8"
        >
          {isMobileMenuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 lg:hidden">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  item.isActive
                    ? "bg-customBg text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-2 mt-2">
              {user.profile === RegisterProfileEnum.Coach && (
                <Link
                  href="/p/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profil
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
