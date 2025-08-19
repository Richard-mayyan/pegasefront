import AreaChartComponent from "./area-chart-component";
import { CommunityEntity, ClassEntity } from "@/logic/domain/entities";

interface MembersMetricsProps {
  community: CommunityEntity;
  classData: ClassEntity;
}

export default function MembersMetrics({
  community,
  classData,
}: MembersMetricsProps) {
  // Générer des données de métriques basées sur les vraies données
  const generateMembersData = () => {
    const data = [];
    const totalChapters = classData.chapters?.length || 0;
    const totalLessons =
      classData.chapters?.reduce(
        (total, chapter) => total + (chapter.lessons?.length || 0),
        0
      ) || 0;

    // Simuler une progression sur 20 points basée sur les vraies données
    for (let i = 0; i < 20; i++) {
      let value = 0;

      if (totalChapters > 0 && totalLessons > 0) {
        // Base sur le nombre de chapitres et leçons
        const baseValue = Math.min(50, totalChapters * 5 + totalLessons * 2);
        value = baseValue + Math.sin(i * 0.8) * 20 + Math.cos(i * 0.3) * 10;

        if (i < 5) {
          value = Math.max(0, value * 0.2 + i * 2); // Ramp up initial
        } else if (i > 15) {
          value = Math.max(0, value - (i - 15) * 3); // Ramp down final
        }
      } else {
        // Données par défaut si pas de contenu
        value = 10 + Math.sin(i * 0.5) * 5;
      }

      data.push({
        name: `Jour ${i + 1}`,
        value: Math.max(0, Math.min(100, Math.round(value))),
      });
    }
    return data;
  };

  const generateActiveMembersData = () => {
    const data = [];
    const totalChapters = classData.chapters?.length || 0;
    const activeChapters =
      classData.chapters?.filter((chapter) => chapter.active).length || 0;

    // Simuler l'activité basée sur les chapitres actifs
    for (let i = 0; i < 20; i++) {
      let value = 0;

      if (totalChapters > 0) {
        const activityRate = activeChapters / totalChapters;
        const baseValue = 30 + activityRate * 40;
        value = baseValue + Math.sin(i * 0.6) * 15 + Math.cos(i * 0.4) * 8;

        if (i < 3) {
          value = Math.max(0, value * 0.3 + i * 5);
        } else if (i > 17) {
          value = Math.max(0, value - (i - 17) * 2);
        }
      } else {
        value = 15 + Math.sin(i * 0.4) * 8;
      }

      data.push({
        name: `Jour ${i + 1}`,
        value: Math.max(0, Math.min(100, Math.round(value))),
      });
    }
    return data;
  };

  const membersData = generateMembersData();
  const activeMembersData = generateActiveMembersData();

  // Calculer des statistiques réelles
  const totalChapters = classData.chapters?.length || 0;
  const totalLessons =
    classData.chapters?.reduce(
      (total, chapter) => total + (chapter.lessons?.length || 0),
      0
    ) || 0;
  const activeChapters =
    classData.chapters?.filter((chapter) => chapter.active).length || 0;
  const completionRate =
    totalChapters > 0 ? Math.round((activeChapters / totalChapters) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center gap-8">
      {/* Statistiques de la communauté */}
      {/* <div className="w-full max-w-4xl">
        <div className="p-6 bg-white rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistiques de la communauté</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600">{totalChapters}</div>
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

      <div className="w-full max-w-4xl">
        <AreaChartComponent
          title="Évolution des membres"
          data={membersData}
          id="members"
        />
      </div>
      <div className="w-full max-w-4xl">
        <AreaChartComponent
          title="Membres actifs"
          data={activeMembersData}
          id="active-members"
        />
      </div>
    </div>
  );
}
