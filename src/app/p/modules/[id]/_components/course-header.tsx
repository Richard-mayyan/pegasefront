import { useAuth } from "@/components/layouts/AuthProvider";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RegisterProfileEnum } from "@/logic/domain/entities";
import { ArrowRight, Edit } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AIAssistantPanel from "./ai-assistant-panel";

interface CourseHeaderProps {
  courseTitle: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  courseId: string;
  isAIPanelOpen: boolean;
  setIsAIPanelOpen: (isAIPanelOpen: boolean) => void;
}

export default function CourseHeader({
  courseTitle,
  progress,
  totalLessons,
  completedLessons,
  courseId,
  isAIPanelOpen,
  setIsAIPanelOpen,
}: CourseHeaderProps) {
  console.log("totalLessons", totalLessons);
  const { user } = useAuth();
  // const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">{courseTitle}</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
          <span>
            {completedLessons}/{totalLessons} cours
          </span>
          <Progress
            value={progress}
            className="w-24 h-2 rounded-full bg-gray-200 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-customBg"
          />
          <span>{progress}%</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {user?.profile === RegisterProfileEnum.Coach && (
          <div className="flex items-center gap-4">
            <Link href={`/p/modules/create?id=${courseId}`}>
              <Button className="bg-customBg hover:bg-customBg-hover text-white px-4 py-2 rounded-lg flex items-center gap-2">
                Modifier le module
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
        <Button onClick={() => setIsAIPanelOpen(!isAIPanelOpen)} variant="roam">
          Chat{" "}
        </Button>
      </div>

      {/* <button
        onClick={() => setIsAIPanelOpen(!isAIPanelOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isAIPanelOpen
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-teal-500 hover:bg-customBg text-white"
        }`}
        title={
          isAIPanelOpen ? "Fermer l'assistant AI" : "Ouvrir l'assistant AI"
        }
      >
        {isAIPanelOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button> */}

      {/* Panel AI avec animation */}
    </header>
  );
}
