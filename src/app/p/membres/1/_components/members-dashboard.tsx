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
import {
  Hexagon,
  Sun,
  Star,
  Shield,
  Plus,
  MessageCircle,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function MembersDashboard() {
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'students', 'admins'

  const achievementCards = [
    {
      icon: Hexagon,
      title: "Explorateurs",
      count: 304,
      color: "text-green-500",
    },
    { icon: Sun, title: "Aventuriers", count: 304, color: "text-orange-500" },
    { icon: Star, title: "Champions", count: 304, color: "text-lime-500" },
    {
      icon: Shield,
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
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Ravis de te revoir, Alex
          </h1>
          <p className="text-gray-500 mt-1">
            Vois comment performe la communauté
          </p>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {achievementCards.map((card, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col items-center"
            >
              <div className="bg-white p-3 rounded-full mb-3">
                <card.icon className={cn("h-8 w-8", card.color)} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {card.title}
              </h3>
              <p className="text-3xl font-bold text-gray-800">{card.count}</p>
            </div>
          ))}
        </div>

        {/* Member Management Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <Button
              onClick={() => setActiveTab("all")}
              className={getTabClass("all")}
            >
              Tous
            </Button>
            <Button
              onClick={() => setActiveTab("students")}
              className={getTabClass("students")}
            >
              Étudiants
            </Button>
            <Button
              onClick={() => setActiveTab("admins")}
              className={getTabClass("admins")}
            >
              Admins
            </Button>
            <Select>
              <SelectTrigger className="w-[150px]">
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
          <div className="flex items-center gap-2">
            <Button className="bg-customBg hover:bg-customBg-hover text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un Étudiants
            </Button>
            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Exporter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Members Table */}
        <div className="overflow-x-auto">
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
