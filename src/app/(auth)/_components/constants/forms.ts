import { GENDERS } from "@/logic/domain/entities";

export type AuthFormProps = {
  id: string;
  type: "email" | "text" | "password";
  inputType: "select" | "input";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  name: string;
};

export const SIGNUP_FORM: AuthFormProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Prénom",
    name: "firstname",
    type: "text",
  },
  {
    id: "1",
    inputType: "input",
    placeholder: "Nom",
    name: "lastname",
    type: "text",
  },
  {
    id: "1",
    inputType: "input",
    placeholder: "Email",
    name: "email",
    type: "text",
  },
  {
    id: "1",
    inputType: "input",
    placeholder: "Password",
    name: "password",
    type: "password",
  },
];

export const SIGNIN_FORM: AuthFormProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Email",
    name: "email",
    type: "text",
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "Password",
    name: "password",
    type: "password",
  },
];

//

export const CREATE_MEMBER_FORM: AuthFormProps[] = [
  {
    id: "firstName",
    type: "text",
    inputType: "input",
    label: "Prénom",
    placeholder: "Entrez le prénom",
    name: "firstName",
  },
  {
    id: "lastName",
    type: "text",
    inputType: "input",
    label: "Nom",
    placeholder: "Entrez le nom",
    name: "lastName",
  },
  {
    id: "email",
    type: "email",
    inputType: "input",
    label: "Email",
    placeholder: "Entrez l’adresse email",
    name: "email",
  },
  {
    id: "phone",
    type: "text",
    inputType: "input",
    label: "Téléphone",
    placeholder: "Entrez le numéro de téléphone",
    name: "phone",
  },
  {
    id: "membershipStatus",
    type: "text",
    inputType: "select",
    label: "Statut",
    placeholder: "Sélectionnez un statut",
    name: "membershipStatus",
    options: [
      { id: "active", value: "active", label: "Actif" },
      { id: "inactive", value: "inactive", label: "Inactif" },
      { id: "pending", value: "pending", label: "En attente" },
    ],
  },
  {
    id: "membershipType",
    type: "text",
    inputType: "select",
    label: "Type d’abonnement",
    placeholder: "Sélectionnez un type",
    name: "membershipType",
    options: [
      { id: "monthly", value: "monthly", label: "Mensuel" },
      { id: "yearly", value: "yearly", label: "Annuel" },
      { id: "drop-in", value: "drop-in", label: "À la séance" },
    ],
  },
  {
    id: "gender",
    type: "text",
    inputType: "select",
    label: "Genre",
    placeholder: "Sélectionnez un genre",
    name: "gender",
    options: [
      { id: "1", value: GENDERS.Male, label: "Homme" },
      { id: "2", value: GENDERS.Female, label: "Femme" },
    ],
  },
  // {
  //   id: "joinedAt",
  //   type: "text",
  //   inputType: "input",
  //   label: "Date d’inscription",
  //   placeholder: "JJ/MM/AAAA",
  //   name: "joinedAt",
  // },
];
