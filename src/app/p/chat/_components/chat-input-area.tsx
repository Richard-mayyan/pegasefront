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
} from "lucide-react";

export default function ChatInputArea() {
  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-center gap-1 mb-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Smile className="h-4 w-4" />
          <span className="sr-only">Emoji</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Paperclip className="h-4 w-4" />
          <span className="sr-only">Attach file</span>
        </Button>
        <div className="h-6 w-[1px] bg-gray-200 mx-1" /> {/* Separator */}
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
      </div>
      <div className="relative flex items-center">
        <Textarea
          placeholder="Ecrivez..."
          className="flex-1 min-h-[40px] pr-10 resize-none rounded-lg border border-gray-300 focus-visible:ring-0 focus-visible:border-teal-600"
        />
        <Button
          size="icon"
          className="absolute right-2 bottom-2 h-8 w-8 rounded-full bg-teal-600 hover:bg-teal-700 text-white"
        >
          <ArrowUp className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  );
}
