import ResetPasswordForm from "./_components/reset-password-form";

export default function ResetPasswordSubmissionPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 text-center">
      <div className="w-full max-w-lg space-y-8">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
