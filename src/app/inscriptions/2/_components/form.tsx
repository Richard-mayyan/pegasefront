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
import { ACCESS_TOKEN_KEY, ROUTES } from "@/lib/constants";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { RegisterProfileEnum } from "@/logic/domain/entities";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

export default function Form() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");
  const [email, setEmail] = useState(emailParam || "");
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

      const result = await authRepo.confirmAccountWithCode(confirmData);
      localStorage.setItem(ACCESS_TOKEN_KEY, result.access_token);
      toast.success("Compte confirmé avec succès !");

      if (result.user.profile === RegisterProfileEnum.Student) {
        window.location.href = ROUTES.student.home;
        return;
      }
      if (result.user.communities && result.user.communities.length > 0) {
        window.location.href = ROUTES.modules;
      } else {
        window.location.href = ROUTES.onboarding1;
      }
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
            Nous vous avons envoyé un code. Entrez-le !
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Entrez le code envoyé à votre adresse email <strong>{email}</strong>{" "}
            dans le champ suivant pour vérifier votre compte
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* <div className="space-y-2">
            <Input
              type="email"
              placeholder="Votre adresse email"
              disabled
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
              required
            />
          </div> */}

          {/* Code verification input - replaced with InputOTP */}
          {email && (
            <div className="">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={setCode}
                containerClassName="justify-center"
              >
                <InputOTPGroup>
                  <InputOTPSlot className="h-[50px]" index={0} />
                  <InputOTPSlot className="h-[50px]" index={1} />
                  <InputOTPSlot className="h-[50px]" index={2} />
                  <InputOTPSlot className="h-[50px]" index={3} />
                  <InputOTPSlot className="h-[50px]" index={4} />
                  <InputOTPSlot className="h-[50px]" index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          {email && (
            <Button
              type="submit"
              variant="default"
              className="w-full rounded-lg h-12 bg-customBg hover:bg-customBg-hover"
              disabled={isLoading}
            >
              {isLoading ? "Vérification..." : "Continuer"}
            </Button>
          )}
        </form>

        {/* Secondary Actions */}
        <div className="space-y-4 text-center">
          <p className="text-gray-600 text-sm">
            Vous n'avez pas reçu de mail ? Vérifiez vos spams pour{" "}
            <button
              onClick={handleResendCode}
              disabled={isResending}
              className="text-customBg underline hover:text-customBg-hover cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? "Envoi..." : "Réessayez"}
            </button>
          </p>

          <p className="text-gray-600 text-sm">
            J'ai déjà un compte.{" "}
            <a
              href="/login"
              className="text-customBg underline hover:text-customBg-hover"
            >
              Connectez-vous !
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
