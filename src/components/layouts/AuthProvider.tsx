import { ROUTES } from "@/lib/constants";
import { UserEntity } from "@/logic/domain/entities";
import { authRepo } from "@/logic/infra/di/container";
import { RegisterDto } from "@/logic/infra/repos/nodeapi/dtos";
import { AxiosError } from "axios";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

interface AuthContextType {
  user: UserEntity | null;
  loading: boolean;
  // login: (email: string, password: string) => Promise<void>;
  register: (user: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: UserEntity | null) => any;

  // forgotPassword: (email: string) => Promise<void>;
  // changePassword: (newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
  // authRepo: AuthRepository;
}> = ({ children }) => {
  const [user, setUser] = useState<UserEntity | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  const currentUserQuery = useQuery({
    retry: false,
    queryKey: ["getCurrentUser"],
    queryFn: () => authRepo.getProfile(),
    onSuccess: (data) => {
      setUser(data);
    },
    refetchOnWindowFocus: false,
    onError: (e: AxiosError) => {
      console.log("erreur ", e);
      // const isProfilePage = pathname.startsWith("/p/profile/");
      const isLoginPage = pathname == ROUTES.login;
      const isRegisterPage = pathname == ROUTES.register;
      const isCodeSentPage = pathname == ROUTES.codeSent;
      const isAccountConfirmedPage = pathname == ROUTES.accountConfirmed;
      const isForgotPasswordPage = pathname == ROUTES.forgotPassword;
      const isConnectionPage = pathname == ROUTES.connection;
      const isResetPasswordSuccessPage =
        pathname == ROUTES.resetPasswordSuccess;
      const isResetPasswordSubmissionPage =
        pathname == ROUTES.resetPasswordSubmission;

      // console.log("ay ", {
      //   isLoginPage,
      //   isRegisterPage,
      // });

      if (
        !isLoginPage &&
        !isRegisterPage &&
        !isCodeSentPage &&
        !isAccountConfirmedPage &&
        !isForgotPasswordPage &&
        !isConnectionPage &&
        !isResetPasswordSuccessPage &&
        !isResetPasswordSubmissionPage
      ) {
        console.log("here");
        window.location.href = ROUTES.connection;
        // return redirect(ROUTES.login);
      }
    },
  });

  // const currentUserQuery = useQuery({
  //   queryKey: ["getCurrentUser"],
  //   queryFn: () => authRepo.getCurrentUser(),
  //   onSuccess(data) {
  //     setUser(data);
  //   },
  // });

  const register = async (userData: RegisterDto) => {
    setLoading(true);
    try {
      const registeredUser = await authRepo.register(userData);
      setUser(registeredUser);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      setUser(null);

      // await USE_CASES.auth.logoutUC.execute();
      router.replace(ROUTES.login);
    } finally {
      setLoading(false);
    }
  };

  // const forgotPassword = async (email: string) => {
  //   setLoading(true);
  //   try {
  //     await authRepo.forgotPassword(email);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const changePassword = async (newPassword: string) => {
  //   if (!user) throw new Error("User not logged in");
  //   setLoading(true);
  //   try {
  //     await authRepo.changePassword(user.id, newPassword);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        // login,
        register,
        logout,
        // forgotPassword,
        // changePassword,
      }}
    >
      {/* {JSON.stringify(currentUserQuery.isLoading)} */}
      {currentUserQuery.isFetched && children}
      {/* {children} */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
