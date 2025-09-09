"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import AppLogo from "@/components/ui/app-logo";
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
        <AppLogo size="md" />

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
            className="w-full rounded-lg h-12 bg-customBg hover:bg-customBg-hover"
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
              className="text-customBg hover:text-customBg-hover font-medium"
            >
              Connectez-vous !
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
