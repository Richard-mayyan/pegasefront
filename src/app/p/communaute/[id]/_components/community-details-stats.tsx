import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IMG_URL } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { CommunityEntity, ClassEntity } from "@/logic/domain/entities";
import { apiClient } from "@/logic/infra/repos/nodeapi/axios";
import { useState, useEffect } from "react";

interface CommunityDetailsStatsProps {
  community: CommunityEntity;
  // classData: ClassEntity;
}

export default function CommunityDetailsStats({
  community,
}: // classData,
CommunityDetailsStatsProps) {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculer les statistiques réelles basées sur les données
  // const totalChapters = classData.chapters?.length || 0;
  // const totalLessons =
  //   classData.chapters?.reduce(
  //     (total, chapter) => total + (chapter.lessons?.length || 0),
  //     0
  //   ) || 0;

  // Calculer la progression (pour l'instant, on considère qu'aucune leçon n'est terminée)
  const completedLessons = 0;
  // const progressPercentage =
  //   totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Récupérer les vraies données d'abonnements et de revenus depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Récupérer les abonnements
        const subscriptionsResponse = await apiClient.get(
          `/communities/${community.id}/subscriptions`
        );
        setSubscriptions(subscriptionsResponse.data.data || []);

        // Récupérer les revenus
        const revenueResponse = await apiClient.get(
          `/communities/${community.id}/revenus`
        );
        setTotalRevenue(revenueResponse.data.data.revenue || 0);

        setError(null);
      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
        setError("Impossible de charger les données");
        setSubscriptions([]);
        setTotalRevenue(0);
      } finally {
        setLoading(false);
      }
    };

    if (community.id) {
      fetchData();
    }
  }, [community.id]);

  // Nombre total d'étudiants (basé sur les souscriptions)
  const totalStudents = subscriptions.length;

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      {/* Summary Cards - Revenu total et Nombre d'étudiants */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Revenu total</p>
          <h3 className="text-3xl font-bold text-gray-800">
            {formatPrice(totalRevenue)}
          </h3>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Nombre d'étudiant</p>
          <h3 className="text-3xl font-bold text-gray-800">
            {community.studentCount}
          </h3>
        </div>
      </div>

      {/* Table des dernières souscriptions */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Dernières souscriptions
      </h2>

      {loading && (
        <div className="text-center py-8">
          <div className="text-gray-500">Chargement des abonnements...</div>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <div className="text-red-500">{error}</div>
        </div>
      )}

      {!loading && !error && subscriptions.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-500">Aucun abonnement trouvé</div>
        </div>
      )}

      {!loading && !error && subscriptions.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="text-sm text-gray-500 border-b border-gray-200">
                <th className="py-2 pr-4 font-medium">Date</th>
                <th className="py-2 px-4 font-medium">Intitulé</th>
                <th className="py-2 px-4 font-medium">Nom</th>
                <th className="py-2 pl-4 font-medium text-right">Montant</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <td className="py-3 pr-4 text-sm text-gray-700">
                    {sub.createdAt
                      ? new Date(sub.createdAt).toLocaleDateString("fr-FR")
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {sub.className || sub.title || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          className="object-cover"
                          src={
                            sub.user?.avatar || sub.avatar || "/placeholder.svg"
                          }
                          alt={sub.user?.name || sub.name || "Utilisateur"}
                        />
                        <AvatarFallback>
                          {(sub.user?.name || sub.name || "U").charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {sub.user?.name || sub.name || "N/A"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {sub.user?.email || sub.handle || "N/A"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pl-4 text-sm text-gray-700 text-right">
                    {sub.amount === 0 || sub.amount === "0"
                      ? "Gratuit"
                      : formatPrice(sub.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Informations supplémentaires de la classe */}
      {/* <div className="mt-8 p-4 bg-teal-50 rounded-lg border border-teal-200">
        <h3 className="text-lg font-semibold text-customBg-augmented mb-4">
          Informations de la classe
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-customBg font-medium">Nom:</span>
            <p className="text-customBg-augmented">{classData.name}</p>
          </div>
          <div>
            <span className="text-customBg font-medium">Chapitres:</span>
            <p className="text-customBg-augmented">{totalChapters}</p>
          </div>
          <div>
            <span className="text-customBg font-medium">Leçons:</span>
            <p className="text-customBg-augmented">{totalLessons}</p>
          </div>
          <div>
            <span className="text-customBg font-medium">Progression:</span>
            <p className="text-customBg-augmented">{progressPercentage}%</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
