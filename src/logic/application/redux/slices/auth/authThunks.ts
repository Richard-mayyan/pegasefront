// import { InMemoryAuthRepository } from "@/logic/infra/repos/InMemroyAuthRepo";
import { loginPending, loginSuccess, loginFailure } from "./authSlice";
import { AppExtraArguments, AppThunk } from "@/logic/application/redux/store";

export const loginUser =
  (email: string, password: string): AppThunk =>
  async (dispatch, getState, extraArgument) => {
    // dispatch(loginPending());
    // try {
    //   const loginUC = new LoginUserUseCase(extraArgument.authRepo);
    //   const user = await loginUC.execute(email, password);
    //   dispatch(loginSuccess(user));
    // } catch (err) {
    //   dispatch(loginFailure("Invalid login"));
    // }
  };
