"use client";

import { useState } from "react";
import { MessageEntity } from "@/logic/domain/entities";
import ChatMessage from "./chat-message";

// Données de test avec réponses imbriquées
const testMessages: MessageEntity[] = [
  {
    id: 1,
    content: "Salut tout le monde ! Comment allez-vous ?",
    chatGroupId: 1,
    userId: 1,
    replyToId: undefined,
    likes: 2,
    sender: { id: 1, name: "Alice", email: "alice@example.com" },
    createdAt: "2024-01-15T10:00:00Z",
    replies: [
      {
        id: 2,
        content: "Salut Alice ! Je vais très bien, merci !",
        chatGroupId: 1,
        userId: 2,
        replyToId: 1,
        likes: 1,
        sender: { id: 2, name: "Bob", email: "bob@example.com" },
        createdAt: "2024-01-15T10:05:00Z",
        replies: [],
      },
      {
        id: 3,
        content: "Très bien Alice, et toi ?",
        chatGroupId: 1,
        userId: 4,
        replyToId: 1,
        likes: 0,
        sender: { id: 4, name: "Diana", email: "diana@example.com" },
        createdAt: "2024-01-15T10:06:00Z",
        replies: [],
      },
    ],
  },
  {
    id: 4,
    content: "Quelqu'un a des nouvelles du projet ?",
    chatGroupId: 1,
    userId: 5,
    replyToId: undefined,
    likes: 0,
    sender: { id: 5, name: "Eve", email: "eve@example.com" },
    createdAt: "2024-01-15T10:10:00Z",
    replies: [
      {
        id: 5,
        content: "Oui ! On avance bien, réunion demain à 14h",
        chatGroupId: 1,
        userId: 1,
        replyToId: 4,
        likes: 1,
        sender: { id: 1, name: "Alice", email: "alice@example.com" },
        createdAt: "2024-01-15T10:15:00Z",
        replies: [],
      },
    ],
  },
  {
    id: 6,
    content: "Message sans réponses pour tester",
    chatGroupId: 1,
    userId: 6,
    replyToId: undefined,
    likes: 0,
    sender: { id: 6, name: "Frank", email: "frank@example.com" },
    createdAt: "2024-01-15T10:20:00Z",
    replies: [],
  },
];

export default function ChatDropdownDemo() {
  const [messages] = useState<MessageEntity[]>(testMessages);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        🎯 Démonstration du Dropdown de Messages
      </h1>

      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">
          Instructions de test :
        </h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>
            • <strong>Cliquez sur le message principal</strong> pour
            ouvrir/fermer le dropdown
          </li>
          <li>• Le message principal devient l'en-tête du dropdown</li>
          <li>• Les réponses s'affichent directement en dessous</li>
          <li>
            • Utilisez le bouton "Répondre" pour simuler une nouvelle réponse
          </li>
          <li>
            • Observez le changement de style quand le dropdown est ouvert
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-2">
          ✅ Fonctionnalités testées :
        </h3>
        <ul className="text-green-700 text-sm space-y-1">
          <li>• Message principal comme en-tête de dropdown</li>
          <li>• Clic sur le message pour ouvrir/fermer</li>
          <li>• Changement de style visuel (couleur, bordure)</li>
          <li>• Affichage des réponses en dessous</li>
          <li>• Bouton "Répondre" fonctionnel</li>
          <li>• Indicateur de réponses avec chevron</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">
          🎨 Comportement visuel :
        </h3>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>
            • <strong>Fermé</strong> : Message blanc avec hover gris
          </li>
          <li>
            • <strong>Ouvert</strong> : Message bleu clair avec bordure bleue
          </li>
          <li>
            • <strong>Réponses</strong> : Fond blanc avec bordure connectée
          </li>
          <li>
            • <strong>Transition</strong> : Animation fluide
            d'ouverture/fermeture
          </li>
        </ul>
      </div>
    </div>
  );
}
