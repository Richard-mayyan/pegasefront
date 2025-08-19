"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { ROUTES } from "@/lib/constants";
import { authRepo } from "@/logic/infra/di/container";
import { ForgotPasswordDto } from "@/logic/domain/repos/AuthRepo";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Veuillez entrer votre adresse email");
      return;
    }

    setIsLoading(true);

    try {
      const forgotPasswordData: ForgotPasswordDto = {
        email: email.trim(),
      };

      await authRepo.forgotPassword(forgotPasswordData);
      toast.success(
        "Un email de réinitialisation a été envoyé à votre adresse"
      );

      // Optionnel : rediriger vers la page de connexion
      router.push(ROUTES.resetPassword);
    } catch (error) {
      console.error("Erreur lors de la demande de réinitialisation:", error);
      toast.error("Erreur lors de l'envoi de l'email de réinitialisation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
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
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-black">Mot de passe oublié</h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Entrez votre email afin de restaurer votre mot de passe
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
              required
            />
          </div>

          <Button
            type="submit"
            variant="default"
            className="w-full rounded-lg h-12 bg-teal-600 hover:bg-teal-700"
            disabled={isLoading}
          >
            {isLoading ? "Envoi..." : "Restaurer le mot de passe"}
          </Button>
        </form>

        {/* Secondary Actions */}
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-700">
            <span className="font-bold">Je me souviens du mot de passe </span>
            <a
              href={ROUTES.connection}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Connectez-vous !
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
