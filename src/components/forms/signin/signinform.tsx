"use client";
import { SIGNIN_FORM } from "@/app/(auth)/_components/constants/forms";
import { FormGenerator } from "@/components/global/form-generator";
import { Button } from "@/components/ui/button";
import { useAuthSignIn } from "@/hooks/authentication";
import { APP_ENVS } from "@/logic/infra/config/envs";
import clsx from "clsx";
import { Loader } from "lucide-react";
import { useEffect } from "react";

type Props = {};

const SignInform = (props: Props) => {
  const { startLogin, register, errors, mutation, setValue } = useAuthSignIn();

  useEffect(() => {
    if (!APP_ENVS.isProductionMode) {
      setValue("email", "richard.bathiebo.7@gmail.com");
      setValue("password", "Boujoumboura123@?");
    }
  }, []);

  return (
    <form className="flex flex-col gap-3 mt-10" onSubmit={startLogin}>
      {JSON.stringify(errors)}
      <br />
      {JSON.stringify(mutation.error)}

      {SIGNIN_FORM.map((field) => {
        return (
          <FormGenerator
            {...field}
            key={field.id}
            register={register}
            errors={errors}
          />
        );
      })}

      <Button type="submit" className="rounded-2xl">
        {mutation.isLoading && (
          <Loader
            className={clsx("buttonClasses", {
              "animate-spin": mutation.isLoading,
            })}
          />
        )}

        {!mutation.isLoading && <p>Connexion avec email</p>}
      </Button>
    </form>
  );

  // <div>

  //     <FormGenerator enerator />
  // </div>
};

export default SignInform;
