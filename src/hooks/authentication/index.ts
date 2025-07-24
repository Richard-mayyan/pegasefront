// import { onSignUpUser } from "@/actions/auth"
// import { AppConstants, ROUTES } from "@/constants/constants"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useMutation } from "@tanstack/react-query"
// import { useRouter } from "next/navigation"
// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { toast } from "sonner"
// import { z } from "zod"

// import { SignInSchema } from "@/components/forms/signin/schema"
// import { SignUpSchema } from "@/components/forms/signup/schema"
// export const useAuthSignIn = () => {
//   const { isLoaded, setActive, signIn } = useSignIn()
//   const {
//     register,
//     formState: { errors },
//     reset,
//     handleSubmit,
//   } = useForm<z.infer<typeof SignInSchema>>({
//     resolver: zodResolver(SignInSchema),
//     mode: "onBlur",
//   })
//   const router = useRouter()

//   const onClerkAuth = async (email: string, password: string) => {
//     if (!isLoaded)
//       return toast("Error", {
//         description: AppConstants.unexpectedErrorMsg,
//       })

//     try {
//       const authenticated = await signIn.create({
//         identifier: email,
//         password: password,
//       })

//       if (authenticated.status === "complete") {
//         reset()
//         await setActive({ session: authenticated.createdSessionId })
//         toast("Success", {
//           description: "Welcome back!",
//         })
//         router.push(ROUTES.signinCallback)
//       }
//     } catch (error: any) {
//       console.log("clerk auth ")
//       console.log(error.errors[0].code)

//       if (error.errors[0].code === "form_password_incorrect")
//         toast("Error", {
//           description: "email/password is incorrect try again",
//         })
//     }
//   }

//   const { mutate: initiateLoginFlow, isPending } = useMutation({
//     mutationFn: ({ email, password }: { email: string; password: string }) =>
//       onClerkAuth(email, password),
//   })

//   const onAuthenticatedUser = handleSubmit(async (values) => {
//     initiateLoginFlow({ email: values.email, password: values.password })
//   })

//   return {
//     onAuthenticatedUser,
//     isPending,
//     register,
//     errors,
//   }
// }

// export const useGoogleAuth = () => {
//   const { signIn, isLoaded: LoadedSignIn } = useSignIn()
//   const { signUp, isLoaded: LoadedSignUp } = useSignUp()

//   const signInWith = (strategy: OAuthStrategy) => {
//     if (!LoadedSignIn) return
//     try {
//       return signIn.authenticateWithRedirect({
//         strategy,
//         redirectUrl: "/callback",
//         redirectUrlComplete: ROUTES.signinCallback,
//       })
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const signUpWith = (strategy: OAuthStrategy) => {
//     if (!LoadedSignUp) return
//     try {
//       return signUp.authenticateWithRedirect({
//         strategy,
//         redirectUrl: ROUTES.callbackUrl,
//         redirectUrlComplete: ROUTES.callbackComplete,
//       })
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   return { signUpWith, signInWith }
// }

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { SignInSchema } from "@/components/forms/signin/schema";
import { SignUpSchema } from "@/components/forms/signup/schema";
import { useMutation } from "react-query";
import { User } from "@/logic/domain/entities";
import { loginUC, registerUC } from "@/logic/infra/di/container";
import { RegisterPayload } from "@/logic/application/usecases/auth/RegisterUserUC";
import { ROUTES } from "@/lib/constants";
import { useAuth } from "@/components/layouts/AuthProvider";

export const useAuthSignIn = () => {
  // const { isLoaded, setActive, signIn } = useSignIn()
  const {
    register,
    formState: { errors },
    reset,
    setValue,
    handleSubmit,
  } = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    mode: "onBlur",
  });
  const router = useRouter();
  const authContext = useAuth();

  const mutation = useMutation({
    mutationFn: (args: { email: string; password: string }) =>
      loginUC.execute(args.email, args.password),
    onSuccess(data, variables, context) {
      authContext.setUser(data);
      toast.success("Connecté avec succès");
      router.replace(ROUTES.home);
    },
    onError(error, variables, context) {
      console.log(error);
      toast.error("Erreur ");
    },
  });

  const startLogin = handleSubmit(async (values) => {
    console.log("values ", values);
    mutation.mutate(values);
  });

  return {
    setValue,
    startLogin,
    mutation,
    register,
    errors,
  };
};

export const useAuthSignUp = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    getValues,
    setValue,
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    mode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: (input: RegisterPayload) => registerUC.execute(input),
    onSuccess(data, variables, context) {
      toast.success("Compte créé");
    },
    onError(error, variables, context) {
      toast.error("Erreur ");
    },
  });

  const startRegistration = handleSubmit(async (values) => {
    console.log("values ", values);

    const a: RegisterPayload = {
      email: values.email,
      firstName: values.firstname,
      lastName: values.lastname,
      password: values.password,
    };
    mutation.mutate(a);
  });

  const router = useRouter();

  // const onGenerateCode = async (email: string, password: string) => {
  //   if (!isLoaded)
  //     return toast("Error", {
  //       description: AppConstants.unexpectedErrorMsg,
  //     })

  //   try {
  //     if (email && password) {
  //       await signUp.create({
  //         emailAddress: getValues("email"),
  //         password: getValues("password"),
  //       })

  //       await signUp.prepareEmailAddressVerification({
  //         strategy: "email_code",
  //       })

  //       setVerifying(true)
  //       console.log("verying passe a true")
  //     } else {
  //       return toast("Error", {
  //         description: "No fields must be empty",
  //       })
  //     }
  //   } catch (error: any) {
  //     console.log("error generating code")
  //     const c = error.errors[0].code
  //     console.log(c)
  //     if (c === "form_password_pwned") {
  //       toast("Attention", {
  //         description:
  //           "Ce mot de passe est retrouvé sur une liste de mots de passe hackés , veuillez en utiliser un autre",
  //       })
  //     }
  //     console.error(JSON.stringify(error, null, 2))
  //   }
  // }

  // const onInitiateUserRegistration = handleSubmit(async (values) => {
  //   if (!isLoaded)
  //     return toast("Error", {
  //       description: AppConstants.unexpectedErrorMsg,
  //     })

  //   try {
  //     setCreating(true)
  //     const completeSignUp = await signUp.attemptEmailAddressVerification({
  //       code,
  //     })

  //     if (completeSignUp.status !== "complete") {
  //       return toast("Error", {
  //         description: AppConstants.unexpectedErrorMsg,
  //       })
  //     }

  //     if (completeSignUp.status === "complete") {
  //       if (!signUp.createdUserId) return

  //       const user = await onSignUpUser({
  //         firstname: values.firstname,
  //         lastname: values.lastname,
  //         clerkId: signUp.createdUserId,
  //         image: "",
  //       })
  //       reset()

  //       console.log("user.status ", user.status)

  //       if (user.status === 200) {
  //         toast("Success", {
  //           description: user.message,
  //         })
  //         await setActive({
  //           session: completeSignUp.createdSessionId,
  //         })
  //         router.push(ROUTES.groupCreate)
  //       }
  //       if (user.status !== 200) {
  //         toast("Error", {
  //           description: user.message + "action failed",
  //         })
  //         router.refresh()
  //       }
  //       setCreating(false)
  //       setVerifying(false)

  //       console.log("verify passe a false")
  //     } else {
  //       console.error(JSON.stringify(completeSignUp, null, 2))
  //     }
  //   } catch (error: any) {
  //     console.log("on a eu des erreurs de sign up")
  //     console.log(error.errors[0].code)
  //     console.error(JSON.stringify(error, null, 2))
  //   }
  // })

  return {
    register,
    errors,
    // onGenerateCode: () => {},
    // creating,
    // code,
    // setCode,
    startRegistration,
    getValues,
    setValue,
    mutation,
  };
};
