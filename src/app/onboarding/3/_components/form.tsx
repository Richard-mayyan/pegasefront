"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Send } from "lucide-react";
import { useOnboarding } from "../../context/OnboardingContext";
import { useMutation } from "react-query";
import { communityRepo } from "@/logic/infra/di/container";
import { CreateCommunityDto } from "@/logic/domain/repos/CommunityRepo";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppData } from "@/components/layouts/AppDataProvider";
import Image from "next/image";
import { ROUTES } from "@/lib/constants";

export default function Component() {
  const { data, updateData } = useOnboarding();
  const { setCommunity } = useAppData();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      // Créer la communauté avec toutes les données
      const communityData: CreateCommunityDto = {
        trial_days: "2",
        price: "299",
        name: data.name || "Ma Communauté",
        description: data.description || "",
        cover: data.cover || "",
        profil: data.profil || "default",
        logo: data.logo || "",
        coverPhotos: data.coverPhotos || [],
        color: data.color || "red",
        typography: data.typography || "manrope",
        settings: data.settings || {
          communityDiscussion: true,
          studentListVisibility: true,
          groupMeeting: true,
        },
      };

      console.log("Tentative de création de communauté avec:", communityData);

      const savedCommunity = await communityRepo.create(communityData);

      // Sauvegarder dans le contexte global
      setCommunity(savedCommunity);

      return { community: savedCommunity };
    },
    onSuccess: (result: any) => {
      toast.success("Configuration terminée avec succès !");
      console.log("Communauté sauvegardée:", result);

      // Rediriger vers la page onboarding/4
      setTimeout(() => {
        router.push("/onboarding/4");
      }, 1500);
    },
    onError: (error: any) => {
      toast.error("Erreur lors de la sauvegarde");
      console.error("Erreur:", error);
    },
  });

  const handleFinishConfiguration = () => {
    if (!data.name?.trim()) {
      toast.error("Le nom de la communauté est requis");
      return;
    }

    mutation.mutate();
  };

  const getSettings = () => {
    return (
      data.settings || {
        communityDiscussion: true,
        studentListVisibility: true,
        groupMeeting: true,
      }
    );
  };

  const settings = getSettings();

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Pegasus Logo"
              width={24}
              height={19}
              className="w-6 h-5"
            />
          </div>
          <h1 className="text-2xl font-bold text-black">Pegase</h1>
        </div>

        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-black">
            Derniers configurations
          </h2>
        </div>

        {/* Configuration Options */}
        <div className="space-y-6">
          {/* Option 1: Discussion en communauté */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-0.5">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-1 bg-gray-600 rounded-full"
                      ></div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Discussion en communauté
                  </h3>
                  <p className="text-sm text-gray-600">
                    Si vous désactivez cette fonctionnnalité, la messagerie sera
                    désactivé. Cela veut dire que vos étudiants ne pourrons plus
                    interagir entre eux.
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.communityDiscussion}
                onCheckedChange={(checked) =>
                  updateData({
                    settings: { ...settings, communityDiscussion: checked },
                  })
                }
                className="data-[state=checked]:bg-teal-600"
              />
            </div>
          </div>

          {/* Option 2: Visibilité de la liste des étudiants */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-0.5">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-1 bg-gray-600 rounded-full"
                      ></div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    La liste de mes Etudiants est visible par les membres de ma
                    classse
                  </h3>
                  <p className="text-sm text-gray-600">
                    Si vous désactivez cette fonctionnnalité, la messagerie sera
                    désactivé. Cela veut dire que vos étudiants ne pourrons plus
                    interagir entre eux.
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.studentListVisibility}
                onCheckedChange={(checked) =>
                  updateData({
                    settings: { ...settings, studentListVisibility: checked },
                  })
                }
                className="data-[state=checked]:bg-teal-600"
              />
            </div>
          </div>

          {/* Option 3: Meeting de groupe */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Meeting de groupe
                </h3>
              </div>
            </div>
            <Switch
              checked={settings.groupMeeting}
              onCheckedChange={(checked) =>
                updateData({
                  settings: { ...settings, groupMeeting: checked },
                })
              }
              className="data-[state=checked]:bg-teal-600"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-8">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-800 border border-gray-300"
            onClick={() => router.push("/onboarding/4")}
          >
            Passer
          </Button>
          <div className="flex space-x-4">
            <Button
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg"
              onClick={handleFinishConfiguration}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? (
                "Configuration en cours..."
              ) : (
                <>
                  Terminer la configuration
                  <Send className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
