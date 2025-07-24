import { DepsProvider } from "@/components/layouts/useDeps";
import { InMemoryAuthRepository } from "@/logic/infra/repos/InMemoryAuthRepo";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useCreateClient } from "../rqhooks/hooks";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

// Mock du client
const mockClient = {
  id: "123",
  firstName: "Sophie",
  lastName: "Martin",
  email: "sophie@example.com",
  phone: "0666666666",
};

// Mock du repository
const mockRepo = {
  createClient: jest.fn().mockResolvedValue(mockClient),
};

// Wrapper qui permet d'injecter les dépendances dans le contexte de React Query
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    <DepsProvider
      deps={{ clientRepo: mockRepo, authRepo: new InMemoryAuthRepository() }}
    >
      {children}
    </DepsProvider>
  </QueryClientProvider>
);

it("should call createClient and update state correctly", async () => {
  const CreateClientComponent = () => {
    const { mutate, isSuccess, error } = useCreateClient();

    return (
      <div>
        <button
          onClick={() =>
            mutate({
              firstName: "Sophie",
              lastName: "Martin",
              email: "sophie@example.com",
              phone: "0666666666",
            })
          }
        >
          Create Client
        </button>
        {isSuccess && <div data-testid="success">Client Created!</div>}
        {!!error && (
          <div data-testid="error">Error: {JSON.stringify(error)} </div>
        )}
      </div>
    );
  };
  render(<CreateClientComponent />, { wrapper });

  // Clique sur le bouton pour déclencher la mutation
  act(() => {
    screen.getByText("Create Client").click();
  });

  // Attends que l'élément de succès soit affiché
  await waitFor(() => screen.getByTestId("success"));

  // Vérifie que la mutation a été appelée et que le client a été créé
  expect(mockRepo.createClient).toHaveBeenCalledTimes(1);
  expect(screen.getByTestId("success")).toHaveTextContent("Client Created!");
});
