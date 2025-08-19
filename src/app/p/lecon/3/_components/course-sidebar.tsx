"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  FileText,
  Play,
  CheckCircle,
  Users,
  Building2,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useAppData } from "@/components/layouts/AppDataProvider";

interface Community {
  id: number;
  name: string;
  description?: string;
  classes?: Array<{
    id: number;
    name: string;
    chapters?: Array<{
      id: number;
      name: string;
      lessons?: Array<{
        id: number;
        title: string;
        type: string;
        content: any;
      }>;
    }>;
  }>;
}

interface CourseSidebarProps {
  chapters: any[];
  selectedChapterIndex: number;
  selectedLessonIndex: number;
  onChapterSelect: (index: number) => void;
  onLessonSelect: (index: number) => void;
  selectedCommunityIndex: number;
  selectedClassIndex: number;
  onCommunitySelect: (index: number) => void;
  onClassSelect: (index: number) => void;
}

export default function CourseSidebar({
  chapters,
  selectedChapterIndex,
  selectedLessonIndex,
  onChapterSelect,
  onLessonSelect,
  selectedCommunityIndex,
  selectedClassIndex,
  onCommunitySelect,
  onClassSelect,
}: CourseSidebarProps) {
  const { currentCommunity, communities } = useAppData();
  const [openChapters, setOpenChapters] = useState<{ [key: number]: boolean }>(
    {}
  );

  // Fonction pour obtenir l'icône de la leçon
  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4 text-red-500" />;
      case "audio":
        return <Play className="h-4 w-4 text-blue-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  // Fonction pour basculer l'ouverture d'un chapitre
  const toggleChapter = (index: number) => {
    setOpenChapters((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      {/* Sélecteur de communauté */}
      {/* <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
          Communautés
        </h3>

        {communities && communities.length > 0 ? (
          <div className="space-y-2">
            {communities.map((comm, index) => (
              <button
                key={comm.id}
                onClick={() => onCommunitySelect(index)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                  selectedCommunityIndex === index
                    ? "bg-teal-100 border-2 border-teal-300 text-teal-800 shadow-sm"
                    : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    selectedCommunityIndex === index 
                      ? "bg-teal-500" 
                      : "bg-gray-400"
                  }`} />
                  <div className="flex flex-col">
                    <span className="font-medium text-sm truncate max-w-[140px]">
                      {comm.name}
                    </span>
                    {comm.description && (
                      <span className="text-xs text-gray-500 truncate max-w-[140px]">
                        {comm.description}
                      </span>
                    )}
                  </div>
                </div>
                {selectedCommunityIndex === index && (
                  <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic">
            Aucune communauté disponible
          </div>
        )}
      </div> */}

      {/* Sélecteur de classe */}
      {/* {community && community.classes && community.classes.length > 0 && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Classes de {community.name}
          </h4>
          
          <div className="space-y-2">
            {community.classes.map((cls, index) => (
              <button
                key={cls.id}
                onClick={() => onClassSelect(index)}
                className={`w-full flex items-center justify-between p-2 rounded-md text-left transition-all duration-200 ${
                  selectedClassIndex === index
                    ? "bg-blue-100 border border-blue-300 text-blue-800"
                    : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-blue-500" />
                  <span className="font-medium text-sm truncate max-w-[160px]">
                    {cls.name}
                  </span>
                </div>
                {selectedClassIndex === index && (
                  <ChevronRight className="h-4 w-4 text-blue-600 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )} */}

      {/* Contenu du cours (chapitres et leçons) */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Contenu du cours
        </h4>

        <div className="space-y-2">
          {chapters && chapters.length > 0 ? (
            chapters.map((chapter, chapterIndex) => (
              <Collapsible
                key={chapter.id}
                open={openChapters[chapterIndex] ?? true}
                onOpenChange={() => toggleChapter(chapterIndex)}
                className="w-full"
              >
                <CollapsibleTrigger
                  className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100 text-left font-medium text-gray-800 transition-colors"
                  onClick={() => onChapterSelect(chapterIndex)}
                >
                  <span className="truncate flex-1 text-left">
                    Chapitre {chapterIndex + 1}: {chapter.name}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform text-gray-500 ${
                      openChapters[chapterIndex] ?? true ? "rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>

                <CollapsibleContent className="space-y-1 pl-4 pt-2">
                  {chapter.lessons && chapter.lessons.length > 0 ? (
                    chapter.lessons.map((lesson: any, lessonIndex: number) => (
                      <div
                        key={lesson.id}
                        className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-sm cursor-pointer transition-colors ${
                          selectedChapterIndex === chapterIndex &&
                          selectedLessonIndex === lessonIndex
                            ? "bg-teal-50 text-teal-700 border border-teal-200"
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          onChapterSelect(chapterIndex);
                          onLessonSelect(lessonIndex);
                        }}
                      >
                        {getLessonIcon(lesson.type)}
                        <span className="truncate flex-1">{lesson.title}</span>
                        {selectedChapterIndex === chapterIndex &&
                          selectedLessonIndex === lessonIndex && (
                            <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0" />
                          )}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-400 italic pl-2">
                      Aucune leçon disponible
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>
            ))
          ) : (
            <div className="text-sm text-gray-400 italic text-center py-4">
              Aucun chapitre disponible dans ce cours
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
