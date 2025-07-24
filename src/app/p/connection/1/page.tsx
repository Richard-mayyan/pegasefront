import { Button } from "@/components/ui/button";
import LoginForm from "../_components/login-form";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 text-center">
      <div className="w-full max-w-lg space-y-8">
        <LoginForm />
      </div>
    </div>
  );
}
