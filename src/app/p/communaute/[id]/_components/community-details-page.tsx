"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CommunityDetailsAbout from "./community-details-about";
import MembersMetrics from "./members-metrics";
import { useAppData } from "@/components/layouts/AppDataProvider";
import {
  CommunityEntity,
  ClassEntity,
  RegisterProfileEnum,
} from "@/logic/domain/entities";
import CommunityDetailsStats from "./community-details-stats";
import EditCommunityModal from "./edit-community-modal";
import { toast } from "sonner";
import { communityRepo } from "@/logic/infra/di/container";
import { useParams } from "next/navigation";
import { useAuth } from "@/components/layouts/AuthProvider";

export default function CommunityDetailsPage() {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("about"); // 'about', 'stats', 'metrics'
  const { classes, isLoadingCommunities } = useAppData();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // const [currentClass, setCurrentClass] = useState<ClassEntity | null>(null);
  const [community, setCommunity] = useState<CommunityEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const load = async () => {
      try {
        if (params?.id) {
          const data = await communityRepo.findOne(params.id);
          console.log("data", data);
          setCommunity(data);
        }
      } catch (e) {
        toast.error("Impossible de récupérer la communauté");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params?.id]);

  // useEffect(() => {
  //   if (classes && classes.length > 0) {
  //     setCurrentClass(classes[0]);
  //   } else {
  //     setCurrentClass(null);
  //   }
  // }, [classes]);

  const getTabClass = (tabName: string) =>
    cn(
      "px-4 py-2 rounded-lg text-base font-medium",
      activeTab === tabName
        ? "bg-customBg text-white"
        : "bg-transparent text-gray-700 hover:bg-gray-100"
    );

  const handleEditCommunity = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveCommunity = async (updatedCommunity: Partial<any>) => {
    if (!community?.id) {
      toast.error("Impossible de modifier la communauté");
      return;
    }

    try {
      await communityRepo.update(community.id, {
        ...(updatedCommunity as any),
      });
      const refreshed = await communityRepo.findOne(community.id);
      setCommunity(refreshed);
      toast.success("Communauté mise à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Erreur lors de la mise à jour de la communauté");
      throw error;
    }
  };

  const handleDeleteCommunity = async () => {
    if (!community?.id) {
      toast.error("Impossible de supprimer la communauté");
      return;
    }

    try {
      await communityRepo.delete(community.id);
      toast.success("Communauté supprimée avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression de la communauté");
    }
  };

  // Chargement
  if (isLoadingCommunities || loading) {
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
  if (!community) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Communauté introuvable
            </h3>
            <p className="text-gray-500">
              Vérifiez l'URL ou réessayez plus tard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Tab Navigation */}
        {user?.profile === RegisterProfileEnum.Coach && (
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
        )}
        {/* Header avec informations de la communauté */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {community.name}
              </h1>
              <p className="text-gray-600">
                {classes.length} classe{classes.length > 1 ? "s" : ""}{" "}
                disponible{classes.length > 1 ? "s" : ""}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Communauté créée le</p>
              <p className="text-sm text-gray-700">
                {community.createdAt
                  ? new Date(community.createdAt).toLocaleDateString("fr-FR")
                  : "Non définie"}
              </p>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "about" && (
          <CommunityDetailsAbout
            community={community}
            // classData={currentClass}
            onEdit={handleEditCommunity}
            onDelete={handleDeleteCommunity}
          />
        )}
        {activeTab === "stats" && (
          <CommunityDetailsStats
            community={community}
            // classData={currentClass}
          />
        )}
        {activeTab === "metrics" && (
          <MembersMetrics
            community={community}
            //  classData={currentClass}
          />
        )}
      </div>

      {/* Modal d'édition de la communauté */}
      <EditCommunityModal
        community={community}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveCommunity}
      />
    </div>
  );
}
