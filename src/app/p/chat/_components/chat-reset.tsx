import { Button } from "@/components/ui/button";
import { Building, Plus } from "lucide-react";

export default function ChatSidebar() {
  return (
    <aside className="w-64 bg-gray-100 border-r border-gray-200 flex flex-col p-4">
      <div className="flex-1 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-lg font-semibold text-gray-800 relative py-3 px-4 rounded-lg bg-white shadow-sm hover:bg-gray-50"
        >
          <Building className="h-5 w-5 mr-2 text-gray-700" />
          Open Space
          <span className="absolute top-2 right-2 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs">
            2
          </span>
        </Button>
      </div>
      <div className="mt-auto pt-4">
        <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg flex items-center justify-center gap-2">
          <Plus className="h-4 w-4" />
          Nouveau groupe
        </Button>
      </div>
    </aside>
  );
}
