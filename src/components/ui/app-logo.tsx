import Image from "next/image";
import { cn } from "@/lib/utils";

interface AppLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
  textClassName?: string;
  containerClassName?: string;
}

const sizeConfig = {
  sm: {
    container: "w-8 h-8",
    image: "w-4 h-3",
    text: "text-lg",
    spacing: "gap-2",
  },
  md: {
    container: "w-12 h-12",
    image: "w-6 h-5",
    text: "text-2xl",
    spacing: "gap-3",
  },
  lg: {
    container: "w-16 h-16",
    image: "w-8 h-6",
    text: "text-3xl",
    spacing: "gap-4",
  },
  xl: {
    container: "w-20 h-20",
    image: "w-10 h-8",
    text: "text-4xl",
    spacing: "gap-5",
  },
};

export default function AppLogo({
  size = "md",
  showText = true,
  className,
  textClassName,
  containerClassName,
}: AppLogoProps) {
  const config = sizeConfig[size];

  return (
    <div className={cn("flex items-center", config.spacing, className)}>
      <img
        className="w-12 h-12"
        src="/logo.svg"
        alt="Pegasus Logo"
        // width={
        //   size === "sm" ? 16 : size === "md" ? 24 : size === "lg" ? 32 : 40
        // }
        // height={
        //   size === "sm" ? 12 : size === "md" ? 19 : size === "lg" ? 24 : 32
        // }
        // className={cn(config.image)}
      />
      {showText && (
        <h1 className={cn("font-bold text-black", config.text, textClassName)}>
          Pegase
        </h1>
      )}
    </div>
  );
}
