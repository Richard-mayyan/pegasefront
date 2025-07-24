import { Button } from "@/components/ui/button";
import { Home, FileText } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 text-center">
      <div className="w-full max-w-md space-y-8">
        {/* Congratulations Section */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Félicitations!</h1>
          <p className="text-lg text-gray-700">
            Votre classe :{" "}
            <span className="font-semibold">BeTech Education</span> a été
            configuré avec succès !
          </p>
          <Button className="px-8 py-6 mx-auto text-lg bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-md flex items-center gap-2">
            Accéder à ma classe
            <Home className="h-5 w-5" />
          </Button>
        </div>

        {/* Separator */}
        <div className="pt-8">
          <p className="text-gray-600 text-base font-semibold">
            Il est temps d'informer vos étudiants à travers le monde
          </p>
        </div>

        {/* Share Link Section */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <div className="flex-1 px-4 py-3 bg-gray-100 rounded-lg text-gray-700 text-sm text-left truncate">
            https://pegase.com/votreclasse
          </div>
          <Button className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-md flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Terminer la configuration
          </Button>
        </div>
      </div>
    </div>
  );
}
