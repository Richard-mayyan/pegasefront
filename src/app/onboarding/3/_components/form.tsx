import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Send, Plus, Trash2 } from "lucide-react";

export default function Component() {
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

        {/* Header with Add Chapter Button */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-black">5. Ajouter un cours</h2>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 w-full">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un chapitre
          </Button>
        </div>

        {/* Course Structure */}
        <div className="space-y-6">
          {/* Chapitre 1 */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Chapitre 1</h3>
              <div className="flex items-center space-x-3">
                <button className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center">
                  <Plus className="w-4 h-4 mr-1" />
                  Nouvelle leçon
                </button>
                <Switch
                  defaultChecked
                  className="data-[state=checked]:bg-teal-600"
                />
                <button className="text-red-500 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Lessons for Chapitre 1 */}
            <div className="space-y-3 ml-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">Leçon 1</span>
                <div className="flex items-center space-x-3">
                  <Switch
                    defaultChecked
                    className="data-[state=checked]:bg-teal-600"
                  />
                  <button className="text-red-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">Leçon 2</span>
                <div className="flex items-center space-x-3">
                  <Switch
                    defaultChecked
                    className="data-[state=checked]:bg-teal-600"
                  />
                  <button className="text-red-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">Leçon 3</span>
                <div className="flex items-center space-x-3">
                  <Switch
                    defaultChecked
                    className="data-[state=checked]:bg-teal-600"
                  />
                  <button className="text-red-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chapitre 2 */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Chapitre 2</h3>
              <div className="flex items-center space-x-3">
                <button className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center">
                  <Plus className="w-4 h-4 mr-1" />
                  Nouvelle leçon
                </button>
                <Switch
                  defaultChecked
                  className="data-[state=checked]:bg-teal-600"
                />
                <button className="text-red-500 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Lessons for Chapitre 2 */}
            <div className="space-y-3 ml-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">Leçon 1</span>
                <div className="flex items-center space-x-3">
                  <Switch
                    defaultChecked
                    className="data-[state=checked]:bg-teal-600"
                  />
                  <button className="text-red-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">Leçon 2</span>
                <div className="flex items-center space-x-3">
                  <Switch
                    defaultChecked
                    className="data-[state=checked]:bg-teal-600"
                  />
                  <button className="text-red-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Add Chapter Button */}
        <div className="flex justify-center pt-4">
          <Button className="bg-black hover:bg-gray-800 text-white px-6">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un chapitre
          </Button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
            Passer
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8">
            Suivant
            <Send className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
