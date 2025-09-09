"use client";

import { useState, useRef, useEffect } from "react";
import { useChatData } from "@/components/layouts/ChatDataProvider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Smile,
  Paperclip,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  Quote,
  Link,
  ArrowUp,
  X,
} from "lucide-react";

export default function ChatInputArea() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    currentChatGroup,
    sendMessage,
    isLoading,
    replyTo,
    setReplyTo,
    messages,
  } = useChatData();

  // Trouver le message auquel on répond
  const replyToMessage = replyTo
    ? messages.find((m) => m.id === replyTo)
    : null;

  // Auto-resize du textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = async () => {
    if (!message.trim() || !currentChatGroup || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await sendMessage(message.trim());
      setMessage("");
      setReplyTo(null); // Réinitialiser la réponse après envoi

      // Reset la hauteur du textarea
      if (textareaRef.current) {
        textareaRef.current.style.height = "40px";
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const cancelReply = () => {
    setReplyTo(null);
  };

  // Désactiver si aucun groupe n'est sélectionné
  const isDisabled = !currentChatGroup || isLoading || isSubmitting;

  return (
    <div className=" border-t-2  border-gray-300 bg-gray-50 p-4 shadow-lg ">
      {/* Aperçu de la réponse */}
      {replyToMessage && (
        <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-gray-700">
                  Répondre à
                </span>
                <span className="text-xs text-gray-600 font-medium">
                  {replyToMessage.sender?.name}
                </span>
              </div>
              <p className="text-sm text-blue-800 truncate">
                {replyToMessage.content}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-blue-500 hover:text-blue-700 hover:bg-blue-100"
              onClick={cancelReply}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Annuler la réponse</span>
            </Button>
          </div>
        </div>
      )}

      {/* <div className="flex items-center gap-1 mb-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Smile className="h-4 w-4" />
          <span className="sr-only">Emoji</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Paperclip className="h-4 w-4" />
          <span className="sr-only">Attach file</span>
        </Button>
        <div className="h-6 w-[1px] bg-gray-200 mx-1" /> 
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bold className="h-4 w-4" />
          <span className="sr-only">Bold</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Italic className="h-4 w-4" />
          <span className="sr-only">Italic</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Underline className="h-4 w-4" />
          <span className="sr-only">Underline</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Strikethrough className="h-4 w-4" />
          <span className="sr-only">Strikethrough</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignLeft className="h-4 w-4" />
          <span className="sr-only">Align left</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Quote className="h-4 w-4" />
          <span className="sr-only">Quote</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Link className="h-4 w-4" />
          <span className="sr-only">Link</span>
        </Button>
      </div> */}

      <div className="relative flex items-end">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            replyToMessage
              ? "Votre réponse..."
              : currentChatGroup
              ? "Ecrivez..."
              : "Sélectionnez un groupe pour commencer à discuter"
          }
          disabled={isDisabled}
          className="flex-1 min-h-[40px] max-h-[120px] pr-12 resize-none rounded-lg border border-gray-300 focus-visible:ring-0 focus-visible:border-customBg disabled:bg-gray-50 disabled:text-gray-400"
        />
        <Button
          onClick={handleSubmit}
          disabled={isDisabled || !message.trim()}
          size="icon"
          className="absolute right-2 bottom-2 h-8 w-8 rounded-full bg-customBg hover:bg-customBg-hover text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
          <span className="sr-only">Send message</span>
        </Button>
      </div>

      {!currentChatGroup && (
        <p className="text-sm text-gray-500 mt-2 text-center">
          Veuillez sélectionner un groupe de chat pour envoyer un message
        </p>
      )}
    </div>
  );
}
