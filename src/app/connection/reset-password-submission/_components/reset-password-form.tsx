"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import { authRepo } from "@/logic/infra/di/container";
import { ResetPasswordDto } from "@/logic/domain/repos/AuthRepo";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Récupérer email et code depuis les query params
  useEffect(() => {
    const emailParam = searchParams.get("email");
    const codeParam = searchParams.get("code");

    if (emailParam) setEmail(emailParam);
    if (codeParam) setCode(codeParam);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Adresse email manquante");
      return;
    }

    if (!code.trim()) {
      toast.error("Code de réinitialisation manquant");
      return;
    }

    if (!password.trim()) {
      toast.error("Veuillez entrer un nouveau mot de passe");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    setIsLoading(true);

    try {
      const resetPasswordData: ResetPasswordDto = {
        email: email.trim(),
        code: code.trim(),
        password: password.trim(),
      };

      await authRepo.resetPassword(resetPasswordData);
      toast.success("Mot de passe réinitialisé avec succès !");

      // Redirection vers la page de connexion
      router.push(ROUTES.connection);
    } catch (error) {
      console.error("Erreur lors de la réinitialisation:", error);
      toast.error("Erreur lors de la réinitialisation du mot de passe");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
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

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-black">
            Réinitialiser votre mot de passe
          </h2>
          {/* <p className="text-gray-600 text-base leading-relaxed">
            Entrez votre nouveau mot de passe pour finaliser la réinitialisation
          </p> */}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          {/* <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Adresse email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-gray-50"
              placeholder="Votre adresse email"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Code de réinitialisation
            </label>
            <Input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-12 bg-gray-50 font-mono text-center tracking-widest"
              placeholder="Code de réinitialisation"
              required
            />
          </div> */}

          {/* New Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Nouveau mot de passe
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 pr-10"
                placeholder="Nouveau mot de passe"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Le mot de passe doit contenir au moins 8 caractères
            </p>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 pr-10"
                placeholder="Confirmer le mot de passe"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            variant="default"
            className="w-full rounded-lg h-12 bg-teal-600 hover:bg-teal-700"
            disabled={isLoading}
          >
            {isLoading
              ? "Réinitialisation..."
              : "Réinitialiser le mot de passe"}
          </Button>
        </form>

        {/* Secondary Actions */}
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-700">
            <span className="font-bold">
              Vous vous souvenez du mot de passe ?{" "}
            </span>
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
