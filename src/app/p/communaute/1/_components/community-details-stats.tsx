import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IMG_URL } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { CommunityEntity, ClassEntity } from "@/logic/domain/entities";

interface CommunityDetailsStatsProps {
  community: CommunityEntity;
  classData: ClassEntity;
}

export default function CommunityDetailsStats({
  community,
  classData,
}: CommunityDetailsStatsProps) {
  // Calculer les statistiques réelles basées sur les données
  const totalChapters = classData.chapters?.length || 0;
  const totalLessons =
    classData.chapters?.reduce(
      (total, chapter) => total + (chapter.lessons?.length || 0),
      0
    ) || 0;

  // Calculer la progression (pour l'instant, on considère qu'aucune leçon n'est terminée)
  const completedLessons = 0;
  const progressPercentage =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Simuler des données de souscriptions (à remplacer par de vraies données du repo)
  const subscriptions = [
    {
      date: "5 Juin 2025",
      title: "Réussir à se maîtriser",
      name: "Jordan Heno",
      handle: "@JordanHeno.com",
      amount: "Gratuit",
      avatar: IMG_URL,
    },
    {
      date: "5 Juin 2025",
      title: "Réussir à se maîtriser",
      name: "Jordan Heno",
      handle: "@JordanHeno.com",
      amount: formatPrice(200),
      avatar: IMG_URL,
    },
    {
      date: "5 Juin 2025",
      title: "Réussir à se maîtriser",
      name: "Jordan Heno",
      handle: "@JordanHeno.com",
      amount: formatPrice(200),
      avatar: IMG_URL,
    },
    {
      date: "5 Juin 2025",
      title: "Réussir à se maîtriser",
      name: "Jordan Heno",
      handle: "@JordanHeno.com",
      amount: "Gratuit",
      avatar: IMG_URL,
    },
    {
      date: "5 Juin 2025",
      title: "Réussir à se maîtriser",
      name: "Jordan Heno",
      handle: "@JordanHeno.com",
      amount: formatPrice(200),
      avatar: IMG_URL,
    },
    {
      date: "5 Juin 2025",
      title: "Réussir à se maîtriser",
      name: "Jordan Heno",
      handle: "@JordanHeno.com",
      amount: "Gratuit",
      avatar: IMG_URL,
    },
  ];

  // Calculer le revenu total (simulé pour l'instant)
  const totalRevenue = subscriptions
    .filter((sub) => sub.amount !== "Gratuit")
    .reduce((total, sub) => {
      const amount =
        sub.amount === "Gratuit" ? 0 : parseInt(sub.amount.replace("", ""));
      return total + amount;
    }, 0);

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
          <h3 className="text-3xl font-bold text-gray-800">{totalStudents}</h3>
        </div>
      </div>

      {/* Table des dernières souscriptions */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Dernières souscriptions
      </h2>
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
                <td className="py-3 pr-4 text-sm text-gray-700">{sub.date}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{sub.title}</td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        className="object-cover"
                        src={sub.avatar || "/placeholder.svg"}
                        alt={sub.name}
                      />
                      <AvatarFallback>{sub.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{sub.name}</span>
                      <span className="text-xs text-gray-500">
                        {sub.handle}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-3 pl-4 text-sm text-gray-700 text-right">
                  {sub.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Informations supplémentaires de la classe */}
      {/* <div className="mt-8 p-4 bg-teal-50 rounded-lg border border-teal-200">
        <h3 className="text-lg font-semibold text-teal-800 mb-4">
          Informations de la classe
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-teal-600 font-medium">Nom:</span>
            <p className="text-teal-800">{classData.name}</p>
          </div>
          <div>
            <span className="text-teal-600 font-medium">Chapitres:</span>
            <p className="text-teal-800">{totalChapters}</p>
          </div>
          <div>
            <span className="text-teal-600 font-medium">Leçons:</span>
            <p className="text-teal-800">{totalLessons}</p>
          </div>
          <div>
            <span className="text-teal-600 font-medium">Progression:</span>
            <p className="text-teal-800">{progressPercentage}%</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
