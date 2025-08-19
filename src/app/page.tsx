"use client";
import { useAuth } from "@/components/layouts/AuthProvider";
import ClientsLayout from "@/components/layouts/clientsLayout";
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
