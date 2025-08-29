"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Pencil,
  Trash2,
  Download,
  Plus,
  Eye,
  X,
  Clock,
  Link,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { IMG_URL } from "@/lib/constants";
import { useCoachingsData } from "@/components/layouts/CoachingsDataProvider";
import { CoachingEntity, ReservationEntity } from "@/logic/domain/entities";
import AddCoachingForm from "./add-coaching-form";
import { toast } from "sonner";
import { useAuth } from "@/components/layouts/AuthProvider";

export default function CoachingsListTable() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("coaching"); // 'coaching' or 'reservations'
  const [selectedCoaching, setSelectedCoaching] =
    useState<CoachingEntity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const { coachings, reservations, isLoading, error, deleteCoaching } =
    useCoachingsData();

  const getTabClass = (tabName: string) =>
    cn(
      "px-4 py-2 rounded-lg text-base font-medium",
      activeTab === tabName
        ? "bg-gray-200 text-gray-800"
        : "bg-transparent text-gray-700 hover:bg-gray-100"
    );

  const handleDeleteCoaching = async (coachingId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce coaching ?")) {
      try {
        await deleteCoaching(coachingId);
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  };

  const handleViewCoaching = (coaching: CoachingEntity) => {
    setSelectedCoaching(coaching);
    setIsModalOpen(true);
  };

  const handleOpenAddForm = () => {
    setIsAddFormOpen(true);
  };

  const handleCloseAddForm = () => {
    setIsAddFormOpen(false);
  };

  const handleOpenEditForm = () => {
    setIsEditFormOpen(true);
    setIsModalOpen(false); // Fermer le modal de détail
  };

  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
  };

  const handleExportData = () => {
    // Vérifier s'il y a des données à exporter
    if (coachings.length === 0) {
      toast("Aucun coaching à exporter.");
      return;
    }

    try {
      // Préparer les données pour l'export
      const exportData = coachings.map((coaching) => {
        return {
          "Nom du coaching": coaching.name,
          Description: coaching.description || "",
          "Date de début": coaching.startAt
            ? formatDate(coaching.startAt)
            : "-",
          "Date de fin": coaching.endAt ? formatDate(coaching.endAt) : "-",
          Lien: coaching.link || "-",
          Prix: coaching.price ? `${coaching.price}€` : "-",
          "Date de création": formatDate(
            coaching.createdAt || new Date().toISOString()
          ),
        };
      });

      // Convertir en CSV
      const headers = Object.keys(exportData[0]);
      const csvContent = [
        headers.join(","),
        ...exportData.map((row) =>
          headers
            .map((header) => {
              const value = row[header as keyof typeof row];
              // Échapper les virgules et guillemets dans les valeurs
              if (
                typeof value === "string" &&
                (value.includes(",") || value.includes('"'))
              ) {
                return `"${value.replace(/"/g, '""')}"`;
              }
              return value;
            })
            .join(",")
        ),
      ].join("\n");

      // Créer et télécharger le fichier
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `coachings_${formatDate(new Date().toISOString())}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Nettoyer l'URL
      URL.revokeObjectURL(url);

      // Notification de succès
      toast(`Export réussi ! ${coachings.length} coaching(s) exporté(s).`);
    } catch (error) {
      console.error("Erreur lors de l'export:", error);
      toast("Erreur lors de l'export. Veuillez réessayer.");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const getDuration = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01T${startTime}:00`);
    const end = new Date(`2000-01-01T${endTime}:00`);
    const diffMs = end.getTime() - start.getTime();
    const diffMins = Math.round(diffMs / 60000);
    return `${diffMins}:00`;
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-center h-32">
          <div className="text-lg text-gray-600">
            Chargement des coachings...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-center h-32">
          <div className="text-lg text-red-600">Erreur: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-sm w-full max-w-6xl mx-auto">
        {/* Top Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          <Button
            variant="outline"
            onClick={() => setActiveTab("coaching")}
            className={getTabClass("coaching")}
          >
            Coaching
          </Button>
          {/* <Button
            onClick={() => setActiveTab("reservations")}
            className={getTabClass("reservations")}
          >
            Réservations
          </Button> */}
        </div>

        {/* Header with actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Coachings</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleExportData}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent"
            >
              <Download className="h-4 w-4" />
              Exporter
            </Button>
            <Button
              onClick={handleOpenAddForm}
              className="bg-customBg hover:bg-customBg-hover text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter coaching
            </Button>
          </div>
        </div>

        {/* Coachings Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="text-sm text-gray-500 border-b border-gray-200">
                <th className="py-2 pr-4 font-medium">Nom du coaching</th>
                <th className="py-2 px-4 font-medium">Description</th>
                <th className="py-2 px-4 font-medium">Lien</th>
                <th className="py-2 px-4 font-medium">Prix</th>
                <th className="py-2 pl-4 font-medium text-right">Option</th>
              </tr>
            </thead>
            <tbody>
              {coachings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    Aucun coaching trouvé. Créez votre premier coaching !
                  </td>
                </tr>
              ) : (
                coachings.map((coaching) => (
                  <tr
                    key={coaching.id}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    <td className="py-3 pr-4 text-sm text-gray-700">
                      {coaching.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {coaching.description || "-"}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {coaching.link ? (
                        <a
                          href={coaching.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          Voir le lien
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {coaching.price ? `${coaching.price}€` : "-"}
                    </td>
                    <td className="py-3 pl-4 text-sm text-gray-700 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewCoaching(coaching)}
                        className="flex items-center gap-1 px-3 py-1 h-auto bg-transparent"
                      >
                        <Eye className="h-3 w-3" />
                        Voir
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de détail du coaching */}
      {isModalOpen && selectedCoaching && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header du modal */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {selectedCoaching.name}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Image du coaching */}
            <div className="mb-6">
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-gray-500 text-center">
                  <div className="text-4xl mb-2">📚</div>
                  <p>Image du coaching</p>
                </div>
              </div>
            </div>

            {/* Informations du coaching */}
            <div className="space-y-4 mb-6">
              {selectedCoaching.link && (
                <div className="flex items-center gap-3">
                  <Link className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700 break-all">
                    <a
                      href={selectedCoaching.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {selectedCoaching.link}
                    </a>
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">👤</span>
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={IMG_URL} alt="Coach" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <span className="text-gray-700">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  if (selectedCoaching.id) {
                    handleDeleteCoaching(selectedCoaching.id);
                    setIsModalOpen(false);
                  }
                }}
                className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
              >
                Supprimer
              </Button>
              <Button
                onClick={handleOpenEditForm}
                className="flex-1 bg-customBg hover:bg-customBg-hover text-white"
              >
                Modifier coaching
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'ajout de coaching */}
      {isAddFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg   w-fit mx-4 max-h-[90vh] overflow-y-auto">
            <AddCoachingForm onClose={handleCloseAddForm} />
          </div>
        </div>
      )}

      {/* Modal d'édition de coaching */}
      {isEditFormOpen && selectedCoaching && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-fit mx-4 max-h-[90vh] overflow-y-auto">
            <AddCoachingForm
              onClose={handleCloseEditForm}
              editingCoaching={selectedCoaching}
              isEditing={true}
            />
          </div>
        </div>
      )}
    </>
  );
}
