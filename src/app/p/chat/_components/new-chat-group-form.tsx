"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building, Plus, Users } from "lucide-react";
import { useChatData } from "@/components/layouts/ChatDataProvider";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export default function NewChatGroupForm() {
  const { createChatGroup } = useChatData();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "blue",
  });

  const colors = [
    { value: "blue", label: "Bleu", bgColor: "bg-blue-600" },
    { value: "green", label: "Vert", bgColor: "bg-green-600" },
    { value: "purple", label: "Violet", bgColor: "bg-purple-600" },
    { value: "orange", label: "Orange", bgColor: "bg-orange-600" },
    { value: "red", label: "Rouge", bgColor: "bg-red-600" },
    { value: "pink", label: "Rose", bgColor: "bg-pink-600" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      setIsLoading(true);
      await createChatGroup({
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        color: formData.color,
      });

      // Rediriger vers la page de chat
      router.push(ROUTES.chat);
    } catch (error) {
      console.error("Erreur lors de la création du groupe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-customBg rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Créer un nouveau groupe
            </h1>
            <p className="text-gray-600 mt-2">
              Commencez une nouvelle conversation avec votre communauté
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nom du groupe */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nom du groupe *
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Ex: Open Space, Nouveaux, etc."
                required
                className="w-full"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description (optionnel)
              </label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Décrivez le but de ce groupe..."
                rows={3}
                className="w-full"
              />
            </div>

            {/* Couleur */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Couleur du groupe
              </label>
              <div className="grid grid-cols-3 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, color: color.value }))
                    }
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      formData.color === color.value
                        ? "border-teal-500 bg-teal-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${color.bgColor}`} />
                    <span className="text-sm font-medium text-gray-700">
                      {color.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bouton de soumission */}
            <Button
              type="submit"
              disabled={isLoading || !formData.name.trim()}
              className="w-full bg-customBg hover:bg-customBg-hover text-white py-3"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Création...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Créer le groupe
                </div>
              )}
            </Button>
          </form>

          {/* Informations supplémentaires */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>
                Les membres de votre communauté pourront rejoindre ce groupe
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
