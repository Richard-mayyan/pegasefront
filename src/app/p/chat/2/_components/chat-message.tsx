"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatData } from "@/components/layouts/ChatDataProvider";
import { MessageEntity } from "@/logic/domain/entities";

interface ChatMessageProps {
  message: MessageEntity;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const { setReplyTo, likeMessage } = useChatData();

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
    <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
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
          {/* <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 px-2 py-1 h-auto hover:text-blue-600 hover:bg-blue-50"
            onClick={handleLike}
          >
            <ThumbsUp className="h-4 w-4" />
            {message.likes || 0}
          </Button> */}
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 px-2 py-1 h-auto hover:text-green-900 hover:bg-green-50"
            onClick={handleReply}
          >
            <MessageCircle className="h-4 w-4" />
            Répondre
          </Button>
          {/* <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 px-2 py-1 h-auto hover:text-purple-600 hover:bg-purple-50"
          >
            <Share2 className="h-4 w-4" />
            Partager
          </Button> */}
        </div>
      </div>
    </div>
  );
}
