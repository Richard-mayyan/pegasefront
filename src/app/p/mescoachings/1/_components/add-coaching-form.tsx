"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import { useCoachingsData } from "@/components/layouts/CoachingsDataProvider";
import { CreateCoachingDto } from "@/logic/domain/repos/CoachingsRepo";
import { CoachingEntity } from "@/logic/domain/entities";
import { toast } from "sonner";

interface AddCoachingFormProps {
  onClose?: () => void;
  editingCoaching?: CoachingEntity;
  isEditing?: boolean;
}

export default function AddCoachingForm({
  onClose,
  editingCoaching,
  isEditing = false,
}: AddCoachingFormProps) {
  const { createCoaching, updateCoaching } = useCoachingsData();
  const [isOpen, setIsOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<CreateCoachingDto>({
    name: editingCoaching?.name || "",
    description: editingCoaching?.description || "",
    link: editingCoaching?.link || "",
    price: editingCoaching?.price,
    startAt: editingCoaching?.startAt || new Date().toISOString(),
    endAt:
      editingCoaching?.endAt ||
      new Date(Date.now() + 60 * 60 * 1000).toISOString(), // +1 heure par défaut
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Veuillez remplir le nom du coaching");
      return;
    }

    try {
      setIsSubmitting(true);

      if (isEditing && editingCoaching?.id) {
        // Mode édition : mettre à jour le coaching existant
        await updateCoaching(editingCoaching.id, {
          name: formData.name,
          description: formData.description,
          link: formData.link,
          price: formData.price,
          startAt: formData.startAt,
          endAt: formData.endAt,
        });
        toast("Coaching modifié avec succès !");
      } else {
        // Mode création : créer un nouveau coaching
        await createCoaching({
          ...formData,
        });

        // Réinitialiser le formulaire seulement en mode création
        setFormData({
          name: "",
          description: "",
          link: "",
          price: undefined,
          startAt: new Date().toISOString(),
          endAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        });
        toast("Coaching créé avec succès !");
      }

      // Appeler onClose si fourni
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Erreur lors de la création/modification:", error);
      toast(
        isEditing
          ? "Erreur lors de la modification du coaching"
          : "Erreur lors de la création du coaching"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CreateCoachingDto, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isOpen) {
    return (
      <Card
        className="w-full max-w-md rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
        onClick={() => setIsOpen(true)}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-teal-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Ajouter un coaching
          </h3>
          <p className="text-gray-600">
            Cliquez pour créer un nouveau coaching
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg rounded-xl shadow-lg p-6">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-bold">
          {isEditing ? "Modifier le coaching" : "Ajouter un coaching"}
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="coaching-name">Nom du coaching *</Label>
            <Input
              id="coaching-name"
              placeholder="Nom du coaching"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coaching-description">Description</Label>
            <Textarea
              id="coaching-description"
              placeholder="Description du coaching..."
              className="w-full min-h-[100px] resize-y"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coaching-link">Lien</Label>
            <Input
              id="coaching-link"
              type="url"
              placeholder="https://example.com"
              value={formData.link}
              onChange={(e) => handleInputChange("link", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coaching-price">Prix (en euros)</Label>
            <Input
              id="coaching-price"
              type="number"
              placeholder="15 "
              value={formData.price || ""}
              onChange={(e) =>
                handleInputChange(
                  "price",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
            <p className="text-sm text-gray-500">Entrez le prix</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coaching-start">Date et heure de début</Label>
            <Input
              id="coaching-start"
              type="datetime-local"
              value={formData.startAt ? formData.startAt.slice(0, 16) : ""}
              onChange={(e) => handleInputChange("startAt", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coaching-end">Date et heure de fin</Label>
            <Input
              id="coaching-end"
              type="datetime-local"
              value={formData.endAt ? formData.endAt.slice(0, 16) : ""}
              onChange={(e) => handleInputChange("endAt", e.target.value)}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={handleClose}>
            Annuler
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            {isSubmitting
              ? isEditing
                ? "Modification..."
                : "Création..."
              : isEditing
              ? "Modifier le coaching"
              : "Ajouter le coaching"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
