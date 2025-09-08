"use client";
import React, { useEffect, useState } from "react";
import AddCourseForm from "../2/_components/add-course-form";
import { useSearchParams } from "next/navigation";
import { classRepo } from "@/logic/infra/di/container";
import { ClassEntity } from "@/logic/domain/entities";

type Props = {};

function page({}: Props) {
  const search = useSearchParams();
  const editId = search.get("id");
  const [initialData, setInitialData] = useState<ClassEntity | null>(null);
  const [loading, setLoading] = useState(Boolean(editId));

  useEffect(() => {
    const load = async () => {
      if (!editId) return;
      try {
        setLoading(true);
        const data = await classRepo.findOne(editId);
        setInitialData(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [editId]);

  return (
    <div className="p-4">
      <AddCourseForm
        hasDialog={false}
        key={`add-course-${editId || "new"}`}
        isOpen={true}
        onClose={() => {}}
        editId={editId || undefined}
        initialClass={initialData}
      />
    </div>
  );
}

export default page;
