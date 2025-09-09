"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Send,
  MessageSquare,
  Users,
  Video,
  MessageCircle,
  UserCheck,
} from "lucide-react";
import { useOnboarding } from "../../context/OnboardingContext";
import { useMutation } from "react-query";
import { communityRepo } from "@/logic/infra/di/container";
import { CreateCommunityDto } from "@/logic/domain/repos/CommunityRepo";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { useAppData } from "@/components/layouts/AppDataProvider";
import Image from "next/image";
import { ROUTES } from "@/lib/constants";
import AppLogo from "@/components/ui/app-logo";

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
        images: data.images || [],
        color: data.color || "#ff0000",
        typography: data.typography || "manrope",
        settings: data.settings || {
          communityChat: true,
          showStudentsList: true,
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
      // setTimeout(() => {
      window.location.href = ROUTES.onboarding4;
      // }, 1500);
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
        communityChat: true,
        showStudentsList: true,
        groupMeeting: true,
      }
    );
  };

  const settings = getSettings();

  if (!data.cover) {
    return redirect(ROUTES.onboarding2);
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Logo and Brand */}
        <AppLogo size="lg" showText={false} />

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
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
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
              <div className="flex-shrink-0 ml-4">
                <Switch
                  checked={settings.communityChat}
                  onCheckedChange={(checked) =>
                    updateData({
                      settings: { ...settings, communityChat: checked },
                    })
                  }
                  className="data-[state=checked]:bg-customBg"
                />
              </div>
            </div>
          </div>

          {/* Option 2: Visibilité de la liste des étudiants */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
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
              <div className="flex-shrink-0 ml-4">
                <Switch
                  checked={settings.showStudentsList}
                  onCheckedChange={(checked) =>
                    updateData({
                      settings: { ...settings, showStudentsList: checked },
                    })
                  }
                  className="data-[state=checked]:bg-customBg"
                />
              </div>
            </div>
          </div>

          {/* Option 3: Meeting de groupe */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    Meeting de groupe
                  </h3>
                  <p className="text-sm text-gray-600">
                    Activez les réunions de groupe pour permettre à vos
                    étudiants de se connecter en visioconférence.
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 ml-4">
                <Switch
                  checked={settings.groupMeeting}
                  onCheckedChange={(checked) =>
                    updateData({
                      settings: { ...settings, groupMeeting: checked },
                    })
                  }
                  className="data-[state=checked]:bg-customBg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-8">
          {/* <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-800 border border-gray-300"
            onClick={() => router.push("/onboarding/4")}
          >
            Passer
          </Button> */}
          <div className="flex space-x-4">
            <Button
              className="w-full rounded-lg h-12"
              variant={"roam"}
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
