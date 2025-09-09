"use client";

import { useState } from "react";
import { useChatData } from "@/components/layouts/ChatDataProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building, Plus, SearchIcon, X } from "lucide-react";
import { useAppData } from "@/components/layouts/AppDataProvider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import SelectMembersInput from "./select-members-input";
import { RegisterProfileEnum } from "@/logic/domain/entities";
import { useAuth } from "@/components/layouts/AuthProvider";

interface ChatSidebarProps {
  onClose?: () => void;
}

export default function ChatSidebar({ onClose }: ChatSidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "blue",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { doIfUpgradeSubscription } = useAppData();

  const {
    currentChatGroup,
    chatGroups,
    messages,
    setCurrentChatGroup,
    sendMessage,
    likeMessage,
    createChatGroup,
    isLoading,
  } = useChatData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      setIsSubmitting(true);
      await createChatGroup({
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        color: formData.color,
      });

      // Réinitialiser le formulaire et fermer le modal
      setFormData({ name: "", description: "", color: "blue" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la création du groupe:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const colors = [
    { value: "blue", label: "Bleu", bgColor: "bg-blue-600" },
    { value: "green", label: "Vert", bgColor: "bg-green-600" },
    { value: "purple", label: "Violet", bgColor: "bg-purple-600" },
    { value: "orange", label: "Orange", bgColor: "bg-orange-600" },
    { value: "red", label: "Rouge", bgColor: "bg-red-600" },
    { value: "pink", label: "Rose", bgColor: "bg-pink-600" },
  ];

  const { user } = useAuth();

  return (
    <>
      <div className="w-full h-full bg-white border-r border-gray-200 flex flex-col">
        {/* Header de la sidebar */}
        <div className="p-4 border-b border-gray-200">
          {/* Barre de recherche */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Chercher"
              className="pl-10 pr-4 py-2 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        {/* Liste des groupes de chat */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {chatGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => {
                  setCurrentChatGroup(group);
                  onClose?.(); // Close sidebar on mobile when group is selected
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  currentChatGroup?.id === group.id
                    ? "bg-blue-50 border border-blue-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      group.color === "blue"
                        ? "bg-blue-600"
                        : group.color === "green"
                        ? "bg-green-600"
                        : group.color === "purple"
                        ? "bg-purple-600"
                        : group.color === "orange"
                        ? "bg-orange-600"
                        : "bg-gray-600"
                    }`}
                  >
                    <Building className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{group.name}</p>
                    {/* <p className="text-sm text-gray-500">{group.description}</p> */}
                  </div>
                </div>
                {group.unreadCount > 0 && (
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">
                      {group.unreadCount}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bouton nouveau groupe */}
        {user?.profile === RegisterProfileEnum.Coach && (
          <div className="p-4 border-t border-gray-200 w-fit mx-auto">
            <Button
              className="mx-auto"
              variant={"roam"}
              onClick={() =>
                doIfUpgradeSubscription(() => setIsModalOpen(true))
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouveau groupe
            </Button>
          </div>
        )}
      </div>

      {/* Modal de création de groupe */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Créer un nouveau groupe
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
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

              <div className="flex items-center justify-between">
                <Label
                  htmlFor="all-members-can-write"
                  className="text-base font-medium"
                >
                  Tous les membres peuvent écrire
                </Label>
                <Switch id="all-members-can-write" defaultChecked />
              </div>

              {/* Couleur */}
              {/* <div>
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
                      <div
                        className={`w-4 h-4 rounded-full ${color.bgColor}`}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {color.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div> */}

              <SelectMembersInput />

              {/* Boutons d'action */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.name.trim()}
                  className="flex-1 bg-customBg hover:bg-customBg-hover text-white"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Création...
                    </div>
                  ) : (
                    "Créer le groupe"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
