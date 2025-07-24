import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Circle, Plus, Users } from "lucide-react";
import React from "react";
import SearchInput from "../_components/searchInput";

type Props = {};

function page({}: Props) {
  return (
    <div className="flex flex-col flex-1 p-6">
      {/* Search and Add Lesson Section */}
      <SearchInput />

      {/* Empty State Section */}
      <div className="flex flex-col items-center justify-center flex-1 text-center py-16">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <Users className="h-16 w-16 text-teal-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Pas de Leçon</h3>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouveau groupe
        </Button>
      </div>
    </div>
  );
}

export default page;
