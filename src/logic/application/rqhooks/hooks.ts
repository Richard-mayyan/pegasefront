import { useMutation } from "react-query";
import {
  CreateClientInput,
  CreateClientUseCase,
} from "../usecases/manage_members/CreateMemberUC";
import { useDeps } from "@/components/layouts/useDeps";

export const useCreateClient = () => {
  const { clientRepo } = useDeps()!;
  const createClientUC = new CreateClientUseCase(clientRepo);

  return useMutation({
    mutationFn: (input: CreateClientInput) => createClientUC.execute(input),
  });
};
