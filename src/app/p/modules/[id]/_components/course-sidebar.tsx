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
import { useState, useEffect } from "react";
import { useAppData } from "@/components/layouts/AppDataProvider";
import { apiClient } from "@/logic/infra/repos/nodeapi/axios";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

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
        completed?: boolean;
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
  const [lessonProgress, setLessonProgress] = useState<{
    [key: number]: boolean;
  }>({});
  const [updatingProgress, setUpdatingProgress] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    for (const chapter of chapters) {
      for (const lesson of chapter.lessons) {
        setLessonProgress((prev) => ({
          ...prev,
          [lesson.id]: lesson.progression?.completed || false,
        }));
      }
    }
    // console.log('chapters', chapters);
  }, [chapters]);

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

  // Fonction pour mettre à jour la progression d'une leçon
  const updateLessonProgress = async (lessonId: number, completed: boolean) => {
    try {
      setUpdatingProgress((prev) => ({ ...prev, [lessonId]: true }));

      await apiClient.patch(`/lessons/${lessonId}/progression`, {
        completed: completed,
        progress: completed ? 100 : 0,
      });

      setLessonProgress((prev) => ({ ...prev, [lessonId]: completed }));
      toast.success(
        completed
          ? "Leçon marquée comme terminée"
          : "Leçon marquée comme non terminée"
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la progression:", error);
      toast.error("Impossible de mettre à jour la progression");
    } finally {
      setUpdatingProgress((prev) => ({ ...prev, [lessonId]: false }));
    }
  };

  // Fonction pour gérer le clic sur la case à cocher
  const handleProgressToggle = (
    lessonId: number,
    currentCompleted: boolean
  ) => {
    updateLessonProgress(lessonId, !currentCompleted);
  };

  // Charger la progression des leçons au chargement du composant
  // useEffect(() => {
  //   const loadLessonProgress = async () => {
  //     try {
  //       // Charger la progression pour toutes les leçons
  //       for (const chapter of chapters) {
  //         if (chapter.lessons) {
  //           for (const lesson of chapter.lessons) {
  //             try {
  //               const response = await apiClient.get(
  //                 `/lessons/${lesson.id}/progression`
  //               );
  //               const progressData = response.data?.data || response.data;
  //               if (
  //                 progressData &&
  //                 typeof progressData.completed === "boolean"
  //               ) {
  //                 setLessonProgress((prev) => ({
  //                   ...prev,
  //                   [lesson.id]: progressData.completed,
  //                 }));
  //               }
  //             } catch (error) {
  //               // Si pas de progression, considérer comme non terminée
  //               setLessonProgress((prev) => ({ ...prev, [lesson.id]: false }));
  //             }
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Erreur lors du chargement de la progression:", error);
  //     }
  //   };

  //   if (chapters && chapters.length > 0) {
  //     loadLessonProgress();
  //   }
  // }, [chapters]);

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
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
                    {chapter.name}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform text-gray-500 ${
                      openChapters[chapterIndex] ?? true ? "rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>

                <CollapsibleContent className="space-y-1 pl-4 pt-2">
                  {chapter.lessons && chapter.lessons.length > 0 ? (
                    chapter.lessons.map((lesson: any, lessonIndex: number) => {
                      return (
                        <div
                          key={lesson.id}
                          className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-sm cursor-pointer transition-colors ${
                            selectedChapterIndex === chapterIndex &&
                            selectedLessonIndex === lessonIndex
                              ? "bg-teal-50 text-customBg-hover border border-teal-200"
                              : "text-gray-700"
                          }`}
                          onClick={() => {
                            onChapterSelect(chapterIndex);
                            onLessonSelect(lessonIndex);
                          }}
                        >
                          {getLessonIcon(lesson.type)}
                          <span
                            className={`truncate flex-1 ${
                              selectedChapterIndex === chapterIndex &&
                              selectedLessonIndex === lessonIndex
                                ? "text-customBg font-medium"
                                : "text-gray-700"
                            }`}
                          >
                            {lesson.title}
                          </span>
                          <Checkbox
                            // checked={lesson.progression?.completed || false}
                            checked={lessonProgress[lesson.id] || false}
                            onCheckedChange={() =>
                              handleProgressToggle(
                                lesson.id,
                                lessonProgress[lesson.id] || false
                              )
                            }
                            disabled={updatingProgress[lesson.id]}
                            className="flex-shrink-0"
                          />
                        </div>
                      );
                    })
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
