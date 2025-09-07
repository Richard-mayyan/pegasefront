import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Circle, Plus, Users } from "lucide-react";
import React from "react";
import CourseGrid from "./_components/course-grid";
// import SearchInput from "../_components/searchInput";

type Props = {};

function page({}: Props) {
  return (
    <div className="flex flex-col flex-1 p-6">
      {/* <SearchInput /> */}
      <CourseGrid />
    </div>
  );
}

export default page;
