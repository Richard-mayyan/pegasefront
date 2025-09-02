import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";

interface CourseHeaderProps {
  courseTitle: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
}

export default function CourseHeader({
  courseTitle,
  progress,
  totalLessons,
  completedLessons,
}: CourseHeaderProps) {
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
        <Button className="bg-customBg hover:bg-customBg-hover text-white px-4 py-2 rounded-lg flex items-center gap-2">
          Valider et continuer
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
