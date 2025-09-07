"use client";
import React from "react";
import Signup from "./_components/form";
import NewChapterForm from "./_components/add-chapter-form";
import AddLessonForm from "./_components/add-lesson-form";
import { useAuth } from "@/components/layouts/AuthProvider";

type Props = {};

function page({}: Props) {
  const { user } = useAuth();
  if (!user) return <div>No user...</div>;
  return (
    <div>
      {/* <div className=" mx-auto flex max-w-6xl space-x-10">
        <NewChapterForm />
        <AddLessonForm />
      </div> */}

      <div className="md:flex py-4 px-5 md:h-screen overflow-hidden  w-fit mx-auto">
        <div className="min-w-[550px] overflow-scroll hide-scrollbar">
          <Signup />
        </div>
        {/* <img className="object-cover h-full" src={"/onboarding2.png"} /> */}
      </div>
    </div>
  );
}

export default page;
