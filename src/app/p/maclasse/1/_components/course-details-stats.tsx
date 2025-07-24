import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IMG_URL } from "@/lib/constants";

export default function CourseDetailsStats() {
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
      amount: "200 $",
      avatar: IMG_URL,
    },
    {
      date: "5 Juin 2025",
      title: "Réussir à se maîtriser",
      name: "Jordan Heno",
      handle: "@JordanHeno.com",
      amount: "200 $",
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
      amount: "200 $",
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

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Revenu total</p>
          <h3 className="text-3xl font-bold text-gray-800">25.000 $</h3>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Nombre d'étudiant</p>
          <h3 className="text-3xl font-bold text-gray-800">304</h3>
        </div>
      </div>

      {/* Recent Subscriptions Table */}
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
    </div>
  );
}
