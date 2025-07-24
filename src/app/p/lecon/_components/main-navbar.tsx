import { Button } from "@/components/ui/button";
import { Circle, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MainNavbar() {
  return (
    <nav className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          className="text-base font-medium text-gray-700 hover:bg-gray-100"
        >
          Chat
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "text-base font-medium text-teal-600 relative",
            "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-teal-600"
          )}
        >
          Leçons
        </Button>
        <Button
          variant="ghost"
          className="text-base font-medium text-gray-700 hover:bg-gray-100"
        >
          Coachings
        </Button>
        <Button
          variant="ghost"
          className="text-base font-medium text-gray-700 hover:bg-gray-100"
        >
          Calendrier
        </Button>
        <Button
          variant="ghost"
          className="text-base font-medium text-gray-700 hover:bg-gray-100"
        >
          Membres
        </Button>
        <Button
          variant="ghost"
          className="text-base font-medium text-gray-700 hover:bg-gray-100"
        >
          Ma classe
        </Button>
        <Button
          variant="ghost"
          className="text-base font-medium text-gray-700 hover:bg-gray-100"
        >
          Options
        </Button>
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
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full border border-gray-300"
        >
          <User className="h-4 w-4 text-gray-500" />
        </Button>
      </div>
    </nav>
  );
}
