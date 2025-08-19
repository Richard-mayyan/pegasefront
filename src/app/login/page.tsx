import React from "react";
import { LoginForm } from "./_components/form";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants";
// import { SignupForm } from "./_components/form";

type Props = {};

function page({}: Props) {
  return redirect(ROUTES.connection);
  // return (
  //   <div>
  //     <div className="md:flex py-4 px-5 md:h-screen overflow-hidden  w-fit mx-auto">
  //       <div className="min-w-[450px]">
  //         <LoginForm />
  //       </div>
  //       <img className="object-cover h-full" src={"/signupimg.png"} />
  //     </div>
  //   </div>
  // );
}

export default page;
