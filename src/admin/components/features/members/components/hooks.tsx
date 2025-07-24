import { getdefaultValue } from "@/lib/utils";
import { CreateMemberInput } from "@/logic/application/usecases/manage_members/CreateMemberUC";
import { GENDERS } from "@/logic/domain/entities";
import { USE_CASES } from "@/logic/infra/di/container";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import z from "zod";

export const formSchema = z.object({
  id: z.string().optional(), // optionnel si généré automatiquement
  firstName: z.string().min(1, "Le prénom est requis."),
  lastName: z.string().min(1, "Le nom est requis."),
  email: z.string().email("Email invalide."),
  phone: z
    .string()
    .min(8, "Le numéro est trop court.")
    .max(15, "Le numéro est trop long.")
    .optional(),
  membershipStatus: z.enum(["active", "inactive", "pending"], {
    errorMap: () => ({ message: "Sélectionne un statut valide." }),
  }),
  membershipType: z.enum(["monthly", "yearly", "drop-in"], {
    errorMap: () => ({ message: "Sélectionne un type d'abonnement." }),
  }),
  // joinedAt: z.coerce.date({ message: "Date invalide." }),
  gender: z.nativeEnum(GENDERS, {
    errorMap: () => ({ message: "Sélectionne un genre valide." }),
  }),
});

export type ItemForm = z.infer<typeof formSchema>;

export const useCreateMember = (currentRow?: ItemForm) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    getValues,
    setValue,
  } = useForm<z.infer<typeof formSchema>>({
    defaultValues: currentRow ?? {
      firstName: getdefaultValue("firstname"),
      lastName: getdefaultValue("lastname"),
      email: getdefaultValue("member@gmail.com"),
      phone: getdefaultValue("+226528493939"),
      // membershipStatus: getdefaultValue("inactive"),
    },
    resolver: zodResolver(formSchema),
    mode: "all",
  });

  const mutation = useMutation({
    mutationFn: (input: ItemForm) => {
      const t: CreateMemberInput = {
        ...input,
        joinedAt: new Date(),
        profilePic: "",
      };
      return USE_CASES.members.createMemberUC.execute(t);
      // registerUC.execute(input)
    },
    onSuccess(data, variables, context) {
      toast.success("Compte créé");
      //   toast("'You submitted the following values:'", {
      //     description: (
      //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //       </pre>
      //     ),
      //   });
    },
    onError(error, variables, context) {
      toast.error("Erreur ");
    },
  });

  const createMember = handleSubmit(async (values) => {
    console.log("values ", values);

    // const a: RegisterPayload = {
    //   email: values.email,
    //   firstName: values.firstname,
    //   lastName: values.lastname,
    //   password: values.password,
    // };
    // mutation.mutate(a);
  });

  const router = useRouter();

  return {
    register,
    errors,
    reset,
    // onGenerateCode: () => {},
    // creating,
    // code,
    // setCode,
    createMember,
    getValues,
    setValue,
    mutation,
  };
};
