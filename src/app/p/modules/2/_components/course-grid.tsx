"use client";
import { PlusIcon, UsersIcon } from "lucide-react";
import CourseCard from "./course-card";
import { useAppData } from "@/components/layouts/AppDataProvider";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import AddCourseForm from "./add-course-form";
import { getPlaceholderImage, IMG_URL, ROUTES } from "@/lib/constants";
import { RegisterProfileEnum } from "@/logic/domain/entities";
import { useAuth } from "@/components/layouts/AuthProvider";
import { useRouter } from "next/navigation";

export default function CourseGrid() {
  const { user } = useAuth();

  const {
    currentCommunity,
    classes,
    isLoadingCommunities,
    loadUserCommunities,
    doIfUpgradeSubscription,
  } = useAppData();
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  const router = useRouter();

  if (!currentCommunity) {
    return <div>Aucune communauté sélectionnée</div>;
  }
  // useEffect(() => {
  //   loadUserCommunities();
  // }, []);

  // Forcer la mise à jour du composant quand du module change
  // useEffect(() => {
  //   if (classData) {
  //     setForceUpdate((prev) => prev + 1);
  //   }
  // }, [classData]);

  // Si les données sont en cours de chargement, afficher un état de chargement
  if (isLoadingCommunities) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
        <div className="text-lg text-gray-600">Chargement des cours...</div>
      </div>
    );
  }

  // Si aucun module n'est disponible, afficher un message
  if (!classes || classes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 text-center py-16">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <UsersIcon className="h-16 w-16 text-customBg" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Créez votre premier module
        </h3>
        {user?.profile === RegisterProfileEnum.Coach && (
          <Button
            onClick={() =>
              doIfUpgradeSubscription(() => router.push(ROUTES.createModule))
            }
            variant={"roam"}
            className="gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            ajouter un module
          </Button>
        )}

        {/* Formulaire d'ajout de cours */}
        <AddCourseForm
          hasDialog={true}
          key={`add-course-${forceUpdate}`}
          isOpen={showAddCourseForm}
          onClose={() => setShowAddCourseForm(false)}
        />
      </div>
    );
  }

  // Afficher directement les classes
  const courses = classes.map((cls) => {
    const totalLessons = (cls.chapters?.reduce(
      (acc, ch) => acc + (ch.lessons?.length || 0),
      0
    ) ?? 0) as number;
    const completedLessons = cls.progression?.lessonsCompleted || 0;
    const progress = cls.progression?.progress || 0;
    return {
      id: cls.id,
      imageUrl: cls.cover || getPlaceholderImage("Cours"),
      title: cls.name,
      dateAdded: new Date(cls.createdAt || new Date()).toLocaleDateString(
        "fr-FR",
        { day: "2-digit", month: "2-digit", year: "numeric" }
      ),
      progress,
      totalLessons: totalLessons || 0,
      completedLessons,
    } as {
      id: any;
      imageUrl: string;
      title: string;
      dateAdded: string;
      progress: number;
      totalLessons: number;
      completedLessons: number;
    };
  });

  return (
    <div className="flex flex-col flex-1 bg-white p-6">
      {/* Header avec statistiques */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Mes Cours</h1>
          <div className="flex gap-2">
            <Button
              variant={"roam"}
              onClick={
                () =>
                  doIfUpgradeSubscription(() =>
                    router.push(ROUTES.createModule)
                  )

                // doIfUpgradeSubscription(() => setShowAddCourseForm(true))
              }
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              ajouter un module
            </Button>
            {/* Bouton de test pour la navigation */}
            {/* {courses.length > 0 && (
              <Button
                onClick={() =>
                  (window.location.href = `/p/modules/${courses[0].id}`)
                }
                variant="outline"
                className="text-xs"
              >
                Test Navigation (1er cours)
              </Button>
            )} */}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-medium">{courses.length}</span>
            <span>chapitre{courses.length > 1 ? "s" : ""}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {courses.reduce(
                (total, course) => total + course.totalLessons,
                0
              )}
            </span>
            <span>
              leçon
              {courses.reduce(
                (total, course) => total + course.totalLessons,
                0
              ) > 1
                ? "s"
                : ""}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {Math.round(
                courses.reduce((total, course) => total + course.progress, 0) /
                  Math.max(courses.length, 1)
              )}
              %
            </span>
            <span>progression moyenne</span>
          </div>
        </div>
      </div>

      {/* Grille des cours */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            imageUrl={course.imageUrl}
            title={course.title}
            dateAdded={course.dateAdded}
            progress={course.progress}
            totalLessons={course.totalLessons}
            completedLessons={course.completedLessons}
          />
        ))}
      </div>

      {/* Indicateur de pagination */}
      <div className="mt-8 flex justify-center">
        <div className="h-3 w-3 rounded-full bg-gray-300" />
      </div>

      {/* Formulaire d'ajout de cours */}
      <AddCourseForm
        hasDialog={true}
        key={`add-course-${forceUpdate}`}
        isOpen={showAddCourseForm}
        onClose={() => setShowAddCourseForm(false)}
      />
    </div>
  );
}
