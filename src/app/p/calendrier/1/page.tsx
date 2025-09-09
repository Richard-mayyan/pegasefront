import AddEventForm from "../_components/add-event-form";
import CalendarView from "../_components/calendar-view";
import NoCoachingEmptyState from "../_components/no-coaching-empty-state";

export default function Home() {
  return (
    <div className="h-screen bg-white overflow-hidden">
      <CalendarView />
      {/* <div className="flex flex-wrap items-start justify-center gap-8">
        <AddEventForm />
        <NoCoachingEmptyState />
      </div> */}
    </div>
  );
}
