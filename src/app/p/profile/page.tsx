"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { apiClient } from "@/logic/infra/repos/nodeapi/axios";
import { toast } from "sonner";
import { useAppData } from "@/components/layouts/AppDataProvider";
import { useAuth } from "@/components/layouts/AuthProvider";

export default function Page() {
  const { user } = useAuth();

  console.log("user", user);
  const [firstname, setFirstname] = useState(user?.coach?.firstname || "");
  const [lastname, setLastname] = useState(user?.coach?.lastname || "");
  const [description, setDescription] = useState(
    user?.coach?.description || ""
  );
  const [photoPreview, setPhotoPreview] = useState<string>(
    user?.coach?.avatar || ""
  );
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstname || !lastname || !description) {
      toast.error("Tous les champs sont requis (y compris la photo)");
      return;
    }
    // if (
    //   (!firstname.trim() && !firstname) ||
    //   (!lastname.trim() && !lastname) ||
    //   (!description.trim() && !description) ||
    //   !photoFile
    // ) {
    //   console.log(firstname, lastname, description, photoFile);
    //   toast.error("Tous les champs sont requis (y compris la photo)");
    //   return;
    // }

    try {
      setSubmitting(true);
      const form = new FormData();
      form.append("firstname", firstname.trim());
      form.append("lastname", lastname.trim());
      form.append("description", description.trim());
      if (photoFile) {
        form.append("photo", photoFile);
      }

      await apiClient.patch("/user/coach", form);
      toast.success("Profil mis à jour avec succès");
    } catch (err) {
      console.error(err);
      toast.error("Échec de la mise à jour du profil");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-customBg rounded-lg flex items-center justify-center">
            <Image src="/logo.svg" alt="Pegase" width={20} height={16} />
          </div>
          <h1 className="text-xl font-bold text-black">Pegase</h1>
        </div>

        <h2 className="text-2xl font-bold text-black">
          Configurez votre profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Prénom
              </label>
              <Input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="Saisir le prénom"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Nom</label>
              <Input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Saisir le nom"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Photo de profil
            </label>
            <div className="flex items-center space-x-4">
              {photoPreview ? (
                <div className="relative">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <div className="flex-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" /> Choisir une image
                </Button>
                <p className="text-xs text-gray-500 mt-1">
                  Recommandé: 500px × 500px
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre activité..."
              className="min-h-[120px]"
            />
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="ghost" className="flex-1">
              Passer
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-customBg hover:bg-customBg-hover"
              disabled={submitting}
            >
              {submitting ? "Envoi..." : "Suivant"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
