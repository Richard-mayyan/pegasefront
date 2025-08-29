"use client";

import { useAuth } from "@/components/layouts/AuthProvider";
import { useEffect } from "react";
import { ROUTES } from "@/lib/constants";
import { RegisterProfileEnum } from "@/logic/domain/entities";

export default function StudLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return; // AuthProvider will redirect unauthenticated users
    if (user.profile !== RegisterProfileEnum.Student) {
      window.location.href = ROUTES.connection;
    }
  }, [user]);

  return <>{children}</>;
}
