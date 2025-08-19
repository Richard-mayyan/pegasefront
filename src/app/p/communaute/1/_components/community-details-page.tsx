"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CommunityDetailsAbout from "./community-details-about";
import MembersMetrics from "./members-metrics";
import { useAppData } from "@/components/layouts/AppDataProvider";
import { CommunityEntity, ClassEntity } from "@/logic/domain/entities";
import CommunityDetailsStats from "./community-details-stats";
import EditCommunityModal from "./edit-community-modal";
import { toast } from "sonner";
import { communityRepo } from "@/logic/infra/di/container";

export default function CommunityDetailsPage() {
  const [activeTab, setActiveTab] = useState("about"); // 'about', 'stats', 'metrics'
  const { currentCommunity, classes, isLoadingCommunities } = useAppData();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [currentClass, setCurrentClass] = useState<ClassEntity | null>(null);

  useEffect(() => {
    if (classes && classes.length > 0) {
      setCurrentClass(classes[0]);
    } else {
      setCurrentClass(null);
    }
  }, [currentCommunity, classes]);

  const getTabClass = (tabName: string) =>
    cn(
      "px-4 py-2 rounded-lg text-base font-medium",
      activeTab === tabName
        ? "bg-teal-600 text-white"
        : "bg-transparent text-gray-700 hover:bg-gray-100"
    );

  const handleEditCommunity = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveCommunity = async (
    updatedCommunity: Partial<CommunityEntity>
  ) => {
    if (!currentCommunity?.id) {
      toast.error("Impossible de modifier la communauté");
      return;
    }

    try {
      // Utiliser directement communityRepo pour la mise à jour
      await communityRepo.update(currentCommunity.id, updatedCommunity);
      toast.success("Communauté mise à jour avec succès");
      // Recharger les données de la communauté
      // Note: Dans un vrai projet, il faudrait rafraîchir l'état local
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Erreur lors de la mise à jour de la communauté");
      throw error;
    }
  };

  const handleDeleteCommunity = async () => {
    if (!currentCommunity?.id) {
      toast.error("Impossible de supprimer la communauté");
      return;
    }

    try {
      // Utiliser directement communityRepo pour la suppression
      await communityRepo.delete(currentCommunity.id);
      toast.success("Communauté supprimée avec succès");
      // Rediriger vers la page des communautés ou afficher un message
      // Note: Dans un vrai projet, il faudrait rediriger l'utilisateur
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression de la communauté");
    }
  };

  // Si les données sont en cours de chargement
  if (isLoadingCommunities) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-lg text-gray-600">
            Chargement des informations de la communauté...
          </div>
        </div>
      </div>
    );
  }

  // Si aucune communauté ou classe n'est disponible
  if (!currentCommunity || !currentClass) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Aucune communauté disponible
            </h3>
            <p className="text-gray-500">
              Veuillez sélectionner une communauté
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header avec informations de la communauté */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {currentCommunity.name}
              </h1>
              <p className="text-gray-600">
                {classes.length} classe{classes.length > 1 ? "s" : ""}{" "}
                disponible{classes.length > 1 ? "s" : ""}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Communauté créée le</p>
              <p className="text-sm text-gray-700">
                {currentCommunity.createdAt
                  ? new Date(currentCommunity.createdAt).toLocaleDateString(
                      "fr-FR"
                    )
                  : "Non définie"}
              </p>
            </div>
          </div>
          {currentCommunity.description && (
            <p className="text-gray-700">{currentCommunity.description}</p>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 w-fit mx-auto">
          <Button
            onClick={() => setActiveTab("about")}
            className={getTabClass("about")}
          >
            À propos
          </Button>
          <Button
            onClick={() => setActiveTab("stats")}
            className={getTabClass("stats")}
          >
            Statistiques
          </Button>
          <Button
            onClick={() => setActiveTab("metrics")}
            className={getTabClass("metrics")}
          >
            Métriques
          </Button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "about" && (
          <CommunityDetailsAbout
            community={currentCommunity}
            classData={currentClass}
            onEdit={handleEditCommunity}
            onDelete={handleDeleteCommunity}
          />
        )}
        {activeTab === "stats" && (
          <CommunityDetailsStats
            community={currentCommunity}
            classData={currentClass}
          />
        )}
        {activeTab === "metrics" && (
          <MembersMetrics
            community={currentCommunity}
            classData={currentClass}
          />
        )}
      </div>

      {/* Modal d'édition de la communauté */}
      <EditCommunityModal
        community={currentCommunity}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveCommunity}
      />
    </div>
  );
}
