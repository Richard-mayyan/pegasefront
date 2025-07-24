import AddCoachingForm from "./_components/add-coaching-form";
import AddReservationForm from "./_components/add-reservation-form";
import CoachingsListTable from "./_components/coachings-list-table";
import CreateCoachingEmptyState from "./_components/create-coaching-empty-state";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-8 p-4">
      <CoachingsListTable />
      <div className="flex flex-wrap items-start justify-center gap-8">
        <CreateCoachingEmptyState />
        <AddReservationForm />
        <AddCoachingForm />
      </div>
    </div>
  );
}
