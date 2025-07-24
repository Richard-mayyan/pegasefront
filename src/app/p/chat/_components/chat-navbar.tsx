import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building, Search, Bell, Zap, User } from "lucide-react";

export default function ChatNavbar() {
  return (
    <nav className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <Building className="h-6 w-6 text-gray-700" />
        <span className="text-xl font-bold">Open Space</span>
      </div>
      <div className="flex-1 max-w-md mx-4 relative">
        <Input
          placeholder="Chercher"
          className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-teal-600 focus:border-teal-600"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
        >
          <Search className="h-4 w-4 text-gray-500" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <Zap className="h-5 w-5 text-gray-500" />
          <span className="sr-only">Activity</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <User className="h-5 w-5 text-gray-500" />
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </nav>
  );
}
