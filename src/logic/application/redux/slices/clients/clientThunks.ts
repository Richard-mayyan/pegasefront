import { Client } from "@/logic/domain/entities";
import { AppThunk } from "../../store";
import {
  createClientFailure,
  createClientPending,
  createClientSuccess,
} from "./clientSlice";
import { CreateClientUseCase } from "@/logic/application/usecases/manage_members/CreateMemberUC";

export const createClient =
  (data: Omit<Client, "id">): AppThunk =>
  async (dispatch, getState, extraArgument) => {
    dispatch(createClientPending());
    try {
      const useCase = new CreateClientUseCase(extraArgument.clientRepo);
      const newClient = await useCase.execute(data);
      dispatch(createClientSuccess(newClient));
    } catch (error) {
      dispatch(createClientFailure("Erreur lors de la création du client"));
    }
  };
