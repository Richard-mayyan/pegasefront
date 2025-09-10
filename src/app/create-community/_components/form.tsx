"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Upload, X } from "lucide-react";
import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import AppFontPicker from "@/components/ui/AppFontPicker";
import AppImagePicker from "@/components/ui/AppImagePicker";
import { useAuth } from "@/components/layouts/AuthProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/logic/infra/repos/nodeapi/axios";
import { ROUTES } from "@/lib/constants";
import { useAppData } from "@/components/layouts/AppDataProvider";
import { useMutation } from "react-query";
import { CreateCommunityDto } from "@/logic/domain/repos/CommunityRepo";
import { communityRepo } from "@/logic/infra/di/container";
import { toast } from "sonner";
import AppLogo from "@/components/ui/app-logo";
import { getdefaultValue } from "@/lib/utils";
export default function Form() {
  const { user } = useAuth();
  const router = useRouter();

  // Check subscription on component mount
  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const response = await apiClient.get("/user/subscriptions");
        console.log("response", response);
        // If no subscription or subscription is invalid, redirect to login
        if (!response.data || response.data.length === 0) {
          router.push(ROUTES.onboarding0);
        }
      } catch (error) {
        // If API call fails, redirect to login
        console.error("Error checking subscription:", error);
        router.replace(ROUTES.connection);
      }
    };

    if (user) {
      checkSubscription();
    }
  }, [user, router]);

  // const handleLogoChange = (file: File) => {
  //   // const file = event.target.files?.[0];
  //   if (file) {
  //     setLogoFile(file);
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const result = e.target?.result as string;
  //       // setLogoPreview(result);
  //       updateData({ logo: result });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setCoverFile(file);
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const result = e.target?.result as string;
  //       setCoverPreview(result);
  //       // Ajouter la première photo de couverture à la liste
  //       const newCoverPhotos = [result, ...(data.images || [])].slice(0, 5);
  //       updateData({
  //         cover: result,
  //         images: newCoverPhotos,
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  console.log("user", user);

  const { setCommunity } = useAppData();

  const [name, setName] = useState(getdefaultValue("nomdelacommunauté"));

  const mutation = useMutation({
    mutationFn: async () => {
      // Créer la communauté avec toutes les données
      const communityData: CreateCommunityDto = {
        trial_days: "2",
        price: "299",
        name: name,
        description: "",
        cover: "",
        profil: "default",
        logo: "",
        images: [],
        color: "#ff0000",
        typography: "manrope",
        settings: {
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
      window.location.href = ROUTES.modules;
      // }, 1500);
    },
    onError: (error: any) => {
      toast.error("Erreur lors de la sauvegarde");
      console.error("Erreur:", error);
    },
  });

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Logo and Brand */}
        <AppLogo size="lg" showText={false} />

        {/* Header Section */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-black">
            Configurons votre communauté
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Entrez les informations suivantes pour créer votre communauté.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="chapter-title">Nom de la communauté</Label>
          <Input
            onChange={(e) => setName(e.target.value)}
            id="chapter-title"
            placeholder="Ex: BeTech Edu"
            value={name}
          />
        </div>

        {/* Section 1: Photo du cours et couverture */}
        {/* <div className="space-y-6">
          <h3 className="text-xl font-bold text-black">
            1. Photo de la communauté et couverture
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="space-y-1">
                <h4 className="font-semibold text-gray-900">
                  Logo de la communauté
                </h4>
              </div>
              <div className="relative  h-32">
                {logoPreview ? (
                  <div className="w-full h-32 bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      onClick={removeLogo}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <AppImagePicker
                    className="w-full h-32"
                    fileList={logoFileList}
                    onChange={(list) => {
                      console.log(list);
                      setLogoFileList(list);
                      const file = list?.[0]?.originFileObj as File | undefined;
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          const result = e.target?.result as string;
                          console.log(result);
                          setLogoPreview(result);
                          updateData({ logo: result });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    maxCount={1}
                    multiple={false}
                    crop={{
                      aspect: 1,
                      shape: "round",
                      modalTitle: "Recadrer le logo",
                    }}
                  />
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <h4 className="font-semibold text-gray-900">
                  Couverture de la communauté
                </h4>
           
              </div>
              <div className="relative">
                {coverPreview ? (
                  <div className="w-full h-32 bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                    <img
                      src={coverPreview}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={removeCover}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <AppImagePicker
                    onPreview={(file) => {
                      console.log(file);
                      setLogoPreview(file.url);
                    }}
                    className="w-full h-32"
                    fileList={coverFileList}
                    onChange={(list) => {
                      console.log(list);
                      setCoverFileList(list);
                      const file = list?.[0]?.originFileObj as File | undefined;
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          const result = e.target?.result as string;
                          console.log(result);
                          setCoverPreview(result);

                          const newCoverPhotos = [
                            result,
                            ...(data.images || []),
                          ].slice(0, 5);
                          updateData({
                            cover: result,
                            images: newCoverPhotos,
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    maxCount={1}
                    multiple={false}
                    crop={{
                      aspect: 16 / 9,
                      shape: "round",
                      modalTitle: "Recadrer la couverture",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div> */}

        {/* Section 2: Couleur */}
        {/* <div className="space-y-6">
          <h3 className="text-xl font-bold text-black">
            2. Choisissez la couleur de votre communauté
          </h3>

          <div className="space-y-2">
            <Label>Couleur principale</Label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="h-12 w-20 p-1 bg-transparent border rounded cursor-pointer"
                aria-label="Choisir une couleur"
              />
        
              <Input
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="h-12"
              />
            </div>
          </div>
        </div> */}

        {/* Section 3: Typographie */}
        {/* <div className="space-y-6">
          <h3 className="text-xl font-bold text-black">3. Typographie</h3>

          <AppFontPicker
            value={data.typography || "Inter"}
            onChange={handleTypographyChange}
            previewText="Aperçu de la police pour votre communauté."
          />
        </div> */}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8">
          <Button
            disabled={mutation.isLoading}
            variant={"roam"}
            className="w-full rounded-lg h-12"
            onClick={() => mutation.mutate()}
          >
            {mutation.isLoading ? (
              "Configuration en cours..."
            ) : (
              <>
                Terminer
                <Send className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
