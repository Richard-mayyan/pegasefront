"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Trash2, Download, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { IMG_URL } from "@/lib/constants";

export default function CoachingsListTable() {
  const [activeTab, setActiveTab] = useState("coaching"); // 'coaching' or 'reservations'

  const coachings = [
    {
      name: "Maîtriser ses émotions en public",
      duration: "-",
      type: "Privé",
      reservation: {
        name: "Jordan Heno",
        handle: "@JordanHeno.com",
        avatar: IMG_URL,
      },
    },
    {
      name: "Maîtriser ses émotions en public",
      duration: "30:00",
      type: "Public",
      reservation: null,
    },
    {
      name: "Maîtriser ses émotions en public",
      duration: "30:00",
      type: "Privé",
      reservation: {
        name: "Jordan Heno",
        handle: "@JordanHeno.com",
        avatar: IMG_URL,
      },
    },
    {
      name: "Maîtriser ses émotions en public",
      duration: "30:00",
      type: "Privé",
      reservation: {
        name: "Jordan Heno",
        handle: "@JordanHeno.com",
        avatar: IMG_URL,
      },
    },
    {
      name: "Maîtriser ses émotions en public",
      duration: "30:00",
      type: "Privé",
      reservation: {
        name: "Jordan Heno",
        handle: "@JordanHeno.com",
        avatar: IMG_URL,
      },
    },
    {
      name: "Maîtriser ses émotions en public",
      duration: "30:00",
      type: "Privé",
      reservation: {
        name: "Jordan Heno",
        handle: "@JordanHeno.com",
        avatar: IMG_URL,
      },
    },
  ];

  const getTabClass = (tabName: string) =>
    cn(
      "px-4 py-2 rounded-lg text-base font-medium",
      activeTab === tabName
        ? "bg-gray-200 text-gray-800"
        : "bg-transparent text-gray-700 hover:bg-gray-100"
    );

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm w-full max-w-6xl mx-auto">
      {/* Top Tabs */}
      <div className="flex justify-center gap-2 mb-8">
        <Button
          onClick={() => setActiveTab("coaching")}
          className={getTabClass("coaching")}
        >
          Coaching
        </Button>
        <Button
          onClick={() => setActiveTab("reservations")}
          className={getTabClass("reservations")}
        >
          Réservations
        </Button>
      </div>

      {/* Header with actions */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Coachings</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent"
          >
            <Download className="h-4 w-4" />
            Exporter
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Ajouter coaching
          </Button>
        </div>
      </div>

      {/* Coachings Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="text-sm text-gray-500 border-b border-gray-200">
              <th className="py-2 pr-4 font-medium">Nom du coaching</th>
              <th className="py-2 px-4 font-medium">Durée</th>
              <th className="py-2 px-4 font-medium">Type</th>
              <th className="py-2 px-4 font-medium">Réservation</th>
              <th className="py-2 pl-4 font-medium text-right">Option</th>
            </tr>
          </thead>
          <tbody>
            {coachings.map((coaching, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 last:border-b-0"
              >
                <td className="py-3 pr-4 text-sm text-gray-700">
                  {coaching.name}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {coaching.duration}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {coaching.type}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {coaching.reservation ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          className="object-cover"
                          src={
                            coaching.reservation.avatar || "/placeholder.svg"
                          }
                          alt={coaching.reservation.name}
                        />
                        <AvatarFallback>
                          {coaching.reservation.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {coaching.reservation.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {coaching.reservation.handle}
                        </span>
                      </div>
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="py-3 pl-4 text-sm text-gray-700 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 px-3 py-1 h-auto bg-transparent"
                    >
                      <Pencil className="h-3 w-3" />
                      Modifier
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 px-3 py-1 h-auto   bg-transparent"
                    >
                      <Trash2 className="h-3 w-3" />
                      Supprimer
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
