"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatData } from "@/components/layouts/ChatDataProvider";
import { MessageEntity } from "@/logic/domain/entities";
import { useState } from "react";

interface ChatMessageProps {
  message: MessageEntity;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const { setReplyTo, likeMessage } = useChatData();
  const [showReplies, setShowReplies] = useState(false);

  const handleReply = () => {
    setReplyTo(message.id as number);
  };

  const handleLike = () => {
    likeMessage(message.id as number);
  };

  const formatTimestamp = (timestamp: string | undefined) => {
    if (!timestamp) return "À l'instant";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) return "À l'instant";
    if (diffInHours < 24) return `Il y a ${Math.floor(diffInHours)}h`;
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full">
      {/* Message principal (header du dropdown) */}
      <div
        className={`flex items-start gap-3 p-4 rounded-lg shadow-sm transition-all duration-200 cursor-pointer ${
          showReplies
            ? "bg-blue-50 border border-blue-50 rounded-b-none"
            : "bg-white hover:bg-gray-50"
        }`}
        onClick={() =>
          message.replies &&
          message.replies.length > 0 &&
          setShowReplies(!showReplies)
        }
      >
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt={message.sender?.name} />
          <AvatarFallback>{message.sender?.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm mb-1">
            <span className="font-semibold text-gray-800">
              {message.sender?.name}
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500">
              {formatTimestamp(message.createdAt)}
            </span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
          <div className="flex items-center gap-4 mt-3 text-gray-500 text-sm">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 px-2 py-1 h-auto hover:text-green-900 hover:bg-green-50"
              onClick={(e) => {
                e.stopPropagation();
                handleReply();
              }}
            >
              <MessageCircle className="h-4 w-4" />
              Répondre
            </Button>

            {/* Indicateur de réponses avec chevron */}
            {message.replies && message.replies.length > 0 && (
              <div className="flex items-center gap-2 text-blue-600">
                <span className="text-sm">
                  {message.replies.length}{" "}
                  {message.replies.length === 1 ? "réponse" : "réponses"}
                </span>
                {showReplies ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contenu du dropdown (réponses) */}
      {message.replies && message.replies.length > 0 && showReplies && (
        <div className="bg-white border border-t-0 border-blue-200 rounded-b-lg shadow-sm">
          <div className="p-4 pt-2">
            <div className="space-y-3">
              {message.replies.map((reply) => (
                <div
                  key={reply.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src="/placeholder.svg"
                      alt={message.sender?.name}
                    />
                    <AvatarFallback>
                      {message.sender?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <span className="font-medium text-gray-700">
                        {reply.sender?.name}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-500">
                        {formatTimestamp(reply.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {reply.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
