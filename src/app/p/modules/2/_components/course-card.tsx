"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Calendar, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/layouts/AuthProvider";
import { RegisterProfileEnum } from "@/logic/domain/entities";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { classRepo } from "@/logic/infra/di/container";
import { toast } from "sonner";

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
  const { user } = useAuth();
  const router = useRouter();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    router.push(`/p/modules/${id}`);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await classRepo.delete(String(id));
      toast.success("Cours supprimé avec succès");
      setOpenConfirm(false);
      window.location.reload();
    } catch (e) {
      toast.error("Suppression impossible");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full rounded-xl overflow-hidden shadow-md hover:shadow-lg  duration-200">
      <div className="relative w-full h-48">
        <img
          onClick={handleClick}
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="rounded-t-xl w-full h-full object-cover cursor-pointer"
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
          <button onClick={handleClick} className="text-left w-full">
            {title}
          </button>
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>Ajouté le : {dateAdded}</span>
        </div>
        {user?.profile === RegisterProfileEnum.Student && (
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
        )}

        {user?.profile === RegisterProfileEnum.Coach && (
          <div className="flex justify-end pt-2">
            <Button
              variant="outline"
              className="text-red-600 border-red-300 hover:text-red-700 hover:bg-red-50"
              onClick={() => setOpenConfirm(true)}
            >
              <Trash2 className="w-4 h-4 mr-1" />
            </Button>
          </div>
        )}
      </CardContent>

      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            Voulez-vous vraiment supprimer ce cours ? Cette action est
            irréversible.
          </p>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpenConfirm(false)}>
              Annuler
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Suppression..." : "Supprimer"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
