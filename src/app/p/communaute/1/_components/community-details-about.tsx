import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pencil, Settings, Plus, Trash2 } from "lucide-react";
import { IMG_URL } from "@/lib/constants";
import { CommunityEntity, ClassEntity } from "@/logic/domain/entities";
import { useState } from "react";

interface CommunityDetailsAboutProps {
  community: CommunityEntity;
  classData: ClassEntity;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function CommunityDetailsAbout({
  community,
  classData,
  onEdit,
  onDelete,
}: CommunityDetailsAboutProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-end gap-2 mb-6">
        <Button
          variant="outline"
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent hover:bg-gray-50"
        >
          <Pencil className="h-4 w-4" />
          Modifier
        </Button>

        <Button
          variant="outline"
          onClick={() => setShowDeleteConfirm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent hover:bg-red-50 border-red-200 text-red-600"
        >
          <Trash2 className="h-4 w-4" />
          Supprimer
        </Button>
      </div>

      {/* Main Image - Utilise la première coverPhoto ou cover par défaut */}
      <div className="relative w-full h-80 rounded-xl overflow-hidden mb-4">
        <Image
          src={community.coverPhotos?.[0] || IMG_URL}
          alt={`Image de couverture de ${community.name}`}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Thumbnail Gallery - Affiche les coverPhotos de la communauté */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        {/* Afficher les coverPhotos existantes */}
        {community.coverPhotos && community.coverPhotos.length > 0 ? (
          community.coverPhotos.map((photo, index) => (
            <div
              key={index}
              className="relative w-full h-24 rounded-lg overflow-hidden"
            >
              <Image
                src={photo}
                alt={`Photo de couverture ${index + 1} de ${community.name}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))
        ) : (
          // Fallback si pas de coverPhotos
          <></>
        )}

        {/* Bouton d'ajout d'image */}
        <Button className="w-full h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100">
          <Plus className="h-6 w-6 text-gray-500" />
          <span className="sr-only">Add image</span>
        </Button>
      </div>

      {/* Description */}
      <div className="prose prose-sm max-w-none text-gray-700">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            À propos de la communauté
          </h3>
          <p className="text-gray-700">
            {community.description ||
              "Aucune description disponible pour cette communauté."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">
              Couleur de la communauté:
            </span>
            <div className="flex items-center gap-2 mt-1">
              <div
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: community.color || "#6B7280" }}
              />
              <span className="text-gray-700">
                {community.color || "Non définie"}
              </span>
            </div>
          </div>
          <div>
            <span className="font-medium text-gray-600">Typographie:</span>
            <span className="text-gray-700 ml-2">
              {community.typography || "Par défaut"}
            </span>
          </div>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirmer la suppression
            </h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer la communauté "{community.name}
              " ? Cette action est irréversible et supprimera également toutes
              les classes associées.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
