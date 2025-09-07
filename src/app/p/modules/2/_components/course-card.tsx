"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  id: string | number;
  imageUrl: string;
  title: string;
  dateAdded: string;
  progress: number;
  totalLessons?: number;
  completedLessons?: number;
}

export default function CourseCard({
  id,
  imageUrl,
  title,
  dateAdded,
  progress,
  totalLessons = 0,
  completedLessons = 0,
}: CourseCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/p/modules/${id}`);
  };

  return (
    <Card
      className="w-full rounded-xl overflow-hidden shadow-md hover:shadow-lg  duration-200 cursor-pointer hover:scale-105 transition-transform"
      onClick={handleClick}
    >
      <div className="relative w-full h-48">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="rounded-t-xl w-full h-full object-cover"
        />
        {totalLessons > 0 && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
            <BookOpen className="w-4  text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {totalLessons}
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-4 space-y-3">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>Ajouté le : {dateAdded}</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progression</span>
            <span className="font-medium text-gray-700">{progress}%</span>
          </div>
          <Progress
            value={progress}
            className="h-2 rounded-full bg-gray-200 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-customBg"
          />
          {totalLessons > 0 && (
            <div className="text-xs text-gray-500 text-center">
              {completedLessons} sur {totalLessons} leçons terminées
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
