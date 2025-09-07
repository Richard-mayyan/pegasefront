"use client";

import React, { useState } from "react";
import { SignupForm } from "./_components/form";
import { RegisterProfileEnum } from "@/logic/domain/entities";
import { ProfileSelection } from "./_components/profile-selection";
import { useSearchParams } from "next/navigation";

type Props = {};

function page({}: Props) {
  const searchParams = useSearchParams();
  const profile = ["student", "coach"].includes(
    searchParams.get("profile") || ""
  )
    ? (searchParams.get("profile") as RegisterProfileEnum)
    : null;
  const [selectedProfile, setSelectedProfile] =
    useState<RegisterProfileEnum | null>(profile as RegisterProfileEnum | null);

  const handleBackToProfileSelection = () => {
    setSelectedProfile(null);
  };

  return (
    <div>
      <div className="md:flex py-4 px-5 md:h-screen overflow-hidden  w-fit mx-auto">
        <div className="min-w-[450px] overflow-scroll hide-scrollbar">
          {selectedProfile ? (
            <SignupForm
              selectedProfile={selectedProfile}
              onBack={handleBackToProfileSelection}
            />
          ) : (
            <ProfileSelection onProfileSelect={setSelectedProfile} />
          )}
        </div>
        {/* <img className="object-cover h-full" src={"/signupimg.png"} /> */}
      </div>
    </div>
  );
}

export default page;
