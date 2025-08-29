"use client";

import { Button } from "@/components/ui/button";
import { Send, Plus, X } from "lucide-react";
import { useOnboarding } from "../../context/OnboardingContext";
import { useOnboardingNavigation } from "../../hooks/useOnboardingNavigation";
import { useState, useRef } from "react";
import Image from "next/image";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { fr as frLocale } from "@blocknote/core/locales";

export default function Component() {
  const { data, updateData } = useOnboarding();
  const { goToNextStep, goToPreviousStep, skipStep } =
    useOnboardingNavigation();
  const [description, setDescription] = useState(data.description || "");
  const [images, setCoverPhotos] = useState<string[]>(data.images || []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useCreateBlockNote({
    dictionary: frLocale,
    initialContent: (() => {
      try {
        return description ? JSON.parse(description) : undefined;
      } catch {
        return undefined;
      }
    })(),
  });

  const handleCoverPhotoAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && images.length < 5) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const newCoverPhotos = [...images, result];
        setCoverPhotos(newCoverPhotos);
        updateData({ images: newCoverPhotos });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPhotoRemove = (index: number) => {
    const newCoverPhotos = images.filter((_, i) => i !== index);
    setCoverPhotos(newCoverPhotos);
    updateData({ images: newCoverPhotos });
  };

  const handleNext = () => {
    goToNextStep(2);
  };

  const handlePrevious = () => {
    goToPreviousStep(2);
  };

  const handleSkip = () => {
    skipStep(2);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-customBg rounded-lg flex items-center justify-center">
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
          <h2 className="text-2xl font-bold text-black">
            4. Présentez votre communauté
          </h2>
        </div>

        {/* Photos de couverture */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Photos de couverture (max 5)
            </h3>
            <p className="text-sm text-gray-600">
              Ajoutez des photos pour présenter votre communauté
            </p>
          </div>

          {/* Image principale */}
          {images.length > 0 ? (
            <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={images[0]}
                alt="Photo principale de couverture"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Aucune photo de couverture</p>
            </div>
          )}

          {/* Galerie de photos */}
          <div className="flex space-x-3">
            {images.map((photo, index) => (
              <div key={index} className="relative">
                <div className="w-20 h-16 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={photo}
                    alt={`Photo de couverture ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => handleCoverPhotoRemove(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {images.length < 5 && (
              <button
                className="w-20 h-16 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Plus className="w-6 h-6 text-gray-400" />
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleCoverPhotoAdd}
            className="hidden"
          />
        </div>

        {/* Text Editor Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-black">
            Présentez votre communauté
          </h3>

          {/* BlockNote Editor */}
          <div className="border border-gray-200 rounded-lg">
            <BlockNoteView
              editor={editor}
              theme="light"
              onChange={() => {
                const json = JSON.stringify(editor.document);
                setDescription(json);
                updateData({ description: json });
              }}
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-800"
            onClick={handlePrevious}
          >
            Précédent
          </Button>
          <div className="flex space-x-4">
            {/* <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-800"
              onClick={handleSkip}
            >
              Passer
            </Button> */}
            <Button
              className="bg-customBg hover:bg-customBg-hover text-white px-8"
              onClick={handleNext}
            >
              Suivant
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
