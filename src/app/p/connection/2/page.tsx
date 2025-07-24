import { Button } from "@/components/ui/button";
import { Home, FileText } from "lucide-react";
import ForgotPasswordForm from "../_components/forgot-password-form";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 text-center">
      <div className="w-full max-w-md space-y-8">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
