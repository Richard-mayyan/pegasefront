"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, FileText } from "lucide-react";
import { useState } from "react";

export default function CourseSidebar() {
  const [openChapter1, setOpenChapter1] = useState(true);
  const [openChapter2, setOpenChapter2] = useState(true);

  return (
    <aside className="w-72 bg-white border-r border-gray-200 p-4 flex flex-col overflow-y-auto">
      <div className="space-y-2">
        <Collapsible
          open={openChapter1}
          onOpenChange={setOpenChapter1}
          className="w-full"
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100 text-left font-semibold text-gray-800">
            Chapitre 1: Figma project managment
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openChapter1 ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 pl-4 pt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-sm text-gray-700"
              >
                <FileText className="h-4 w-4 text-gray-500" />
                Introduction au Chapitre
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          open={openChapter2}
          onOpenChange={setOpenChapter2}
          className="w-full"
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100 text-left font-semibold text-gray-800">
            Chapitre 2: Figma project managment
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openChapter2 ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 pl-4 pt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-sm text-gray-700"
              >
                <FileText className="h-4 w-4 text-gray-500" />
                Introduction au Chapitre
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </aside>
  );
}
