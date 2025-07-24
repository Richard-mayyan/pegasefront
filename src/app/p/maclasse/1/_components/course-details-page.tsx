"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CourseDetailsAbout from "./course-details-about";
import CourseDetailsStats from "./course-details-stats";
import MembersMetrics from "./members-metrics";

export default function CourseDetailsPage() {
  const [activeTab, setActiveTab] = useState("about"); // 'about', 'stats', 'metrics'

  const getTabClass = (tabName: string) =>
    cn(
      "px-4 py-2 rounded-lg text-base font-medium",
      activeTab === tabName
        ? "bg-teal-600 text-white"
        : "bg-transparent text-gray-700 hover:bg-gray-100"
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8  w-fit mx-auto">
          <Button
            onClick={() => setActiveTab("about")}
            className={getTabClass("about")}
          >
            A propos
          </Button>
          <Button
            onClick={() => setActiveTab("stats")}
            className={getTabClass("stats")}
          >
            Statistiques
          </Button>
          <Button
            onClick={() => setActiveTab("metrics")}
            className={getTabClass("metrics")}
          >
            Métriques
          </Button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "about" && <CourseDetailsAbout />}
        {activeTab === "stats" && <CourseDetailsStats />}
        {activeTab === "metrics" && (
          <MembersMetrics />
          // <div className="p-6 bg-white rounded-lg shadow-sm text-center text-gray-500">
          //   Metrics content will go here.
          // </div>
        )}
      </div>
    </div>
  );
}
