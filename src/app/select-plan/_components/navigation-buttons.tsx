"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useOnboardingNavigation } from "../../hooks/useOnboardingNavigation";
import { ArrowLeft, SkipForward } from "lucide-react";

interface NavigationButtonsProps {
  onSkip?: () => void;
}

export default function NavigationButtons({ onSkip }: NavigationButtonsProps) {
  const { goToNextStep, skipStep } = useOnboardingNavigation();

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      skipStep(0);
    }
  };

  return (
    <div className="flex justify-between items-center pt-8">
      <Button
        variant="ghost"
        className="text-gray-600 hover:text-gray-800"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour
      </Button>

      <Button
        variant="outline"
        className="text-customBg border-customBg hover:bg-teal-50"
        onClick={handleSkip}
      >
        <SkipForward className="w-4 h-4 mr-2" />
        Passer cette étape
      </Button>
    </div>
  );
}
