import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CourseCardProps {
  imageUrl: string;
  title: string;
  dateAdded: string;
  progress: number;
}

export default function CourseCard({
  imageUrl,
  title,
  dateAdded,
  progress,
}: CourseCardProps) {
  return (
    <Card className="w-full rounded-xl overflow-hidden shadow-md">
      <div className="relative w-full h-48">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
        />
      </div>
      <CardContent className="p-4 space-y-3">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">Ajouté le : {dateAdded}</p>
        <div className="flex items-center gap-2">
          <Progress
            value={progress}
            className="flex-1 h-2 rounded-full bg-gray-200 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-teal-600"
          />
          <span className="text-sm font-medium text-gray-700">{progress}%</span>
        </div>
      </CardContent>
    </Card>
  );
}
