"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// Load mux-player react only on client
const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
  ssr: false,
});

export interface AppMuxVideoProps {
  playbackId?: string;
  playbackToken?: string;
  thumbnailToken?: string;
  title?: string;
  viewerUserId?: string;
  className?: string;
  onTimeUpdate?: (event: any) => void;
}

export default function AppMuxVideo({
  playbackId,
  playbackToken,
  thumbnailToken,
  title,
  viewerUserId,
  className,
  onTimeUpdate,
}: AppMuxVideoProps) {
  console.log("playbackId", playbackId);
  console.log("playbackToken", playbackToken);
  console.log("thumbnailToken", thumbnailToken);
  console.log("title", title);
  console.log("viewerUserId", viewerUserId);
  if (!playbackId) {
    return (
      <div
        className={cn(
          "w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-500",
          className
        )}
      >
        Aucune vidéo disponible
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <MuxPlayer
        playbackId={playbackId}
        tokens={{
          playback: playbackToken || "",
          thumbnail: thumbnailToken || "",
        }}
        metadataVideoTitle={title}
        metadataViewerUserId={viewerUserId}
        onTimeUpdate={onTimeUpdate}
        accentColor="#6001DA"
      />
    </div>
  );
}
