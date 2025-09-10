"use client";
import React from "react";
import Signup from "./_components/form";
import { useAppData } from "@/components/layouts/AppDataProvider";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import { useAuth } from "@/components/layouts/AuthProvider";

type Props = {};

function page({}: Props) {
  const { user } = useAuth();

  return (
    <div>
      <div className="md:flex py-4 px-5 md:h-screen overflow-hidden  w-fit mx-auto">
        <div className="min-w-[450px] overflow-scroll hide-scrollbar">
          <Signup />
        </div>
        {/* <img className="object-cover h-full" src={"/onboarding1.png"} /> */}
      </div>
    </div>
  );
}

export default page;
