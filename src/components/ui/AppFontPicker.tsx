"use client";

import React, { useEffect, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const POPULAR_FONTS: string[] = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Source Sans Pro",
  "Merriweather",
  "Playfair Display",
  "Nunito",
];

type AppFontPickerProps = {
  value: string;
  onChange: (fontFamily: string) => void;
  previewText?: string;
  className?: string;
};

function buildGoogleFontsUrl(families: string[]): string {
  const params = families
    .map((family) => `family=${encodeURIComponent(family)}:wght@400;600`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}

export default function AppFontPicker({
  value,
  onChange,
  previewText = "The font will be applied to this text.",
  className,
}: AppFontPickerProps) {
  const href = useMemo(() => buildGoogleFontsUrl(POPULAR_FONTS), []);

  useEffect(() => {
    const existing = document.querySelector(
      `link[data-app-font-picker="true"][href="${href}"]`
    ) as HTMLLinkElement | null;
    if (!existing) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.setAttribute("data-app-font-picker", "true");
      document.head.appendChild(link);
    }
  }, [href]);

  return (
    <div className={className}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-gray-100 border-0 rounded-lg h-12">
          <SelectValue placeholder="Choisir une police" />
        </SelectTrigger>
        <SelectContent className="max-h-72">
          {POPULAR_FONTS.map((font) => (
            <SelectItem key={font} value={font}>
              <span
                className="truncate block"
                style={{
                  fontFamily: `'${font}', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif`,
                }}
                title={font}
              >
                {font}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div
        className="apply-font mt-3 text-sm text-gray-700"
        style={{
          fontFamily: `'${value}', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif`,
        }}
      >
        {previewText}
      </div>
    </div>
  );
}
