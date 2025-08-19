"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authRepo } from "@/logic/infra/di/container";
import {
  ConfirmAccountDto,
  ResendCodeDto,
} from "@/logic/domain/repos/AuthRepo";
import { ROUTES } from "@/lib/constants";
import { toast } from "sonner";

export default function Form() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Veuillez entrer votre adresse email");
      return;
    }

    if (!code.trim()) {
      setError("Veuillez entrer le code de confirmation");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const confirmData: ConfirmAccountDto = {
        email: email.trim(),
        code: code.trim(),
      };

      await authRepo.confirmAccountWithCode(confirmData);
      toast.success("Compte confirmé avec succès !");

      // Redirection vers la page de connexion après confirmation réussie
      router.push(ROUTES.login);
    } catch (error) {
      console.error("Erreur lors de la confirmation:", error);
      setError("Code invalide ou expiré. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email.trim()) {
      setError("Veuillez d'abord entrer votre adresse email");
      return;
    }

    setIsResending(true);
    setError("");
    setSuccess("");

    try {
      const resendData: ResendCodeDto = {
        email: email.trim(),
      };

      await authRepo.resendCode(resendData);
      setSuccess("Un nouveau code a été envoyé à votre adresse email");
    } catch (error) {
      console.error("Erreur lors du renvoi du code:", error);
      setError("Erreur lors du renvoi du code. Veuillez réessayer.");
    } finally {
      setIsResending(false);
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
          <h2 className="text-3xl font-bold text-black">
            Nous vous avons envoyé un code. Entrez-le !
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Entrez le code envoyé à votre adresse email dans le champ suivant
            pour vérifier votre compte
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Entrez le code envoyé"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-12 text-center text-lg font-mono tracking-widest"
              maxLength={6}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
          </div>

          <Button
            type="submit"
            variant="default"
            className="w-full rounded-lg h-12 bg-teal-600 hover:bg-teal-700"
            disabled={isLoading}
          >
            {isLoading ? "Vérification..." : "Continuer"}
          </Button>
        </form>

        {/* Secondary Actions */}
        <div className="space-y-4 text-center">
          <p className="text-gray-600 text-sm">
            Vous n'avez pas reçu de mail ? Vérifiez vos spams pour{" "}
            <button
              onClick={handleResendCode}
              disabled={isResending}
              className="text-teal-600 underline hover:text-teal-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? "Envoi..." : "Réessayez"}
            </button>
          </p>

          <p className="text-gray-600 text-sm">
            J'ai déjà un compte.{" "}
            <a
              href="/login"
              className="text-teal-600 underline hover:text-teal-700"
            >
              Connectez-vous !
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
