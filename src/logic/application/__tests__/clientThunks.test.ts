import {
  appCreateStore,
  createTestStoreFn,
  RootState,
} from "@/logic/application/redux/store";
import { createClient } from "@/logic/application/redux/slices/clients/clientThunks";
import { Client } from "@/logic/domain/entities";
import { ClientRepository } from "@/logic/domain/repos/MembersRepo";

describe("createClient thunk", () => {
  const clientInput = {
    firstName: "Sophie",
    lastName: "Martin",
    email: "sophie.martin@example.com",
    phone: "0666666666",
  };

  const createdClient: Client = {
    id: "abc123",
    ...clientInput,
  };

  const createTestStore = (repoOverride?: Partial<ClientRepository>) => {
    const mockRepo: ClientRepository = {
      createClient: jest.fn().mockResolvedValue(createdClient),
      ...repoOverride,
    };

    return createTestStoreFn({
      clientRepo: mockRepo,
    });
  };

  it("should dispatch success on valid client creation", async () => {
    const store = createTestStore();

    await store.dispatch<any>(createClient(clientInput));

    const state: RootState = store.getState();
    expect(state.clientReducer.clients).toContainEqual(createdClient);
    expect(state.clientReducer.loading).toBe(false);
    expect(state.clientReducer.error).toBe(null);
  });

  it("should dispatch failure on repo error", async () => {
    const store = createTestStore({
      createClient: jest.fn().mockRejectedValue(new Error("Échec")),
    });

    await store.dispatch<any>(createClient(clientInput));

    const state = store.getState();
    expect(state.clientReducer.loading).toBe(false);
    expect(state.clientReducer.error).toBe(
      "Erreur lors de la création du client"
    );
  });
});
