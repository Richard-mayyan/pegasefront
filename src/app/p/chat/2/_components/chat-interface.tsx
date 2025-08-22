"use client";

import { useChatData } from "@/components/layouts/ChatDataProvider";
import ChatNoGroupSelected from "../../_components/chat-no-group-selected";
import ChatMessage from "./chat-message";
import ChatInputArea from "../../_components/chat-input-area";
import { useEffect, useRef } from "react";
import ChatNavbar from "../../_components/chat-navbar";
import { MessageEntity } from "@/logic/domain/entities";

export default function ChatInterface() {
  const { currentChatGroup, messages, isLoading } = useChatData();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll vers le bas quand les messages changent (nouveau message envoyé)
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Scroll vers le bas quand le groupe de chat change
  useEffect(() => {
    scrollToBottom();
  }, [currentChatGroup?.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-gray-600">Chargement du chat...</div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-100px)] bg-gray-50 relative">
      <ChatNavbar />

      {/* Zone principale du chat */}
      {currentChatGroup ? (
        <div className="flex-1 flex flex-col">
          {/* Zone des messages */}
          <div className="flex-1 overflow-y-auto p-6 pb-[100px] pt-[100px]  space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p className="text-lg">Aucun message encore</p>
                <p className="text-sm">
                  Soyez le premier à envoyer un message !
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))
            )}

            {/* Référence pour le scroll automatique */}
            <div ref={messagesEndRef} />
          </div>

          {/* Zone de saisie */}
          {/* <ChatInputArea /> */}
        </div>
      ) : (
        <ChatNoGroupSelected />
      )}
    </div>
  );
}
