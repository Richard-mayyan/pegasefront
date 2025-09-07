"use client";

import { MessageCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useChatData } from "@/components/layouts/ChatDataProvider";

export default function ChatNoGroupSelected() {
  const { createChatGroup } = useChatData();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      setIsCreating(true);
      await createChatGroup({
        name: name.trim(),
        description: description.trim(),
      });
      setName("");
      setDescription("");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md">
        {/* Icône */}
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="h-8 w-8 text-gray-400" />
        </div>

        {/* Titre et description */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Aucun groupe sélectionné
        </h2>
        <p className="text-gray-600 mb-6">
          Créez un groupe de discussion pour commencer à chatter avec votre
          communauté.
        </p>

        {/* Actions */}
        {/* <div className="space-y-3 text-left">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Nom du groupe
            </label>
            <Input
              placeholder="Ex: Général, Support, Classe A"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              placeholder="Décrivez le but de ce groupe"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          <Button
            onClick={handleCreate}
            disabled={!name.trim() || isCreating}
            className="bg-customBg hover:bg-customBg-hover text-white w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            {isCreating ? "Création en cours..." : "Créer un nouveau groupe"}
          </Button>
        </div> */}

        {/* Conseils */}
        {/* <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-800 mb-2">Conseils</h3>
          <ul className="text-sm text-gray-600 space-y-1 text-left">
            <li>
              • Cliquez sur un groupe dans la sidebar pour le sélectionner
            </li>
            <li>• Créez des groupes par thème ou par projet</li>
            <li>• Invitez vos membres à rejoindre les groupes</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
