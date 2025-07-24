import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CalendarView() {
  const daysOfWeek = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  const calendarDays = Array.from({ length: 35 }).map((_, i) => ({
    day: (i % 7) + 1, // Simple day numbering for demonstration
    events: i % 3 === 0 ? ["Reunion"] : [], // Add some dummy events
    isHighlighted: i === 17, // Example for the red badge day
  }));

  const upcomingCoachings = [
    {
      date: "Jeudi, 1 septembre",
      title: "Coaching Prise de parole",
      coach: "Coach Bruce",
      time: "13:30",
    },
    {
      date: "Jeudi, 1 septembre",
      title: "Coaching Prise de parole",
      coach: "Coach Bruce",
      time: "13:30",
    },
    {
      date: "Jeudi, 1 septembre",
      title: "Coaching Prise de parole",
      coach: "Coach Bruce",
      time: "13:30",
    },
    {
      date: "Vendredi, 1 septembre",
      title: "Coaching Prise de parole",
      coach: "Coach Bruce",
      time: "13:30",
    },
    {
      date: "Vendredi, 1 septembre",
      title: "Coaching Prise de parole",
      coach: "Coach Bruce",
      time: "13:30",
    },
    {
      date: "Vendredi, 1 septembre",
      title: "Coaching Prise de parole",
      coach: "Coach Bruce",
      time: "13:30",
    },
  ];

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex flex-col p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-bold">Septembre 2025</h1>
            <span className="text-sm text-gray-500">02h30 GMT</span>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Ajouter un événement
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px border border-gray-200 rounded-lg overflow-hidden flex-1">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="bg-gray-50 p-2 text-center text-sm font-semibold text-gray-700 border-b border-gray-200"
            >
              {day}
            </div>
          ))}
          {calendarDays.map((dayData, index) => (
            <div
              key={index}
              className="relative p-2 border-t border-l border-gray-200 bg-white flex flex-col items-start h-28"
            >
              <span className="text-sm font-medium text-gray-800">
                {dayData.day}
              </span>
              {dayData.events.map((event, eventIndex) => (
                <div key={eventIndex} className="text-xs text-gray-600 mt-1">
                  {event}
                </div>
              ))}
              {dayData.isHighlighted && (
                <span className="absolute top-2 right-2 h-4 w-4 flex items-center justify-center rounded-full bg-red-500 text-white text-xs">
                  !
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar - Upcoming Coachings */}
      <aside className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Coachings à venir</h2>
        <div className="space-y-4">
          {upcomingCoachings.map((coaching, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <p className="text-sm text-gray-500 mb-1">{coaching.date}</p>
              <h3 className="font-semibold text-gray-800">{coaching.title}</h3>
              <p className="text-sm text-gray-600">{coaching.coach}</p>
              <p className="text-sm text-gray-600">{coaching.time}</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
