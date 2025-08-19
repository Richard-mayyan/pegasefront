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
import { useOnboarding } from "../../context/OnboardingContext";
import { useOnboardingNavigation } from "../../hooks/useOnboardingNavigation";
import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Form() {
  const { data, updateData } = useOnboarding();
  const { goToNextStep, skipStep } = useOnboardingNavigation();
  const [selectedColor, setSelectedColor] = useState(data.color || "red");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>(data.logo || "");
  const [coverPreview, setCoverPreview] = useState<string>(data.cover || "");

  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    updateData({ color });
  };

  const handleNameChange = (name: string) => {
    updateData({ name });
  };

  const handleTypographyChange = (typography: string) => {
    updateData({ typography });
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoPreview(result);
        updateData({ logo: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCoverPreview(result);
        // Ajouter la première photo de couverture à la liste
        const newCoverPhotos = [result, ...(data.coverPhotos || [])].slice(
          0,
          5
        );
        updateData({
          cover: result,
          coverPhotos: newCoverPhotos,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview("");
    updateData({ logo: "" });
    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
  };

  const removeCover = () => {
    setCoverFile(null);
    setCoverPreview("");
    updateData({ cover: "" });
    if (coverInputRef.current) {
      coverInputRef.current.value = "";
    }
  };

  const handleNext = () => {
    goToNextStep(1);
  };

  const handleSkip = () => {
    skipStep(1);
  };

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
            onChange={(e) => handleNameChange(e.target.value)}
            id="chapter-title"
            placeholder="Ex: BeTech Edu"
            value={data.name || ""}
          />
        </div>

        {/* Section 1: Photo du cours et couverture */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-black">
            1. Photo de la communauté et couverture
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo de la communauté */}
            <div className="space-y-3">
              <div className="space-y-1">
                <h4 className="font-semibold text-gray-900">
                  Logo de la communauté
                </h4>
                <p className="text-xs text-gray-600">
                  Recommandé: 500px x 500px
                </p>
              </div>
              <div className="relative">
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
                  <div
                    className="w-full h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => logoInputRef.current?.click()}
                  >
                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      Choisir un fichier
                    </span>
                  </div>
                )}
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Couverture de la communauté */}
            <div className="space-y-3">
              <div className="space-y-1">
                <h4 className="font-semibold text-gray-900">
                  Couverture de la communauté
                </h4>
                <p className="text-xs text-gray-600">
                  Nous recommandons au minimum une image de 1600 x 900px
                </p>
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
                  <div
                    className="w-full h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => coverInputRef.current?.click()}
                  >
                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500">
                      Choisir une quelconque image
                    </span>
                  </div>
                )}
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Couleur */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-black">
            2. Choisissez la couleur de votre communauté
          </h3>

          <div className="flex space-x-4">
            <button
              className={`w-8 h-8 bg-green-500 rounded-full border-2 ${
                selectedColor === "green"
                  ? "border-green-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
              onClick={() => handleColorChange("green")}
            ></button>
            <button
              className={`w-8 h-8 bg-blue-500 rounded-full border-2 ${
                selectedColor === "blue" ? "border-blue-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              onClick={() => handleColorChange("blue")}
            ></button>
            <button
              className={`w-8 h-8 bg-red-500 rounded-full border-2 ${
                selectedColor === "red" ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
              onClick={() => handleColorChange("red")}
            ></button>
            <button
              className={`w-8 h-8 bg-gray-200 rounded-full border-2 ${
                selectedColor === "gray" ? "border-gray-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2`}
              onClick={() => handleColorChange("gray")}
            ></button>
          </div>
        </div>

        {/* Section 3: Typographie */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-black">3. Typographie</h3>

          <Select
            defaultValue={data.typography || "manrope"}
            onValueChange={handleTypographyChange}
          >
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
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-800"
            onClick={handleSkip}
          >
            Passer
          </Button>
          <Button
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 w-full"
            onClick={handleNext}
          >
            Suivant
            <Send className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
