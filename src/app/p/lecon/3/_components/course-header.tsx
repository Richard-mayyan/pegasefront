import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, X } from "lucide-react";

export default function CourseHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">
          Apprendre les bases de la Vente en e-commerce
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
          <span>1/13 cours</span>
          <Progress
            value={15}
            className="w-24 h-2 rounded-full bg-gray-200 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-teal-600"
          />
          <span>15%</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          Valider et continuer
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
