import { z } from "zod";

// Fonction de validation personnalisée pour le mot de passe
const validatePassword = (password: string) => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Le mot de passe doit faire au moins 8 caractères");
  }

  if (!/\d/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins 1 chiffre");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins 1 lettre minuscule");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins 1 lettre majuscule");
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins 1 symbole");
  }

  return errors.length === 0 ? true : errors.join(". ");
};

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
  password: z.string().refine(validatePassword, {
    message: "Le mot de passe ne respecte pas les critères de sécurité",
  }),
});

export type SignupFormValues = z.infer<typeof SignupSchema>;

export const SigninSchema = z.object({
  email: z.string().email({ message: "Email invalide." }),
  password: z.string().refine(validatePassword, {
    message: "Le mot de passe ne respecte pas les critères de sécurité",
  }),
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
    placeholder: "Tapez votre mot de passe",
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
    placeholder: "Votre mot de passe",
    type: "password",
    inputType: "input",
  },
};
