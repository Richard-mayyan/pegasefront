import { useRouter } from "next/navigation";
import { useOnboarding } from "../context/OnboardingContext";
import { toast } from "sonner";

export const useOnboardingNavigation = () => {
  const router = useRouter();
  const { data } = useOnboarding();

  const validateStep1 = (): boolean => {
    if (!data.name) {
      toast.error("Veuillez entrer un nom pour votre communauté");
      return false;
    }
    if (!data.color) {
      toast.error("Veuillez sélectionner une couleur pour votre communauté");
      return false;
    }
    if (!data.typography) {
      toast.error("Veuillez sélectionner une typographie");
      return false;
    }
    return true;
  };

  const validateStep2 = (): boolean => {
    // Validation pour l'étape 2 si nécessaire
    return true;
  };

  const validateStep3 = (): boolean => {
    // Validation pour l'étape 3 si nécessaire
    return true;
  };

  const navigateToStep = (step: number) => {
    router.push(`/onboarding/${step}`);
  };

  const goToNextStep = (currentStep: number) => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      const nextStep = currentStep + 1;
      if (nextStep <= 4) {
        navigateToStep(nextStep);
      }
    }
  };

  const goToPreviousStep = (currentStep: number) => {
    const previousStep = currentStep - 1;
    if (previousStep >= 1) {
      navigateToStep(previousStep);
    }
  };

  const skipStep = (currentStep: number) => {
    const nextStep = currentStep + 1;
    if (nextStep <= 4) {
      navigateToStep(nextStep);
    }
  };

  return {
    goToNextStep,
    goToPreviousStep,
    skipStep,
    navigateToStep,
    validateStep1,
    validateStep2,
    validateStep3,
  };
};
