"use client";
import { SIGNUP_FORM } from "@/app/(auth)/_components/constants/forms";
import { FormGenerator } from "@/components/global/form-generator";
import AppLoader from "@/components/global/loader/AppLoader";
import { AppOTPInput } from "@/components/global/opt-input";
import { Button } from "@/components/ui/button";
import { useAuthSignUp } from "@/hooks/authentication";
import { APP_ENVS } from "@/logic/infra/config/envs";
import { useEffect } from "react";
import { toast } from "sonner";

type Props = {};

const SignUpform = (props: Props) => {
  const { register, errors, getValues, setValue, startRegistration, mutation } =
    useAuthSignUp();

  useEffect(() => {
    if (!APP_ENVS.isProductionMode) {
      setValue("firstname", "firstname");
      setValue("lastname", "lastname");
      setValue("email", "richard.bathiebo.7@gmail.com");
      setValue("password", "Boujoumboura123@?");
    }
  }, []);

  return (
    <form
      className="flex flex-col gap-3 mt-10 max-w-lg mx-auto"
      onSubmit={startRegistration}
    >
      {/* {JSON.stringify(errors)}
      <br />
      {JSON.stringify(mutation.error)} */}
      {SIGNUP_FORM.map((field) => {
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
        <AppLoader isLoading={mutation.isLoading}>Soumettre</AppLoader>
      </Button>
    </form>
  );
};

export default SignUpform;
