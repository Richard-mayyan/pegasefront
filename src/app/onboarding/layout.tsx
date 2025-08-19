import { AppDataProvider } from "@/components/layouts/AppDataProvider";
import { OnboardingProvider } from "./context/OnboardingContext";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingProvider>
      {/* <AppDataProvider> */}
      {children}
      {/* </AppDataProvider> */}
    </OnboardingProvider>
  );
}
