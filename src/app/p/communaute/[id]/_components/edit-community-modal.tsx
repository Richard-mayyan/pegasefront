"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Upload, Trash2 } from "lucide-react";
import {
  CommunityEntity,
  CommunityEntityWithoutImages,
} from "@/logic/domain/entities";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TYPOGRAPHY_OPTIONS } from "@/lib/constants";
import { apiClient } from "@/logic/infra/repos/nodeapi/axios";

interface EditCommunityModalProps {
  community: CommunityEntity;
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    updatedCommunity: Partial<CommunityEntityWithoutImages>
  ) => Promise<void>;
}

interface ImageData {
  resourceId?: string;
  url: string;
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
  const [images, setCoverPhotos] = useState<ImageData[]>(
    community.images || []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: community.name,
        description: community.description,
        color: community.color,
        typography: community.typography,
      });
      setCoverPhotos(community.images || []);
    }
  }, [isOpen, community]);

  const handleInputChange = (field: keyof CommunityEntity, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddCoverPhoto = () => {
    if (images.length >= 5) {
      toast.error("Maximum 5 photos de couverture autorisées");
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = 5 - images.length;
    const toRead = Array.from(files).slice(0, remainingSlots);

    toRead.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Veuillez sélectionner une image valide");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setCoverPhotos((prev) => [...prev, { url: base64 }]);
      };
      reader.readAsDataURL(file);
    });

    // reset input so selecting the same file again triggers change
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveCoverPhoto = async (index: number) => {
    const imageToRemove = images[index];

    console.log("imageToRemove", imageToRemove);

    // Si l'image a un resourceId, la supprimer côté serveur
    if (imageToRemove.resourceId) {
      try {
        // Appeler l'API pour supprimer l'image
        await apiClient(`/resources/${imageToRemove.resourceId}`, {
          method: "DELETE",
        });
        setCoverPhotos((prev) => prev.filter((_, i) => i !== index));
        toast.success("Image supprimée");
      } catch (error) {
        console.error("Erreur lors de la suppression de l'image:", error);
        toast.error("Erreur lors de la suppression de l'image");
      }
    }

    // Supprimer l'image de l'état local
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
        images: images.map((image) => image.url),
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
            <Select
              value={formData.typography || ""}
              onValueChange={(value) => handleInputChange("typography", value)}
            >
              <SelectTrigger id="community-typography">
                <SelectValue placeholder="Choisir une typographie" />
              </SelectTrigger>
              <SelectContent>
                {TYPOGRAPHY_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Photos de couverture */}
          <div className="space-y-3 mb-6">
            <Label>Photos de couverture (max 5)</Label>
            <div className="grid grid-cols-5 gap-3">
              {images.map((photo, index) => (
                <div key={index} className="relative group">
                  <div className="w-full h-24 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={photo.url}
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
              {images.length < 5 && (
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
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <p className="text-sm text-gray-500">
              Vous pouvez téléverser jusqu'à 5 images. Les nouvelles images
              remplacent celles existantes lors de l'enregistrement.
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
