"use client";

import { useState, useEffect } from "react";
import { useAppData } from "@/components/layouts/AppDataProvider";
import AIAssistantPanel from "./ai-assistant-panel";
import CourseHeader from "./course-header";
import CourseSidebar from "./course-sidebar";
import LessonPlayer from "./lesson-player";
import { useParams } from "next/navigation";

export default function CoursePlayerLayout() {
  const params = useParams();
  const courseId = params.id as string;

  const {
    currentCommunity,
    communities,
    isLoadingCommunities,
    setCommunity,
    setClasses,
    classes,
  } = useAppData();
  const [selectedCommunityIndex, setSelectedCommunityIndex] = useState(0);
  const [selectedClassIndex, setSelectedClassIndex] = useState(0);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);

  // Trouver du module correspondant à l'ID de l'URL
  const currentClass =
    classes.find((cls) => cls.id?.toString() === courseId) || classes[0];

  // Mettre à jour les indices quand la communauté ou classe change
  useEffect(() => {
    if (communities && communities.length > 0) {
      const currentCommunityIndex = communities.findIndex(
        (c) => c.id === currentCommunity?.id
      );
      if (currentCommunityIndex !== -1) {
        setSelectedCommunityIndex(currentCommunityIndex);
      }
    }
  }, [currentCommunity, communities]);

  // Mettre à jour l'index de du module sélectionnée
  useEffect(() => {
    if (classes && currentClass) {
      const classIndex = classes.findIndex((cls) => cls.id === currentClass.id);
      if (classIndex !== -1) {
        setSelectedClassIndex(classIndex);
      }
    }
  }, [classes, currentClass]);

  // Si les données sont en cours de chargement
  if (isLoadingCommunities) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-gray-600">Chargement du cours...</div>
      </div>
    );
  }

  // Si aucune communauté n'est disponible
  if (!communities || communities.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Aucune communauté disponible
          </h3>
          <p className="text-gray-500">
            Commencez par créer une communauté dans l'onboarding
          </p>
        </div>
      </div>
    );
  }

  // Si aucun module n'est disponible ou si du module demandée n'existe pas
  if (
    !classes ||
    !currentClass ||
    !currentClass.chapters ||
    currentClass.chapters.length === 0
  ) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Cours non trouvé ou aucun contenu disponible
          </h3>
          <p className="text-gray-500">
            Le cours demandé (ID: {courseId}) n'existe pas ou n'a pas de contenu
          </p>
        </div>
      </div>
    );
  }

  const selectedChapter = currentClass.chapters[selectedChapterIndex];
  const selectedLesson = selectedChapter?.lessons?.[selectedLessonIndex];

  // Calculer la progression globale
  const totalLessons = currentClass.progression?.totalLessons || 0;
  const completedLessons = currentClass.progression?.lessonsCompleted || 0; // Pour l'instant, on considère qu'aucune leçon n'est terminée
  const progress = currentClass.progression?.progress || 0;

  return (
    <div className="flex">
      <div className="flex-1">
        <CourseHeader
          courseTitle={currentClass.name}
          progress={progress}
          totalLessons={totalLessons}
          completedLessons={completedLessons}
        />

        <div className="flex">
          <div className="flex h-screen overflow-hidden">
            <CourseSidebar
              chapters={currentClass.chapters}
              selectedChapterIndex={selectedChapterIndex}
              selectedLessonIndex={selectedLessonIndex}
              onChapterSelect={setSelectedChapterIndex}
              onLessonSelect={setSelectedLessonIndex}
              selectedCommunityIndex={selectedCommunityIndex}
              selectedClassIndex={selectedClassIndex}
              onCommunitySelect={() => {}}
              onClassSelect={() => {}}
            />
            <div className="flex flex-col flex-1">
              <div className="flex flex-1 overflow-hidden">
                {selectedChapter &&
                selectedChapter.id !== undefined &&
                selectedLesson &&
                selectedLesson.id !== undefined ? (
                  <LessonPlayer
                    chapter={{
                      ...selectedChapter,
                      id: selectedChapter.id ?? 0, // fallback to 0 if undefined
                    }}
                    lessonId={selectedLesson.id ?? 0}
                    chapterIndex={selectedChapterIndex}
                    lessonIndex={selectedLessonIndex}
                  />
                ) : (
                  <div className="flex flex-1 items-center justify-center text-gray-500">
                    Aucune leçon sélectionnée
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton pour ouvrir/fermer le panel AI */}
      <button
        onClick={() => setIsAIPanelOpen(!isAIPanelOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isAIPanelOpen
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-teal-500 hover:bg-customBg text-white"
        }`}
        title={
          isAIPanelOpen ? "Fermer l'assistant AI" : "Ouvrir l'assistant AI"
        }
      >
        {isAIPanelOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {/* Panel AI avec animation */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isAIPanelOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        <AIAssistantPanel />
      </div>
    </div>
  );
}

// import React from "react";

// type Props = {};

// function CoursePlayerLayout({}: Props) {
//   return <div>CoursePla</div>;
// }

// export default CoursePlayerLayout;
