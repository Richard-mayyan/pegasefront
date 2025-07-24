import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Circle, Plus, Users } from "lucide-react";
import React from "react";
import SearchInput from "../_components/searchInput";
import CoursePlayerLayout from "./_components/course-player-layout";

type Props = {};

function page({}: Props) {
  return (
    <div className="flex flex-col flex-1 p-6">
      <CoursePlayerLayout />
    </div>
  );
}

export default page;
