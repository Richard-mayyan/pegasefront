import { MessageSquareX, ArrowDown } from "lucide-react";

export default function ChatEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center px-4">
      <div className="bg-teal-600/10 p-6 rounded-full mb-6">
        <MessageSquareX className="h-16 w-16 text-teal-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Zero message, commencez la discussion
      </h3>
      <ArrowDown className="h-12 w-12 text-teal-600 animate-bounce" />
      {/* Note: The curly arrow is a complex SVG. For exact replication, a custom SVG asset would be needed.
          This is a simplified representation using a standard Lucide icon. */}
    </div>
  );
}
