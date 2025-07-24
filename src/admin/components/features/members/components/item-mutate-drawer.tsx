import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Task } from "../data/schema";
import { toast } from "sonner";
import { SelectDropdown } from "@/admin/components/select-dropdown";
import { Member } from "@/logic/domain/entities";
import { CREATE_MEMBER_FORM } from "@/app/(auth)/_components/constants/forms";
import { FormGenerator } from "@/components/global/form-generator";
import { formSchema, ItemForm, useCreateMember } from "./hooks";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow?: ItemForm;
}

export function ItemMutateDrawer({ open, onOpenChange, currentRow }: Props) {
  const isUpdate = !!currentRow;

  const { reset, register, errors, createMember } = useCreateMember(currentRow);
  // const form = useForm<ItemForm>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: currentRow ?? {},
  // });

  // const onSubmit = (data: ItemForm) => {
  //   // do something with the form data
  //   onOpenChange(false);
  //   form.reset();
  // };

  // console.log("errors ", errors);

  const infos = {
    updateTitle: "Mettre à jour le member ",
    addTitle: "Ajouter un nouveau membre ",
    name: "Membre",
  };
  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        // form.reset();
        reset();
      }}
    >
      <SheetContent className="flex flex-col overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>
            {isUpdate ? "Mettre à jour" : "Créer"} {infos.name}
          </SheetTitle>
          <SheetDescription>
            {isUpdate ? infos.updateTitle : infos.addTitle}
            Appuyer sur enregistrer une fois terminé
          </SheetDescription>
        </SheetHeader>

        {/* onSubmit={startLogin} */}
        <form
          id="member-form"
          onSubmit={createMember}
          className="flex flex-col gap-3 mt-10"
        >
          {CREATE_MEMBER_FORM.map((field) => {
            return (
              <FormGenerator
                {...field}
                key={field.id}
                register={register}
                errors={errors}
              />
            );
          })}

          {/* <p className="text-lg">{JSON.stringify(errors)}</p> */}
        </form>
        <SheetFooter className="gap-2">
          <SheetClose asChild>
            <Button variant="outline">Fermer</Button>
          </SheetClose>
          <Button form="member-form" type="submit">
            Enregistrer
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
