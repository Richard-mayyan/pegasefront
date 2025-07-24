import { ROUTES } from "@/lib/constants";
import { User } from "@/logic/domain/entities";
import { AuthRepository } from "@/logic/domain/repos/AuthRepo";
import { authRepo, USE_CASES } from "@/logic/infra/di/container";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    user: Omit<User, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => any;

  forgotPassword: (email: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
  // authRepo: AuthRepository;
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const currentUserQuery = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: () => authRepo.getCurrentUser(),
    onSuccess(data) {
      setUser(data);
    },
  });

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const loggedInUser = await authRepo.login(email, password);
      setUser(loggedInUser);
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    userData: Omit<User, "id" | "createdAt" | "updatedAt">
  ) => {
    setLoading(true);
    try {
      const registeredUser = await authRepo.register(userData);
      setUser(registeredUser);
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  const logout = async () => {
    setLoading(true);
    try {
      setUser(null);

      await USE_CASES.auth.logoutUC.execute();
      router.replace(ROUTES.login);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setLoading(true);
    try {
      await authRepo.forgotPassword(email);
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (newPassword: string) => {
    if (!user) throw new Error("User not logged in");
    setLoading(true);
    try {
      await authRepo.changePassword(user.id, newPassword);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        register,
        logout,
        forgotPassword,
        changePassword,
      }}
    >
      {/* {JSON.stringify(currentUserQuery.isLoading)} */}
      {currentUserQuery.isSuccess && children}
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
