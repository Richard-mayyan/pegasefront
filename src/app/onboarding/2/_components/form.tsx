"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IMG_URL } from "@/lib/constants";
import {
  Send,
  Plus,
  Smile,
  RotateCcw,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading,
  List,
  Quote,
  Link,
  X,
} from "lucide-react";
import { useOnboarding } from "../../context/OnboardingContext";
import { useOnboardingNavigation } from "../../hooks/useOnboardingNavigation";
import { useState, useRef } from "react";
import Image from "next/image";

export default function Component() {
  const { data, updateData } = useOnboarding();
  const { goToNextStep, goToPreviousStep, skipStep } =
    useOnboardingNavigation();
  const [description, setDescription] = useState(data.description || "");
  const [coverPhotos, setCoverPhotos] = useState<string[]>(
    data.coverPhotos || []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [currentSelection, setCurrentSelection] = useState<{
    start: number;
    end: number;
  } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    updateData({ description: value });
  };

  const handleCoverPhotoAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && coverPhotos.length < 5) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const newCoverPhotos = [...coverPhotos, result];
        setCoverPhotos(newCoverPhotos);
        updateData({ coverPhotos: newCoverPhotos });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPhotoRemove = (index: number) => {
    const newCoverPhotos = coverPhotos.filter((_, i) => i !== index);
    setCoverPhotos(newCoverPhotos);
    updateData({ coverPhotos: newCoverPhotos });
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

  // Rich text editor functions
  const getCurrentSelection = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      return { start, end };
    }
    return null;
  };

  const applyFormat = (tag: string) => {
    if (textareaRef.current) {
      const selection = getCurrentSelection();
      if (selection) {
        const { start, end } = selection;
        const before = description.substring(0, start);
        const selected = description.substring(start, end);
        const after = description.substring(end);

        let formattedText = "";
        switch (tag) {
          case "bold":
            formattedText = `${before}<strong>${selected}</strong>${after}`;
            break;
          case "italic":
            formattedText = `${before}<em>${selected}</em>${after}`;
            break;
          case "underline":
            formattedText = `${before}<u>${selected}</u>${after}`;
            break;
          case "strikethrough":
            formattedText = `${before}<s>${selected}</s>${after}`;
            break;
          case "heading":
            formattedText = `${before}<h3>${selected}</h3>${after}`;
            break;
          case "list":
            formattedText = `${before}<ul><li>${selected}</li></ul>${after}`;
            break;
          case "quote":
            formattedText = `${before}<blockquote>${selected}</blockquote>${after}`;
            break;
          case "link":
            const url = prompt("Entrez l'URL du lien:");
            if (url) {
              formattedText = `${before}<a href="${url}" target="_blank">${selected}</a>${after}`;
            } else {
              return;
            }
            break;
        }

        handleDescriptionChange(formattedText);

        // Restaurer la sélection
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(
              start,
              start + tag.length + selected.length + tag.length
            );
          }
        }, 0);
      }
    }
  };

  const handleFormatClick = (tag: string) => {
    if (tag === "link") {
      applyFormat(tag);
    } else {
      const selection = getCurrentSelection();
      if (selection && selection.start !== selection.end) {
        applyFormat(tag);
      } else {
        // Insérer le tag sans sélection
        const tagMap: { [key: string]: string } = {
          bold: "<strong>texte en gras</strong>",
          italic: "<em>texte en italique</em>",
          underline: "<u>texte souligné</u>",
          strikethrough: "<s>texte barré</s>",
          heading: "<h3>Titre</h3>",
          list: "<ul><li>Élément de liste</li></ul>",
          quote: "<blockquote>Citation</blockquote>",
        };

        if (tagMap[tag]) {
          const currentPos = textareaRef.current?.selectionStart || 0;
          const before = description.substring(0, currentPos);
          const after = description.substring(currentPos);
          const newText = before + tagMap[tag] + after;
          handleDescriptionChange(newText);
        }
      }
    }
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
          {coverPhotos.length > 0 ? (
            <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={coverPhotos[0]}
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
            {coverPhotos.map((photo, index) => (
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
            {coverPhotos.length < 5 && (
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

          {/* Rich Text Editor Toolbar */}
          <div className="border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-1 p-3 border-b border-gray-200 bg-gray-50">
              <button
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                onClick={() => handleFormatClick("bold")}
                title="Gras"
              >
                <Bold className="w-4 h-4 text-gray-600" />
              </button>
              <button
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                onClick={() => handleFormatClick("italic")}
                title="Italique"
              >
                <Italic className="w-4 h-4 text-gray-600" />
              </button>
              <button
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                onClick={() => handleFormatClick("underline")}
                title="Souligné"
              >
                <Underline className="w-4 h-4 text-gray-600" />
              </button>
              <button
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                onClick={() => handleFormatClick("strikethrough")}
                title="Barré"
              >
                <Strikethrough className="w-4 h-4 text-gray-600" />
              </button>
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              <button
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                onClick={() => handleFormatClick("heading")}
                title="Titre"
              >
                <Heading className="w-4 h-4 text-gray-600" />
              </button>
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              <button
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                onClick={() => handleFormatClick("list")}
                title="Liste"
              >
                <List className="w-4 h-4 text-gray-600" />
              </button>
              <button
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                onClick={() => handleFormatClick("quote")}
                title="Citation"
              >
                <Quote className="w-4 h-4 text-gray-600" />
              </button>
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              <button
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                onClick={() => handleFormatClick("link")}
                title="Lien"
              >
                <Link className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Text Area */}
            <Textarea
              ref={textareaRef}
              placeholder="Tapez votre description ici... Utilisez les boutons ci-dessus pour formater votre texte."
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              className="min-h-32 border-0 resize-none focus:ring-0 text-base"
            />
          </div>

          {/* Preview HTML */}
          {description && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Aperçu HTML:
              </h4>
              <div className="text-xs text-gray-600 bg-white p-2 rounded border overflow-x-auto">
                {description}
              </div>
            </div>
          )}
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
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-800"
              onClick={handleSkip}
            >
              Passer
            </Button>
            <Button
              className="bg-teal-600 hover:bg-teal-700 text-white px-8"
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
