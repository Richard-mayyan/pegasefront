import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessageProps {
  avatarSrc: string;
  userName: string;
  timestamp: string;
  message: string;
  likes: number;
  comments: number;
}

export default function ChatMessage({
  avatarSrc,
  userName,
  timestamp,
  message,
  likes,
  comments,
}: ChatMessageProps) {
  return (
    <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
      <Avatar className="h-9 w-9">
        <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={userName} />
        <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm mb-1">
          <span className="font-semibold text-gray-800">{userName}</span>
          <span className="text-gray-500">/</span>
          <span className="text-gray-500">{timestamp}</span>
        </div>
        <p className="text-gray-700 text-xs  leading-relaxed whitespace-pre-wrap">
          {message}
        </p>
        <div className="flex items-center gap-4 mt-3 text-gray-500 text-sm">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 px-2 py-1 h-auto"
          >
            <ThumbsUp className="h-4 w-4" />
            {likes}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 px-2 py-1 h-auto"
          >
            <MessageCircle className="h-4 w-4" />
            {comments}
          </Button>
          {/* Assuming the third icon is for share/reply */}
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 px-2 py-1 h-auto"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
