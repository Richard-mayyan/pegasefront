import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Upload } from "lucide-react";

export default function Form() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
            <Send className="w-6 h-6 text-white rotate-45" />
          </div>
          <h1 className="text-2xl font-bold text-black">Pegase</h1>
        </div>

        {/* Header Section */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-black">
            Configurons votre classe
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Entrez les informations suivantes afin d'accéder à votre compte.
          </p>
        </div>

        {/* Section 1: Photo du cours et couverture */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-black">
            1. Photo du cours et couverture
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo de la classe */}
            <div className="space-y-3">
              <div className="space-y-1">
                <h4 className="font-semibold text-gray-900">
                  Logo de la classe
                </h4>
                <p className="text-xs text-gray-600">
                  Recommandé: 500px x 500px
                </p>
              </div>
              <div className="w-full h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload className="w-6 h-6 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">
                  Choisir un fichier
                </span>
              </div>
            </div>

            {/* Couverture de la classe */}
            <div className="space-y-3">
              <div className="space-y-1">
                <h4 className="font-semibold text-gray-900">
                  Couverture de la classe
                </h4>
                <p className="text-xs text-gray-600">
                  Nous recommandons au minimum une image de 1600 x 900px
                </p>
              </div>
              <div className="w-full h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload className="w-6 h-6 text-gray-400 mb-2" />
                <span className="text-xs text-gray-500">
                  Choisir une quelconque image
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Couleur */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-black">
            2. Choisissez la couleur de votre classe
          </h3>

          <div className="flex space-x-4">
            <button className="w-8 h-8 bg-green-500 rounded-full border-2 border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"></button>
            <button className="w-8 h-8 bg-blue-500 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"></button>
            <button className="w-8 h-8 bg-red-500 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"></button>
            <button className="w-8 h-8 bg-gray-200 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"></button>
          </div>
        </div>

        {/* Section 3: Typographie */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-black">3. Typographie</h3>

          <Select defaultValue="manrope">
            <SelectTrigger className="w-full bg-gray-100 border-0 rounded-lg h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manrope">Manrope</SelectItem>
              <SelectItem value="inter">Inter</SelectItem>
              <SelectItem value="roboto">Roboto</SelectItem>
              <SelectItem value="opensans">Open Sans</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
            Passer
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 w-full">
            Suivant
            <Send className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
