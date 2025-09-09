"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, MessageCircle, Settings } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { membersIcons } from "@/lib/constants";

export default function MembersDashboard() {
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'students', 'admins'

  const achievementCards = [
    {
      icon: membersIcons.explorateurs,
      title: "Explorateurs",
      count: 304,
      color: "text-green-500",
    },
    {
      icon: membersIcons.aventuries,
      title: "Aventuriers",
      count: 304,
      color: "text-orange-500",
    },
    {
      icon: membersIcons.champions,
      title: "Champions",
      count: 304,
      color: "text-lime-500",
    },
    {
      icon: membersIcons.maitres,
      title: "Maîtres avancés",
      count: 304,
      color: "text-purple-500",
    },
  ];

  const members = [
    {
      name: "Jordan Heno",
      handle: "@JordanHeno.com",
      avatar: "/placeholder.svg?height=32&width=32",
      email: "jordan.heno@exemple.com",
      joinDate: "5 Juin 2025",
      status: "En ligne il y a 2 semaines",
    },
    {
      name: "Jordan Heno",
      handle: "@JordanHeno.com",
      avatar: "/placeholder.svg?height=32&width=32",
      email: "jordan.heno@exemple.com",
      joinDate: "5 Juin 2025",
      status: "En ligne il y a 2 semaines",
    },
    {
      name: "Jordan Heno",
      handle: "@JordanHeno.com",
      avatar: "/placeholder.svg?height=32&width=32",
      email: "jordan.heno@exemple.com",
      joinDate: "5 Juin 2025",
      status: "En ligne il y a 2 semaines",
    },
    {
      name: "Jordan Heno",
      handle: "@JordanHeno.com",
      avatar: "/placeholder.svg?height=32&width=32",
      email: "jordan.heno@exemple.com",
      joinDate: "5 Juin 2025",
      status: "En ligne il y a 2 semaines",
    },
    {
      name: "Jordan Heno",
      handle: "@JordanHeno.com",
      avatar: "/placeholder.svg?height=32&width=32",
      email: "jordan.heno@exemple.com",
      joinDate: "5 Juin 2025",
      status: "En ligne il y a 2 semaines",
    },
    {
      name: "Jordan Heno",
      handle: "@JordanHeno.com",
      avatar: "/placeholder.svg?height=32&width=32",
      email: "jordan.heno@exemple.com",
      joinDate: "5 Juin 2025",
      status: "En ligne il y a 2 semaines",
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
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Ravis de te revoir, Alex
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Vois comment performe la communauté
          </p>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {achievementCards.map((card, index) => (
            <div
              key={index}
              className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200 flex flex-col items-center"
            >
              <div className="bg-white p-2 sm:p-3 rounded-full mb-2 sm:mb-3">
                <img
                  src={card.icon}
                  alt={card.title}
                  className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
                />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-1 text-center">
                {card.title}
              </h3>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                {card.count}
              </p>
            </div>
          ))}
        </div>

        {/* Member Management Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
          {/* Tabs and Filter */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              <Button
                onClick={() => setActiveTab("all")}
                className={cn(getTabClass("all"), "whitespace-nowrap")}
              >
                Tous
              </Button>
              <Button
                onClick={() => setActiveTab("students")}
                className={cn(getTabClass("students"), "whitespace-nowrap")}
              >
                Étudiants
              </Button>
              <Button
                onClick={() => setActiveTab("admins")}
                className={cn(getTabClass("admins"), "whitespace-nowrap")}
              >
                Admins
              </Button>
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Aventuriers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="explorateurs">Explorateurs</SelectItem>
                <SelectItem value="aventuriers">Aventuriers</SelectItem>
                <SelectItem value="champions">Champions</SelectItem>
                <SelectItem value="maitres">Maîtres avancés</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Button className="bg-customBg hover:bg-customBg-hover text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 text-sm sm:text-base">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Ajouter un Étudiant</span>
              <span className="sm:hidden">Ajouter</span>
            </Button>
            <Select>
              <SelectTrigger className="w-full sm:w-[120px]">
                <SelectValue placeholder="Exporter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Members Table - Mobile Cards */}
        <div className="block lg:hidden space-y-4">
          {members.map((member, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                    />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.handle}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="p-2 h-8 w-8">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="p-2 h-8 w-8">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Email: </span>
                  <span className="text-gray-700">{member.email}</span>
                </div>
                <div>
                  <span className="text-gray-500">Rejoint: </span>
                  <span className="text-gray-700">{member.joinDate}</span>
                </div>
                <div>
                  <span className="text-gray-500">Status: </span>
                  <span className="text-gray-700">{member.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Members Table - Desktop */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="text-sm text-gray-500 border-b border-gray-200">
                <th className="py-2 pr-4 font-medium">Nom</th>
                <th className="py-2 px-4 font-medium">Email</th>
                <th className="py-2 px-4 font-medium">Join</th>
                <th className="py-2 px-4 font-medium">Status</th>
                <th className="py-2 pl-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <td className="py-3 pr-4 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                        />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{member.name}</span>
                        <span className="text-xs text-gray-500">
                          {member.handle}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {member.email}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {member.joinDate}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {member.status}
                  </td>
                  <td className="py-3 pl-4 text-sm text-gray-700 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 px-3 py-1 h-auto bg-transparent"
                      >
                        <MessageCircle className="h-3 w-3" />
                        Contacter
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 px-3 py-1 h-auto bg-transparent"
                      >
                        <Settings className="h-3 w-3" />
                        Gérer
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
