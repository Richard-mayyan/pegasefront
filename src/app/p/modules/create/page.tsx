"use client";
import React from "react";
import AddCourseForm from "../2/_components/add-course-form";

type Props = {};

function page({}: Props) {
  return (
    <div className="">
      <AddCourseForm
        hasDialog={false}
        key={`add-course-`}
        isOpen={true}
        onClose={() => {}}
      />
    </div>
  );
}

export default page;
