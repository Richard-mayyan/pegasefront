import { Button } from "@/components/ui/button";
import { Sparkles, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AIAssistantPanel() {
  return (
    <aside className="w-80 bg-gray-100 border-l border-gray-200 p-6 flex flex-col items-center text-center animate-in slide-in-from-right duration-300">
      <div className="bg-customBg p-4 rounded-full mb-6">
        <Sparkles className="h-10 w-10 text-white" />
      </div>
      <p className="text-gray-700 text-sm mb-4">
        Hi, je suis pegase, ton assistant. Pose-moi des questions concernant la
        leçon et je t'apporterai des réponses
      </p>
      <p className="text-xs text-gray-500 mb-6">Ajouté le : 24 / 05 / 2025</p>

      <div className="flex flex-col gap-3 w-full mb-6">
        <Button
          variant="outline"
          className="w-full py-2 rounded-lg text-gray-700 border-gray-300 hover:bg-gray-200 bg-transparent"
        >
          Résume-moi la leçon.
        </Button>
        <Button
          variant="outline"
          className="w-full py-2 rounded-lg text-gray-700 border-gray-300 hover:bg-gray-200 bg-transparent"
        >
          Quelle action de je peu mettre en place ?
        </Button>
      </div>

      <div className="relative w-full mt-auto">
        <Input
          placeholder="Posez une question à Pegase"
          className="w-full pr-10 py-2 rounded-lg border border-gray-300 focus:ring-customBg focus:border-customBg"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
        >
          <Send className="h-4 w-4 text-gray-500" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </aside>
  );
}
