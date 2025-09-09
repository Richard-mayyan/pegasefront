"use client";
import { Button } from "@/components/ui/button";
import { LinkIcon, Plus, Clock, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { coachingsRepo } from "@/logic/infra/di/container";
import { useAppData } from "@/components/layouts/AppDataProvider";
import AddCoachingForm from "../../mescoachings/1/_components/add-coaching-form";
import { useAuth } from "@/components/layouts/AuthProvider";
import { CoachingEntity } from "@/logic/domain/entities";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IMG_URL } from "@/lib/constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type PropsCoachingTooltip = {
  coaching: CoachingEntity;
};

function CoachingTooltip({ coaching }: PropsCoachingTooltip) {
  const { user } = useAuth();

  // Formatage de la date et heure
  const formatDateTime = (coaching: CoachingEntity) => {
    console.log(coaching);
    try {
      if (!coaching.startAt) return "Date non disponible";

      const startDate = new Date(coaching.startAt);
      const endDate = new Date(coaching.startAt);
      endDate.setMinutes(endDate.getMinutes() + (coaching.duration || 0));

      const formattedDate = startDate.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const startTime = startDate.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const endTime = endDate.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return `${formattedDate}; ${startTime} - ${endTime}`;
      // return `${coaching.startAt}`;
    } catch {
      return "Date non disponible";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-96 max-w-sm">
      {/* Header avec bouton fermer */}
      <div className="flex items-center justify-between p-4 pb-2">
        <h3 className="text-lg font-bold text-gray-900">{coaching.name}</h3>
        <button className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
          <X className="h-3 w-3 text-gray-600" />
        </button>
      </div>

      {/* Image du coaching */}
      <div className="px-4 pb-4">
        <div className="w-full h-48 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg flex items-center justify-center relative overflow-hidden">
          {/* Image de livres stylisée */}
          <div className="text-gray-500 text-center">
            <div className="text-2xl mb-1">📚</div>
            <p className="text-xs">Image du coaching</p>
          </div>
        </div>
      </div>

      {/* Informations du coaching */}
      <div className="px-4 pb-4 space-y-3">
        {/* Date et heure */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
            <Clock className="h-3 w-3 text-blue-600" />
          </div>
          <span className="text-gray-700 text-sm">
            {formatDateTime(coaching)}
          </span>
        </div>

        {/* Lien de la réunion */}
        {coaching.link && (
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
              <LinkIcon className="h-3 w-3 text-green-600" />
            </div>
            <span className="text-gray-700 text-sm break-all">
              <a
                href={coaching.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {coaching.link.length > 30
                  ? `${coaching.link.substring(0, 30)}...`
                  : coaching.link}
              </a>
            </span>
          </div>
        )}

        {/* Informations du coach */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={IMG_URL} alt="Coach" />
              <AvatarFallback className="text-xs">
                {user?.firstName && user?.lastName
                  ? `${user.firstName[0]}${user.lastName[0]}`
                  : "C"}
              </AvatarFallback>
            </Avatar>
            <span className="text-gray-700 text-sm font-medium">
              {user?.firstName} {user?.lastName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
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

  // Vue courante (mois/année)
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  // Coachings normalisés
  const [upcomingCoachings, setUpcomingCoachings] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await coachingsRepo.findAllCoachings();
        const normalized = (data || []).map((c: any) => {
          const start = new Date(c.startAt || c.start_date || c.start);
          const dateKey = `${start.getFullYear()}-${String(
            start.getMonth() + 1
          ).padStart(2, "0")}-${String(start.getDate()).padStart(2, "0")}`;
          return {
            date: start.toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            }),
            title: c.title || c.name || "Coaching",
            coach: c.coach
              ? `${c.coach.firstname || c.coach.firstName || ""} ${
                  c.coach.lastname || c.coach.lastName || ""
                }`.trim()
              : "Coach",
            time: start.toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            dateKey,
            startAt: c.startAt,
            duration: c.duration,
          };
        });
        setUpcomingCoachings(normalized);
      } catch (e) {
        setUpcomingCoachings([]);
      }
    };
    load();
  }, []);

  // Calcul des jours du mois courant avec cases vides en tête (alignement lundi)
  const { leadingBlanks, daysInMonth, monthLabel, year, month } =
    useMemo(() => {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth(); // 0-11
      const firstOfMonth = new Date(year, month, 1);
      const firstDayIndex = (firstOfMonth.getDay() + 6) % 7; // Monday = 0
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const monthLabel = firstOfMonth.toLocaleDateString("fr-FR", {
        month: "long",
        year: "numeric",
      });
      return {
        leadingBlanks: firstDayIndex,
        daysInMonth,
        monthLabel,
        year,
        month,
      };
    }, [viewDate]);

  const buildDateKey = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const goToPreviousMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  const goToNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };
  const { doIfUpgradeSubscription } = useAppData();
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const handleOpenAddForm = () => {
    setIsAddFormOpen(true);
  };

  const handleCloseAddForm = () => {
    setIsAddFormOpen(false);
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col lg:flex-row h-screen bg-white">
        {/* Main Calendar Area */}
        <div className="flex-1 flex flex-col p-3 sm:p-4 lg:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex items-baseline gap-2">
              <h1 className="text-xl sm:text-2xl font-bold capitalize">
                {monthLabel}
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Navigation buttons for mobile */}
              <div className="flex gap-2 sm:hidden">
                <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
                  ← Précédent
                </Button>
                <Button variant="outline" size="sm" onClick={goToNextMonth}>
                  Suivant →
                </Button>
              </div>
              <Button
                onClick={() => doIfUpgradeSubscription(handleOpenAddForm)}
                className="bg-customBg hover:bg-customBg-hover text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 text-sm sm:text-base"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Ajouter coaching</span>
                <span className="sm:hidden">Ajouter</span>
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-px border border-gray-200 rounded-lg overflow-hidden flex-1 min-h-0">
            {/* Days of week header */}
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="bg-gray-50 p-1 sm:p-2 text-center text-xs sm:text-sm font-semibold text-gray-700 border-b border-gray-200"
              >
                <span className="hidden sm:inline">{day}</span>
                <span className="sm:hidden">{day.substring(0, 3)}</span>
              </div>
            ))}

            {/* Empty cells for alignment */}
            {Array.from({ length: leadingBlanks }).map((_, i) => (
              <div
                key={`blank-${i}`}
                className="p-1 sm:p-2 border-t border-l bg-white h-16 sm:h-20 lg:h-28"
              />
            ))}

            {/* Calendar days */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const dateKey = buildDateKey(year, month, dayNum);
              const events = upcomingCoachings.filter(
                (e) => e.dateKey === dateKey
              );
              return (
                <div
                  key={dayNum}
                  className="relative p-1 sm:p-2 border-t border-l border-gray-200 bg-white flex flex-col items-start h-16 sm:h-20 lg:h-28 overflow-hidden"
                >
                  <span className="text-xs sm:text-sm font-medium text-gray-800">
                    {dayNum}
                  </span>
                  <div className="flex-1 w-full overflow-hidden">
                    {events.slice(0, 2).map((e: any, i: number) => (
                      <Tooltip key={i}>
                        <TooltipTrigger asChild>
                          <div className="text-xs text-gray-600 mt-1 truncate w-full text-left hover:text-blue-600 hover:underline cursor-pointer">
                            {e.title}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="p-0 border-0 shadow-none"
                        >
                          <CoachingTooltip coaching={e} />
                        </TooltipContent>
                      </Tooltip>
                    ))}
                    {events.length > 2 && (
                      <div className="text-xs text-gray-500 mt-1">
                        +{events.length - 2} autres
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar - Upcoming Coachings */}
        <aside className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 p-4 lg:p-6 flex flex-col overflow-y-auto max-h-96 lg:max-h-none">
          <h2 className="text-lg lg:text-xl font-bold mb-4">
            Coachings à venir
          </h2>
          <div className="space-y-3 lg:space-y-4">
            {upcomingCoachings.length > 0 ? (
              upcomingCoachings.map((coaching, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-left cursor-pointer">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">
                        {coaching.date}
                      </p>
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                        {coaching.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {coaching.coach}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {coaching.time}
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="left"
                    className="p-0 border-0 shadow-none"
                  >
                    <CoachingTooltip coaching={coaching} />
                  </TooltipContent>
                </Tooltip>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p className="text-sm">Aucun coaching prévu</p>
              </div>
            )}
          </div>
        </aside>

        {/* Add Coaching Modal */}
        {isAddFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
              <AddCoachingForm onClose={handleCloseAddForm} />
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
