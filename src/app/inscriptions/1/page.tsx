"use client";

import React, { useState } from "react";
import { SignupForm } from "./_components/form";
import { ProfileEnum } from "@/logic/domain/entities";
import { ProfileSelection } from "./_components/profile-selection";

type Props = {};

function page({}: Props) {
  const [selectedProfile, setSelectedProfile] = useState<ProfileEnum | null>(
    null
  );

  const handleBackToProfileSelection = () => {
    setSelectedProfile(null);
  };

  return (
    <div>
      <div className="md:flex py-4 px-5 md:h-screen overflow-hidden  w-fit mx-auto">
        <div className="min-w-[450px]">
          {selectedProfile ? (
            <SignupForm
              selectedProfile={selectedProfile}
              onBack={handleBackToProfileSelection}
            />
          ) : (
            <ProfileSelection onProfileSelect={setSelectedProfile} />
          )}
        </div>
        <img className="object-cover h-full" src={"/signupimg.png"} />
      </div>
    </div>
  );
}

export default page;
