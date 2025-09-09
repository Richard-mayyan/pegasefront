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
import { AxiosError } from "axios";
import { authRepo } from "@/logic/infra/di/container";
import { useRouter } from "next/navigation";
import {
  ACCESS_TOKEN_KEY,
  handleApiError,
  ROUTES,
  sendUserToCodeSent,
} from "@/lib/constants";
import { getdefaultValue } from "@/lib/utils";
import AppLogo from "@/components/ui/app-logo";
import { useAuth } from "@/components/layouts/AuthProvider";
import { PasswordRequirements } from "@/components/ui/password-requirements";
import { APP_ENVS } from "@/logic/infra/config/envs";
import { RegisterProfileEnum } from "@/logic/domain/entities";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAuth();

  const {
    register,
    formState: { errors },
    reset,
    setValue,
    handleSubmit,
    watch,
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
      if (!data.user.isEmailConfirmed) {
        sendUserToCodeSent(data.user.email);
      }
      if (data?.user.profile === RegisterProfileEnum.Student) {
        router.replace(ROUTES.student.home);
      } else {
        if (data.user.communities && data.user.communities.length > 0) {
          window.location.href = ROUTES.modules;
        } else {
          window.location.href = ROUTES.createCommunity;
        }
      }
    },
    onError(error, variables, context) {
      handleApiError(error as any);
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
            Content de vous revoir !
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
          className="space-y-4 text-left"
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
            {/* <PasswordRequirements
              password={watch("password") || ""}
              show={!!watch("password")}
            /> */}
          </div>

          {!APP_ENVS.isProductionMode && (
            <div className="flex gap-2">
              <Button
                type="button"
                variant={"default"}
                onClick={() => {
                  mutation.mutate({
                    email: "coach@pegase.me",
                    password: "password",
                  });
                }}
              >
                COACH
                <Send className="w-4 h-4 ml-2" />
              </Button>

              <Button
                type="button"
                variant={"default"}
                onClick={() => {
                  mutation.mutate({
                    email: "student@pegase.me",
                    password: "password",
                  });
                }}
              >
                Etudiant
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
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
}
