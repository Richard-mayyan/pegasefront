"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, Plus, Users } from "lucide-react";
import Link from "next/link";

export default function ChatEmptyState() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Icône */}
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageCircle className="h-10 w-10 text-gray-400" />
        </div>

        {/* Titre et description */}
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Aucun groupe de discussion
        </h1>
        <p className="text-gray-600 mb-8">
          Vous n'avez pas encore créé de groupe de discussion dans votre
          communauté. Créez votre premier groupe pour commencer à échanger avec
          vos membres.
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/p/chat/1">
            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3">
              <Plus className="h-5 w-5 mr-2" />
              Créer un groupe de discussion
            </Button>
          </Link>

          <div className="text-sm text-gray-500">
            <div className="flex items-center justify-center gap-2">
              <Users className="h-4 w-4" />
              <span>
                Les groupes permettent d'organiser vos conversations par thème
              </span>
            </div>
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-800 mb-2">
            Pourquoi créer des groupes ?
          </h3>
          <ul className="text-sm text-gray-600 space-y-1 text-left">
            <li>• Organiser les discussions par thème</li>
            <li>• Faciliter la participation des membres</li>
            <li>• Garder une trace des conversations importantes</li>
            <li>• Améliorer l'engagement de votre communauté</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
