"use client";

import { CoachingsDataProvider } from "@/components/layouts/CoachingsDataProvider";
import AddCoachingForm from "./_components/add-coaching-form";
import AddReservationForm from "./_components/add-reservation-form";
import CoachingsListTable from "./_components/coachings-list-table";
import CreateCoachingEmptyState from "./_components/create-coaching-empty-state";

export default function Home() {
  // return (
  //   <div className=" h-full bg-gray-100 flex flex-col items-center justify-center gap-8 p-4">
  //     Hello
  //   </div>
  // );
  return (
    <CoachingsDataProvider>
      <div className="flex-1 h-full bg-gray-100 flex flex-col items-center justify-center gap-8 p-4">
        <CoachingsListTable />
        {/*
        <div className="flex flex-wrap items-start justify-center gap-8">
          <CreateCoachingEmptyState />
          <AddReservationForm />
          <div className="w-full max-w-md">
            <AddCoachingForm />
          </div>
        </div> */}
      </div>
    </CoachingsDataProvider>
  );
}
