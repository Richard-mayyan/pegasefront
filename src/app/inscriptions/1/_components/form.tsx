"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormGenerator } from "@/components/global/form-generator";
import { Button } from "@/components/ui/button";
import { Loader, Send, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import {
  SIGNUP_FORM,
  SignupFormValues,
  SignupSchema,
} from "@/components/forms";
import z from "zod";
import { useMutation } from "react-query";
import { authRepo } from "@/logic/infra/di/container";
import { RegisterDto } from "@/logic/infra/repos/nodeapi/dtos";
import { ProfileEnum } from "@/logic/domain/entities";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import { getdefaultValue } from "@/lib/utils";
import Image from "next/image";

interface SignupFormProps {
  selectedProfile: ProfileEnum;
  onBack?: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  selectedProfile,
  onBack,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    formState: { errors },
    reset,
    setValue,
    handleSubmit,
  } = useForm<SignupFormValues>({
    defaultValues: {
      firstName: getdefaultValue("firstname"),
      lastName: getdefaultValue("lastname"),
      email: getdefaultValue("richard.bathiebo.7@gmail.com"),
      password: getdefaultValue("Password123@?"),
    },
    resolver: zodResolver(SignupSchema),
    mode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: (args: SignupFormValues) => {
      const dto: RegisterDto = {
        ...args,
        profile: selectedProfile,
      };
      return authRepo.register(dto);
    },

    onSuccess(data, variables, context) {
      toast.success("Compte créé avec succès !");
      reset();
      router.replace(ROUTES.codeSent);
    },
    onError(error, variables, context) {
      console.log(error);
      toast.error("Erreur ");
    },
  });

  const getProfileDisplayName = (profile: ProfileEnum) => {
    switch (profile) {
      case ProfileEnum.Standard:
        return "Utilisateur Standard";
      case ProfileEnum.Coach:
        return "Coach";
      default:
        return "Utilisateur";
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

        {/* Back Button */}
        {onBack && (
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </Button>
        )}

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-teal-600 font-medium">
              {getProfileDisplayName(selectedProfile)}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-black">Créer votre compte</h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Entrez les informations suivantes afin d'accéder à votre compte.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit((v) => {
            mutation.mutate(v);
          })}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormGenerator
              {...SIGNUP_FORM["lastName"]}
              register={register}
              errors={errors}
            />
            <FormGenerator
              {...SIGNUP_FORM["firstName"]}
              register={register}
              errors={errors}
            />
          </div>

          {/* Email Field */}
          <FormGenerator
            {...SIGNUP_FORM["email"]}
            register={register}
            errors={errors}
          />

          {/* Password Field */}
          <div className="relative">
            <FormGenerator
              {...SIGNUP_FORM["password"]}
              register={register}
              errors={errors}
            />
          </div>

          {/* Submit Button */}
          <Button
            variant={"roam"}
            type="submit"
            className="w-full rounded-lg h-12"
            disabled={loading}
          >
            {loading ? (
              <Loader className="animate-spin h-5 w-5" />
            ) : (
              <>
                Créer mon compte
                <Send className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            En créant votre compte, vous acceptez nos termes et conditions.
          </p>
          <p className="text-sm text-gray-700">
            J'ai déjà un compte.{" "}
            <Link
              href="/login"
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Connectez-vous !
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
