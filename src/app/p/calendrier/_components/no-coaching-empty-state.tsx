import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";

export default function NoCoachingEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-lg shadow-sm">
      <div className="bg-gray-100 p-6 rounded-full mb-6">
        <Users className="h-16 w-16 text-customBg" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Pas de coaching</h3>
      <Button className="bg-customBg hover:bg-customBg-hover text-white px-6 py-3 rounded-lg flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Ajouter un coaching
      </Button>
    </div>
  );
}
