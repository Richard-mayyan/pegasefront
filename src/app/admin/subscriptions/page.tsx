"use client";
import SubsAdmin from "@/admin/components/features/subscriptions";
import Tasks from "@/admin/components/features/tasks";
import Dashboard from "@/admin/dashboard";
import React from "react";

type Props = {};

function page({}: Props) {
  return (
    <div>
      <SubsAdmin />
    </div>
  );
}

export default page;
