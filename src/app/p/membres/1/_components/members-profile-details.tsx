"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, MessageCircle, Ban, Star, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { IMG_URL } from "@/lib/constants";
import AreaChartComponent from "@/app/p/communaute/1/_components/area-chart-component";
import { Progress } from "@/components/ui/progress";

export default function MemberProfileDetails() {
  const [activeTab, setActiveTab] = useState("coaching"); // 'progress', 'coaching', 'subscriptions'

  const progressItems = [
    {
      thumbnail: IMG_URL,
      title: "Simple nourishment: Wholesome eating for Life in motion",
      dateAdded: "24 / 05 / 2025",
      date: "5 Juin 2025; 18:00 GMT+1",
      status: "En ligne il y a 2 semaines",
    },
    {
      thumbnail: IMG_URL,
      title: "Simple nourishment: Wholesome eating for Life in motion",
      dateAdded: "24 / 05 / 2025",
      date: "5 Juin 2025",
      status: "En ligne il y a 2 semaines",
    },
    {
      thumbnail: IMG_URL,
      title: "Simple nourishment: Wholesome eating for Life in motion",
      dateAdded: "24 / 05 / 2025",
      date: "5 Juin 2025",
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

  // Dummy data to simulate the undulating pattern
  const generateChartData = () => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      let value = 50 + Math.sin(i * 0.8) * 40 + Math.cos(i * 0.3) * 20;
      if (i < 5) {
        value = 10 + i * 5; // Initial ramp up
      } else if (i > 15) {
        value = 50 - (i - 15) * 5; // End ramp down
      }
      data.push({
        name: `Point ${i}`,
        value: parseInt(`${Math.max(0, Math.min(100, value)).toFixed(2)}`),
      });
    }
    return data;
  };

  const membersData = generateChartData();

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <ArrowLeft className="h-5 w-5 text-gray-700" />
            <span className="sr-only">Revenir à la liste</span>
          </Button>
          <span className="text-gray-700 text-sm">Revenir à la liste</span>
        </div>

        {/* Profile Info and Actions */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                className="object-cover"
                src={IMG_URL}
                alt="Jordan Heno"
              />
              <AvatarFallback>JH</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  Jordan Heno
                </h2>
                <div className="flex items-center gap-1 px-2 py-1 bg-lime-100 text-lime-700 rounded-full text-xs font-medium">
                  <Star className="h-3 w-3 fill-lime-700" />
                  Champions
                </div>
              </div>
              <p className="text-gray-500 text-sm">@JordanHeno.com</p>
              <p className="text-gray-500 text-sm">
                Join le: 5 Juin 2025; 19:45
              </p>
              <p className="text-teal-600 text-sm">
                En ligne il y a 2 semaines
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent"
            >
              <MessageCircle className="h-4 w-4" />
              Contacter
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent text-red-500 border-red-200 hover:bg-red-50"
            >
              <Ban className="h-4 w-4" />
              Bannir
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 w-fit mx-auto">
          <Button
            onClick={() => setActiveTab("progress")}
            className={getTabClass("progress")}
          >
            Progression
          </Button>
          <Button
            onClick={() => setActiveTab("coaching")}
            className={getTabClass("coaching")}
          >
            Coaching
          </Button>
          <Button
            onClick={() => setActiveTab("subscriptions")}
            className={getTabClass("subscriptions")}
          >
            Abonnements
          </Button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "progress" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="text-sm text-gray-500 border-b border-gray-200">
                  <th className="py-2 pr-4 font-medium">Nom</th>
                  <th className="py-2 px-4 font-medium">Date</th>
                  <th className="py-2 px-4 font-medium">Prix</th>
                  <th className="py-2 pl-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {progressItems.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    <td className="py-3 pr-4 text-sm text-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="relative w-24 h-16 rounded-md overflow-hidden">
                          <Image
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.title}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs text-gray-500">
                            Ajouté le: {item.dateAdded}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {item.date}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {item.status}
                    </td>
                    <td className="py-3 pl-4 text-sm text-gray-700 text-right">
                      <Button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <Play className="h-4 w-4" />
                        Lancer la seance
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "coaching" && (
          <div className=" bg-gray-50 rounded-lg text-center text-gray-500">
            <AreaChartComponent title={""} data={membersData} id={""} />

            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto">
                <thead>
                  <tr className="text-sm text-gray-500 border-b border-gray-200">
                    <th className="py-2 pr-4 font-medium">Nom</th>
                    <th className="py-2 pr-4 font-medium">ss</th>
                  </tr>
                </thead>
                <tbody>
                  {progressItems.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <td className="py-3  pr-4 text-sm text-gray-700">
                        <div className="flex  items-center gap-3">
                          <div className="relative w-44 h-16 rounded-md overflow-hidden">
                            <Image
                              src={item.thumbnail || "/placeholder.svg"}
                              alt={item.title}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                          <div className="flex flex-col pr-24">
                            <p className="font-medium">{item.title}</p>
                            <span className="text-xs text-gray-500">
                              Ajouté le: {item.dateAdded}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 w-1/3  pr-4 text-sm text-gray-700">
                        <div className="flex items-center gap-3">
                          <Progress value={32} /> <span>32%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === "subscriptions" && (
          <div className="p-6 bg-gray-50 rounded-lg text-center text-gray-500">
            Subscriptions content will go here.
          </div>
        )}
      </div>
    </div>
  );
}
