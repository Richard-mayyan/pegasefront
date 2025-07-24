import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth/authSlice";
import { AuthRepository } from "@/logic/domain/repos/AuthRepo";
import { authRepo, membersRepo } from "@/logic/infra/di/container";
import { clientReducer } from "./slices/clients/clientSlice";
import { MemberRepository } from "@/logic/domain/repos/MembersRepo";

export interface AppExtraArguments {
  authRepo: AuthRepository;
  membersRepo: MemberRepository;
}

const extras: AppExtraArguments = {
  authRepo: authRepo,
  membersRepo: membersRepo,
};

export const createTestStoreFn = (extras: Partial<AppExtraArguments>) => {
  return configureStore({
    reducer: {
      authReducer,
      clientReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extras,
        },
      }),
  });
};

export const appCreateStore = (extras: AppExtraArguments) => {
  return configureStore({
    reducer: {
      authReducer,
      clientReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extras,
        },
      }),
  });
};

export const store = appCreateStore(extras);
// export const store = configureStore({
//   reducer: {
//     authReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       thunk: {
//         extraArgument: extras
//       },
//     }),
// });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  AppExtraArguments,
  Action<string>
>;
