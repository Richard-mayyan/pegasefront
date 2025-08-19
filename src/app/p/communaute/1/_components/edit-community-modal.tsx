"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Upload, Trash2 } from "lucide-react";
import { CommunityEntity } from "@/logic/domain/entities";
import { toast } from "sonner";

interface EditCommunityModalProps {
  community: CommunityEntity;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedCommunity: Partial<CommunityEntity>) => Promise<void>;
}

export default function EditCommunityModal({
  community,
  isOpen,
  onClose,
  onSave,
}: EditCommunityModalProps) {
  const [formData, setFormData] = useState<Partial<CommunityEntity>>({
    name: community.name,
    description: community.description,
    color: community.color,
    typography: community.typography,
  });
  const [coverPhotos, setCoverPhotos] = useState<string[]>(
    community.coverPhotos || []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: community.name,
        description: community.description,
        color: community.color,
        typography: community.typography,
      });
      setCoverPhotos(community.coverPhotos || []);
    }
  }, [isOpen, community]);

  const handleInputChange = (field: keyof CommunityEntity, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddCoverPhoto = () => {
    // Simuler l'ajout d'une photo (dans un vrai projet, ceci ouvrirait un sélecteur de fichier)
    const newPhoto = prompt("Entrez l'URL de la photo de couverture:");
    if (newPhoto && newPhoto.trim()) {
      if (coverPhotos.length >= 5) {
        toast.error("Maximum 5 photos de couverture autorisées");
        return;
      }
      setCoverPhotos((prev) => [...prev, newPhoto.trim()]);
    }
  };

  const handleRemoveCoverPhoto = (index: number) => {
    setCoverPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name?.trim()) {
      toast.error("Le nom de la communauté est requis");
      return;
    }

    try {
      setIsSubmitting(true);
      await onSave({
        ...formData,
        coverPhotos,
      });
      toast.success("Communauté mise à jour avec succès");
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Erreur lors de la mise à jour de la communauté");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Modifier la communauté
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Nom de la communauté */}
          <div className="space-y-2 mb-4">
            <Label htmlFor="community-name">Nom de la communauté *</Label>
            <Input
              id="community-name"
              value={formData.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Nom de la communauté"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2 mb-4">
            <Label htmlFor="community-description">Description</Label>
            <Textarea
              id="community-description"
              value={formData.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Description de la communauté..."
              rows={3}
            />
          </div>

          {/* Couleur */}
          <div className="space-y-2 mb-4">
            <Label htmlFor="community-color">Couleur</Label>
            <div className="flex items-center gap-3">
              <Input
                id="community-color"
                type="color"
                value={formData.color || "#6B7280"}
                onChange={(e) => handleInputChange("color", e.target.value)}
                className="w-16 h-10 p-1"
              />
              <Input
                value={formData.color || "#6B7280"}
                onChange={(e) => handleInputChange("color", e.target.value)}
                placeholder="#6B7280"
                className="flex-1"
              />
            </div>
          </div>

          {/* Typographie */}
          <div className="space-y-2 mb-6">
            <Label htmlFor="community-typography">Typographie</Label>
            <Input
              id="community-typography"
              value={formData.typography || ""}
              onChange={(e) => handleInputChange("typography", e.target.value)}
              placeholder="Police de caractères (ex: Arial, Roboto)"
            />
          </div>

          {/* Photos de couverture */}
          <div className="space-y-3 mb-6">
            <Label>Photos de couverture (max 5)</Label>
            <div className="grid grid-cols-5 gap-3">
              {coverPhotos.map((photo, index) => (
                <div key={index} className="relative group">
                  <div className="w-full h-24 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveCoverPhoto(index)}
                    className="absolute top-1 right-1 h-6 w-6 bg-red-500 text-white border-red-500 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              {coverPhotos.length < 5 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddCoverPhoto}
                  className="w-full h-24 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100"
                >
                  <Upload className="h-5 w-5 text-gray-500 mb-1" />
                  <span className="text-xs text-gray-500">Ajouter</span>
                </Button>
              )}
            </div>
            <p className="text-sm text-gray-500">
              Cliquez sur "Ajouter" pour ajouter une nouvelle photo de
              couverture
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
            >
              {isSubmitting ? "Mise à jour..." : "Mettre à jour"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
