"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Send, Users, User } from "lucide-react";
import {
  RegisterProfileEnum,
  RegisterRegisterProfileEnum,
} from "@/logic/domain/entities";
import Image from "next/image";

interface ProfileSelectionProps {
  onProfileSelect: (profile: RegisterProfileEnum) => void;
}

export const ProfileSelection: React.FC<ProfileSelectionProps> = ({
  onProfileSelect,
}) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
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
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-black">
            Choisissez votre profil
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Sélectionnez le type de compte que vous souhaitez créer.
          </p>
        </div>

        {/* Profile Selection Cards */}
        <div className="space-y-4">
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-teal-500"
            onClick={() => onProfileSelect(RegisterProfileEnum.Student)}
          >
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Etudiant</CardTitle>
                  <CardDescription>
                    Accédez aux cours et suivez votre progression
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Accès aux cours et leçons</li>
                <li>• Suivi de votre progression</li>
                <li>• Participation aux discussions</li>
                <li>• Notes personnelles</li>
              </ul>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-teal-500"
            onClick={() => onProfileSelect(RegisterProfileEnum.Coach)}
          >
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-customBg" />
                </div>
                <div>
                  <CardTitle className="text-lg">Coach</CardTitle>
                  <CardDescription>
                    Créez et gérez vos cours pour vos élèves
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Création de cours et leçons</li>
                <li>• Gestion de vos classes</li>
                <li>• Suivi des progrès de vos élèves</li>
                <li>• Outils de coaching avancés</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Vous pourrez modifier votre profil plus tard dans les paramètres.
          </p>
        </div>
      </div>
    </div>
  );
};
