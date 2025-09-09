"use client";

import MuxUploader from "@mux/mux-uploader-react";
import { useState, useEffect } from "react";
import { apiClient } from "@/logic/infra/repos/nodeapi/axios";
import { cn } from "@/lib/utils";
import { MuxUploadUrlResponse } from "@/logic/domain/entities";

interface UploadStatus {
  id: string;
  url: string;
  status: "idle" | "progress" | "completed" | "error";
}

interface AppMuxUploaderProps {
  onUploadStart?: () => void;
  onSuccess?: (event: any, assetId: string) => void;
  onError?: (error: any) => void;
  type?: "bar" | "radial" | "percentage";
  pausable?: boolean;
  className?: string;
}

export default function AppMuxUploader({
  onUploadStart,
  onSuccess,
  onError,
  type = "bar",
  pausable = false,
  className,
}: AppMuxUploaderProps) {
  const [uploadData, setUploadData] = useState<UploadStatus>({
    id: "",
    url: "",
    status: "idle",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Récupérer l'URL d'upload depuis l'API (une seule fois)
  useEffect(() => {
    const fetchUploadUrl = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.post<MuxUploadUrlResponse>(
          "/lessons/upload-url"
        );
        const d: UploadStatus = {
          id: response.data.assetId || "",
          url: response.data.uploadUrl || "",
          status: "idle",
        };

        console.log({ d });
        setUploadData(d);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'URL d'upload:",
          error
        );
        setUploadData((prev) => ({
          ...prev,
          status: "error",
        }));
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    };

    // Ne récupérer l'URL que si elle n'est pas déjà chargée
    if (uploadData.id === "" && uploadData.url === "" && !isLoading) {
      fetchUploadUrl();
    }
  }, []); // Tableau de dépendances vide pour s'exécuter une seule fois

  const handleUploadStart = () => {
    setUploadData((prev) => ({
      ...prev,
      status: "progress",
    }));
    onUploadStart?.();
  };

  const handleUploadSuccess = (event: any) => {
    console.log({ event, data: event.target });
    setUploadData((prev) => ({
      ...prev,
      status: "completed",
    }));
    onSuccess?.(event, uploadData.id);
  };

  const handleUploadError = (error: any) => {
    console.error("Erreur lors de l'upload:", error);
    setUploadData((prev) => ({
      ...prev,
      status: "error",
    }));
    onError?.(error);
  };

  if (isLoading) {
    return (
      <div
        className={cn(
          "flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg",
          className
        )}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-customBg mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Chargement de l'uploader...</p>
        </div>
      </div>
    );
  }

  if (uploadData.status === "error" || !uploadData.id || !uploadData.url) {
    return (
      <div
        className={cn(
          "flex items-center justify-center p-4 border-2 border-dashed border-red-300 rounded-lg bg-red-50",
          className
        )}
      >
        <div className="text-center">
          <p className="text-sm text-red-600">
            Erreur lors du chargement de l'uploader
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-xs text-red-500 underline mt-1 hover:text-red-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <MuxUploader
        type={type}
        pausable={pausable}
        onUploadStart={handleUploadStart}
        onSuccess={handleUploadSuccess}
        onError={handleUploadError}
        id={uploadData.id}
        endpoint={uploadData.url}
      />
    </div>
  );
}
