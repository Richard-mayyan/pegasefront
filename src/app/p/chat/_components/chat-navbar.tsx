"use client";
import { useChatData } from "@/components/layouts/ChatDataProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Building,
  Search,
  Bell,
  Zap,
  User,
  PinIcon,
  FilterIcon,
} from "lucide-react";

export default function ChatNavbar() {
  const {
    currentChatGroup,
    chatGroups,
    messages,
    setCurrentChatGroup,
    sendMessage,
    likeMessage,
    isLoading,
  } = useChatData();

  if (!currentChatGroup) return null;
  return (
    <div className="bg-white border-b border-gray-200 p-4 absolute top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              currentChatGroup.color === "blue"
                ? "bg-blue-600"
                : currentChatGroup.color === "green"
                ? "bg-green-600"
                : currentChatGroup.color === "purple"
                ? "bg-purple-600"
                : currentChatGroup.color === "orange"
                ? "bg-orange-600"
                : "bg-gray-600"
            }`}
          >
            <Building className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              {currentChatGroup.name}
            </h1>
            <p className="text-gray-600">{currentChatGroup.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <PinIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <FilterIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
    // <nav className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white">
    //   <div className="flex items-center gap-3">
    //     <Building className="h-6 w-6 text-gray-700" />
    //     <span className="text-xl font-bold">Open Space</span>
    //   </div>
    //   <div className="flex-1 max-w-md mx-4 relative">
    //     <Input
    //       placeholder="Chercher"
    //       className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-customBg focus:border-customBg"
    //     />
    //     <Button
    //       variant="ghost"
    //       size="icon"
    //       className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
    //     >
    //       <Search className="h-4 w-4 text-gray-500" />
    //       <span className="sr-only">Search</span>
    //     </Button>
    //   </div>
    //   <div className="flex items-center gap-4">
    //     <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
    //       <Bell className="h-5 w-5 text-gray-500" />
    //       <span className="sr-only">Notifications</span>
    //     </Button>
    //     <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
    //       <Zap className="h-5 w-5 text-gray-500" />
    //       <span className="sr-only">Activity</span>
    //     </Button>
    //     <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
    //       <User className="h-5 w-5 text-gray-500" />
    //       <span className="sr-only">Profile</span>
    //     </Button>
    //   </div>
    // </nav>
  );
}
