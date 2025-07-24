import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../redux/slices/auth/authSlice";
import { loginUser } from "../redux/slices/auth/authThunks";
import { appCreateStore, RootState } from "../redux/store";
import { AuthRepository } from "@/logic/domain/repos/AuthRepo";
import { User } from "@/logic/domain/entities";
import { InMemoryClientRepository } from "@/logic/infra/repos/InMemoryClientRepo";

// const mockRepo: AuthRepository = {
//   login: jest.fn((email, password) => {
//     if (email === 'test@example.com' && password === 'password') {
//       return Promise.resolve({ email });
//     }
//     return Promise.reject(new Error('Invalid login'));
//   }),
// };

// '^@/(.*)$': '<rootDir>/src/$1',  // Remplace l'alias @ par le chemin relatif correct

describe("loginUser thunk", () => {
  const mockRepo: AuthRepository = {
    login: function (email: string, password: string): Promise<User> {
      if (email === "test@example.com" && password === "password") {
        const u: User = {
          id: "1",
          name: "name",
          email: "test@example.com",
        };
        return Promise.resolve(u);
      }
      return Promise.reject(new Error("Invalid login"));
    },
  };

  const createTestStore = () =>
    appCreateStore({
      authRepo: mockRepo,
      clientRepo: new InMemoryClientRepository(),
    });

  it("should dispatch loginPending and loginSuccess on successful login", async () => {
    const store = createTestStore();

    const result = await store.dispatch<any>(
      loginUser("test@example.com", "password")
    );

    const state: RootState = store.getState();
    expect(state.authReducer.user?.email).toEqual("test@example.com");
  });

  it("should dispatch loginPending and loginFailure on failed login", async () => {
    const store = createTestStore();

    const result = await store.dispatch<any>(
      loginUser("wrong@email.com", "wrongpassword")
    );

    const state: RootState = store.getState();
    // expect(state.authReducer.status).toBe('error');
    expect(state.authReducer.error).toBe("Invalid login");
  });
});
