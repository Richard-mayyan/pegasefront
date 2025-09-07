"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

// SSR-safe lazy import
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export type AppVideoPlayerProps = {
  url: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  // Colors (tailwind classes or style overrides)
  trackColorClassName?: string; // progress track
  fillColorClassName?: string; // progress filled
  thumbColorClassName?: string; // progress thumb
  controlBgClassName?: string; // controls background
  controlTextClassName?: string; // controls text icons
  // Events
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onProgress?: (secondsPlayed: number, playedFraction: number) => void;
  onDuration?: (durationSeconds: number) => void;
  className?: string;
  // aspect ratio
  aspectClassName?: string; // e.g., "aspect-video"
};

export default function AppVideoPlayer({
  url,
  autoPlay = false,
  loop = false,
  muted: initialMuted = false,
  poster,
  trackColorClassName = "bg-gray-300/70",
  fillColorClassName = "bg-customBg",
  thumbColorClassName = "bg-customBg",
  controlBgClassName = "bg-black/50",
  controlTextClassName = "text-white",
  onPlay,
  onPause,
  onEnded,
  onProgress,
  onDuration,
  className,
  aspectClassName = "aspect-video",
}: AppVideoPlayerProps) {
  const playerRef = useRef<any>(null);
  const [playing, setPlaying] = useState<boolean>(!!autoPlay);
  const [muted, setMuted] = useState<boolean>(initialMuted);
  const [volume, setVolume] = useState<number>(0.9);
  const [played, setPlayed] = useState<number>(0); // 0..1
  const [duration, setDuration] = useState<number>(0);
  const [seeking, setSeeking] = useState<boolean>(false);

  const togglePlay = () => setPlaying((p) => !p);
  const toggleMute = () => setMuted((m) => !m);

  const handleProgress = useCallback(
    (state: { played: number; playedSeconds: number }) => {
      if (!seeking) setPlayed(state.played);
      onProgress?.(state.playedSeconds, state.played);
    },
    [onProgress, seeking]
  );

  const handleDuration = (d: number) => {
    setDuration(d);
    onDuration?.(d);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPlayed(value);
  };
  const handleSeekMouseDown = () => setSeeking(true);
  const handleSeekMouseUp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeeking(false);
    const value = parseFloat(e.target.value);
    playerRef.current?.seekTo?.(value, "fraction");
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (value === 0 && !muted) setMuted(true);
    if (value > 0 && muted) setMuted(false);
  };

  const formatTime = useCallback((secs: number) => {
    if (!isFinite(secs)) return "00:00";
    const s = Math.floor(secs % 60)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((secs / 60) % 60)
      .toString()
      .padStart(2, "0");
    const h = Math.floor(secs / 3600);
    return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
  }, []);

  const currentTime = useMemo(() => played * duration, [played, duration]);

  const enterFullscreen = () => {
    const elem = playerRef.current?.getInternalPlayer?.();
    const container = containerRef.current;
    const target: any = container;
    if (target?.requestFullscreen) target.requestFullscreen();
    else if (target?.webkitRequestFullscreen) target.webkitRequestFullscreen();
    else if (target?.msRequestFullscreen) target.msRequestFullscreen();
  };

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={"relative w-full " + (className || "")} ref={containerRef}>
      <div
        className={
          aspectClassName + " w-full overflow-hidden rounded-lg bg-black"
        }
      >
        <ReactPlayer
          ref={playerRef}
          src={url}
          playing={playing}
          loop={loop}
          muted={muted}
          volume={volume}
          width="100%"
          height="100%"
          light={poster || false}
          onPlay={() => {
            setPlaying(true);
            onPlay?.();
          }}
          onPause={() => {
            setPlaying(false);
            onPause?.();
          }}
          onEnded={() => {
            setPlaying(false);
            onEnded?.();
          }}
          //   onProgress={handleProgress}
          //   onDuration={handleDuration}
          //   config={{
          //     file: {
          //       attributes: {
          //         controlsList: "nodownload noplaybackrate",
          //       },
          //     },
          //   }}
        />
      </div>

      {/* Controls overlay */}
      <div
        className={`${controlBgClassName} ${controlTextClassName} absolute inset-x-0 bottom-0 p-3 flex flex-col gap-2 backdrop-blur-sm`}
      >
        {/* Seekbar */}
        <input
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={played}
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          //   onMouseUp={handleSeekMouseUp}
          className={`w-full h-2 appearance-none rounded ${trackColorClassName}`}
          style={{
            background: `linear-gradient(to right, var(--fill-color, #14b8a6) ${
              played * 100
            }%, rgba(0,0,0,0.2) ${played * 100}%)`,
          }}
        />
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 9999px;
            background: currentColor;
            cursor: pointer;
          }
          input[type="range"]::-moz-range-thumb {
            width: 14px;
            height: 14px;
            border-radius: 9999px;
            background: currentColor;
            cursor: pointer;
          }
        `}</style>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/10 hover:bg-white/20"
            >
              {playing ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>

            <span className="text-xs tabular-nums opacity-90">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <button
              type="button"
              onClick={toggleMute}
              className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/10 hover:bg-white/20"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted || volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              className="w-28 h-2 rounded bg-white/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={enterFullscreen}
              className="inline-flex items-center justify-center h-9 px-3 rounded bg-white/10 hover:bg-white/20"
              aria-label="Plein écran"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
