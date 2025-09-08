import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Circle, Plus, Users } from "lucide-react";
import React from "react";
import CoursePlayerLayout from "./_components/course-player-layout";
import { useParams } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

function page({ params }: Props) {
  return (
    <div className="flex flex-col flex-1 p-6 w-full ">
      <CoursePlayerLayout />
    </div>
  );
}

export default page;
