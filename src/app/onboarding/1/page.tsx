import React from "react";
import Signup from "./_components/form";

type Props = {};

function page({}: Props) {
  return (
    <div>
      <div className="md:flex py-4 px-5 md:h-screen overflow-hidden  w-fit mx-auto">
        <div className="min-w-[450px] overflow-scroll hide-scrollbar">
          <Signup />
        </div>
        <img className="object-cover h-full" src={"/onboarding1.png"} />
      </div>
    </div>
  );
}

export default page;
