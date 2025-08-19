import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth/authSlice";
import { authRepo } from "@/logic/infra/di/container";
import { IAuthRepo } from "@/logic/domain/repos/AuthRepo";

export interface AppExtraArguments {
  authRepo: IAuthRepo;
}

const extras: AppExtraArguments = {
  authRepo: authRepo,
};

export const createTestStoreFn = (extras: Partial<AppExtraArguments>) => {
  return configureStore({
    reducer: {
      authReducer,
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
