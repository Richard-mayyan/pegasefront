import React from "react";
import Signup from "./_components/form";
import { useSearchParams } from "next/navigation";

type Props = {};

function page({}: Props) {
  return (
    <div>
      <div className="md:flex py-4 px-5 md:h-screen overflow-hidden  w-fit mx-auto">
        <div className="min-w-[450px]">
          <Signup />
        </div>
        <img className="object-cover h-full" src={"/signupimg.png"} />
      </div>
    </div>
  );
}

export default page;
