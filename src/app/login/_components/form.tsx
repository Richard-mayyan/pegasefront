"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormGenerator } from "@/components/global/form-generator";
import { Button } from "@/components/ui/button";
import { Loader, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import {
  SIGNIN_FORM,
  SigninFormValues,
  SigninSchema,
} from "@/components/forms";
import z from "zod";
import { useMutation } from "react-query";
import { authRepo } from "@/logic/infra/di/container";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN_KEY, ROUTES } from "@/lib/constants";
import { getdefaultValue } from "@/lib/utils";
import AppLogo from "@/components/ui/app-logo";
import { RegisterProfileEnum } from "@/logic/domain/entities";

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    formState: { errors },
    reset,
    setValue,
    handleSubmit,
  } = useForm<SigninFormValues>({
    defaultValues: {
      email: getdefaultValue("richardfreelance1@gmail.com"),
      password: getdefaultValue("Password123@?"),
    },
    resolver: zodResolver(SigninSchema),
    mode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: (args: SigninFormValues) => {
      return authRepo.login(args);
    },

    onSuccess(data, variables, context) {
      toast.success("Connexion réussie !");
      localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
      reset();
      // router.replace(ROUTES.createCommunity);
      if (data?.user.profile === RegisterProfileEnum.Student) {
        router.replace(ROUTES.student.home);
      } else {
        router.replace(ROUTES.connection);
      }
    },
    onError(error, variables, context) {
      console.log(error);
      toast.error("Erreur ");
    },
  });

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <AppLogo size="md" />

        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-black">
            Bienvenue sur Pegase
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Connectez-vous à votre compte pour continuer.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit((v) => {
            mutation.mutate(v);
          })}
          className="space-y-4"
        >
          {/* Email Field */}
          <FormGenerator
            {...SIGNIN_FORM["email"]}
            register={register}
            errors={errors}
          />

          {/* Password Field */}
          <div className="relative">
            <FormGenerator
              {...SIGNIN_FORM["password"]}
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
                Se connecter
                <Send className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            Mot de passe oublié ?{" "}
            <Link
              href={ROUTES.forgotPassword}
              className="text-customBg hover:text-customBg-hover font-medium"
            >
              Réinitialisez-le ici
            </Link>
          </p>
          <p className="text-sm text-gray-700">
            Vous n'avez pas de compte ?{" "}
            <Link
              href={ROUTES.register}
              className="text-customBg hover:text-customBg-hover font-medium"
            >
              Créez-en un !
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
