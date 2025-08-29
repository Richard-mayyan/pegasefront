import AreaChartComponent from "./area-chart-component";
import { CommunityEntity, ClassEntity } from "@/logic/domain/entities";
import { apiClient } from "@/logic/infra/repos/nodeapi/axios";
import { useState, useEffect } from "react";

interface MembersMetricsProps {
  community: CommunityEntity;
  // classData: ClassEntity;
}

export default function MembersMetrics({
  community,
}: // classData,
MembersMetricsProps) {
  const [membersData, setMembersData] = useState<any[]>([]);
  const [activeMembersData, setActiveMembersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("classData", community);

  // Récupérer les vraies données de métriques depuis l'API
  useEffect(() => {
    const fetchMembersData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          `/communities/${community.id}/charts/members`
        );

        // L'API renvoie un tableau de 12 valeurs (une pour chaque mois)
        const monthlyData = response.data.data || [];

        // Transformer les données pour le format attendu par le graphique
        const formattedData = monthlyData.map(
          (value: number, index: number) => ({
            month: getMonthName(index),
            value: value,
          })
        );

        // Mettre à jour les données des membres
        setMembersData(formattedData);

        // Pour l'instant, on utilise les mêmes données pour les membres actifs
        // TODO: Adapter quand l'API fournira des données séparées
        setActiveMembersData(formattedData);

        setError(null);
      } catch (err) {
        console.error("Erreur lors de la récupération des métriques:", err);
        setError("Impossible de charger les métriques des membres");

        // Fallback vers des données par défaut en cas d'erreur
        setMembersData([]);
        setActiveMembersData([]);
      } finally {
        setLoading(false);
      }
    };

    if (community.id) {
      fetchMembersData();
    }
  }, [community.id]);

  // Fonction pour obtenir le nom du mois à partir de l'index
  const getMonthName = (monthIndex: number): string => {
    const months = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
    return months[monthIndex] || `Mois ${monthIndex + 1}`;
  };

  // Calculer des statistiques réelles
  // const totalChapters = classData.chapters?.length || 0;
  // const totalLessons =
  //   classData.chapters?.reduce(
  //     (total, chapter) => total + (chapter.lessons?.length || 0),
  //     0
  //   ) || 0;
  // const activeChapters =
  //   classData.chapters?.filter((chapter) => chapter.active).length || 0;

  // const completionRate =
  //   totalChapters > 0 ? Math.round((activeChapters / totalChapters) * 100) : 0;

  // Afficher un message de chargement ou d'erreur si nécessaire
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-lg">
            Chargement des métriques des membres...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <div className="text-gray-600">
            Impossible de charger les données des graphiques
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center gap-8">
      {/* Statistiques de la communauté */}
      {/* <div className="w-full max-w-4xl">
        <div className="p-6 bg-white rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistiques de la communauté</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-customBg">{totalChapters}</div>
              <div className="text-sm text-gray-600">Chapitres</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalLessons}</div>
              <div className="text-sm text-gray-600">Leçons</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{activeChapters}</div>
              <div className="text-sm text-gray-600">Chapitres actifs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{completionRate}%</div>
              <div className="text-sm text-gray-600">Taux de complétion</div>
            </div>
          </div>
        </div>
      </div> */}

      {membersData.length > 0 && (
        <div className="w-full max-w-4xl">
          <AreaChartComponent
            title="Évolution des membres"
            data={membersData}
            id="members"
          />
        </div>
      )}

      {activeMembersData.length > 0 && (
        <div className="w-full max-w-4xl">
          <AreaChartComponent
            title="Membres actifs"
            data={activeMembersData}
            id="active-members"
          />
        </div>
      )}

      {membersData.length === 0 &&
        activeMembersData.length === 0 &&
        !loading &&
        !error && (
          <div className="w-full max-w-4xl text-center py-8">
            <div className="text-gray-500">
              Aucune donnée de métriques disponible
            </div>
          </div>
        )}
    </div>
  );
}
