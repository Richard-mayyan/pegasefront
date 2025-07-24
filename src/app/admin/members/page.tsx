"use client";
import MembersAdmin from "@/admin/components/features/members";
import Tasks from "@/admin/components/features/tasks";
import Dashboard from "@/admin/dashboard";
import React from "react";

type Props = {};

function page({}: Props) {
  return (
    <div>
      <MembersAdmin />
    </div>
  );
}

export default page;
