import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Circle, Plus } from "lucide-react";
import React from "react";

type Props = {};

function SearchInput({}: Props) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="relative flex-1">
        <Input
          placeholder="Rechercher"
          className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-teal-600 focus:border-teal-600"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
        >
          <Circle className="h-4 w-4 text-gray-500" />
        </Button>
      </div>
      <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Ajouter une leçon
      </Button>
    </div>
  );
}

export default SearchInput;
