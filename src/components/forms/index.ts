import { z } from "zod";

export type AuthFormProps = {
  id: string;
  type: "email" | "text" | "password";
  inputType: "select" | "input";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  name: string;
};

export const SignupSchema = z.object({
  firstName: z.string().min(1, { message: "Le prénom est requis." }),
  lastName: z.string().min(1, { message: "Le nom est requis." }),
  email: z.string().email({ message: "Email invalide." }),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit faire au moins 6 caractères." }),
});

export type SignupFormValues = z.infer<typeof SignupSchema>;

export const SigninSchema = z.object({
  email: z.string().email({ message: "Email invalide." }),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit faire au moins 6 caractères." }),
});

export type SigninFormValues = z.infer<typeof SigninSchema>;

// constants/forms/signup-form.ts

// export const SIGNUP_FORM: AuthFormProps[] = [
//   {
//     id: "firstName",
//     name: "firstName",
//     label: "Prénom",
//     placeholder: "Entrez votre prénom",
//     type: "text",
//     inputType: "input",
//   },
//   {
//     id: "lastName",
//     name: "lastName",
//     label: "Nom",
//     placeholder: "Entrez votre nom",
//     type: "text",
//     inputType: "input",
//   },
//   {
//     id: "email",
//     name: "email",
//     label: "Email",
//     placeholder: "exemple@mail.com",
//     type: "email",
//     inputType: "input",
//   },
//   {
//     id: "password",
//     name: "password",
//     label: "Mot de passe",
//     placeholder: "Créez un mot de passe",
//     type: "password",
//     inputType: "input",
//   },
// ];

export const SIGNUP_FORM: Record<string, AuthFormProps> = {
  firstName: {
    id: "firstName",
    name: "firstName",
    label: "Prénom",
    placeholder: "Entrez votre prénom",
    type: "text",
    inputType: "input",
  },
  lastName: {
    id: "lastName",
    name: "lastName",
    label: "Nom",
    placeholder: "Entrez votre nom",
    type: "text",
    inputType: "input",
  },
  email: {
    id: "email",
    name: "email",
    label: "Email",
    placeholder: "exemple@mail.com",
    type: "email",
    inputType: "input",
  },
  password: {
    id: "password",
    name: "password",
    label: "Mot de passe",
    placeholder: "Créez un mot de passe",
    type: "password",
    inputType: "input",
  },
};

export const SIGNIN_FORM: Record<string, AuthFormProps> = {
  email: {
    id: "email",
    name: "email",
    label: "Email",
    placeholder: "exemple@mail.com",
    type: "email",
    inputType: "input",
  },
  password: {
    id: "password",
    name: "password",
    label: "Mot de passe",
    placeholder: "Créez un mot de passe",
    type: "password",
    inputType: "input",
  },
};
