import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { GripVertical, Monitor, Zap } from "lucide-react";

export default function SettingsForm() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <Zap className="h-8 w-8 text-teal-600" />
          <span className="text-2xl font-bold">Pegase</span>
        </div>

        {/* Main Title */}
        <h2 className="text-2xl font-bold mb-6">6. Derniers configurations</h2>

        {/* Settings Items */}
        <div className="space-y-6">
          {/* Setting 1 */}
          <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start gap-4">
              <GripVertical className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex flex-col">
                <h3 className="font-bold text-lg">Discussion en communauté</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Si vous désactivez cette fonctionnalité, la messagerie sera
                  désactivée. Cela veut dire que vos étudiants ne pourront plus
                  interagir entre eux.
                </p>
              </div>
            </div>
            <Switch
              id="community-discussion"
              defaultChecked
              className="data-[state=checked]:bg-teal-600"
            />
          </div>

          {/* Setting 2 */}
          <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start gap-4">
              <GripVertical className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex flex-col">
                <h3 className="font-bold text-lg">
                  La liste de mes Etudiants est visible par les membres de ma
                  classse
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Si vous désactivez cette fonctionnalité, la messagerie sera
                  désactivée. Cela veut dire que vos étudiants ne pourront plus
                  interagir entre eux.
                </p>
              </div>
            </div>
            <Switch
              id="student-list-visibility"
              defaultChecked
              className="data-[state=checked]:bg-teal-600"
            />
          </div>

          {/* Setting 3 */}
          <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start gap-4">
              <Monitor className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex flex-col">
                <h3 className="font-bold text-lg">Meeting de groupe</h3>
              </div>
            </div>
            <Switch
              id="group-meeting"
              defaultChecked
              className="data-[state=checked]:bg-teal-600"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4 pt-8">
          <Button variant="outline" className="px-6 py-2 bg-transparent">
            Passer
          </Button>
          <Button className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white">
            Terminer la configuration
          </Button>
        </div>
      </div>
    </div>
  );
}
