"use client";
import { useAuth } from "@/components/layouts/AuthProvider";
import ClientsLayout from "@/components/layouts/clientsLayout";
import { RegisterProfileEnum } from "@/logic/domain/entities";
import { ROUTES } from "@/lib/constants";
import { redirect } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";

type Props = {};

function page({}: Props) {
  // const users = await getUsersUC.execute();
  const { user } = useAuth();
  // const {
  //   isLoading,
  //   error,
  //   data: users,
  // } = useQuery({
  //   queryKey: ["getUsers"],
  //   queryFn: () => USE_CASES.members.getUsersUC.execute(),
  // });
  if (user?.profile === RegisterProfileEnum.Coach) {
    return redirect(ROUTES.modules);
  }
  if (user?.profile === RegisterProfileEnum.Student) {
    return redirect(ROUTES.student.home);
  }

  return (
    <ClientsLayout>
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Utilisateurs</h1>
        <h1 className="text-2xl font-bold mb-4">{JSON.stringify(user)} --ss</h1>
        <ul className="space-y-2"></ul>
      </main>
    </ClientsLayout>
  );
}

export default page;
