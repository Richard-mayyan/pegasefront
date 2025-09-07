import React from "react";
import { Check, X } from "lucide-react";

interface PasswordRequirementProps {
  isValid: boolean;
  children: React.ReactNode;
}

const PasswordRequirement: React.FC<PasswordRequirementProps> = ({
  isValid,
  children,
}) => (
  <div className="flex items-center space-x-2 text-sm">
    {isValid ? (
      <Check className="w-4 h-4 text-customBg" />
    ) : (
      <X className="w-4 h-4 text-red-500" />
    )}
    <span className={isValid ? "text-customBg-hover" : "text-red-700"}>
      {children}
    </span>
  </div>
);

interface PasswordRequirementsProps {
  password: string;
  show?: boolean;
}

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
  password,
  show = false,
}) => {
  if (!show) return null;

  const requirements = [
    {
      isValid: password.length >= 8,
      text: "Au moins 8 caractères",
    },
    // {
    //   isValid: /\d/.test(password),
    //   text: "Au moins 1 chiffre",
    // },
    {
      isValid: /[a-z]/.test(password),
      text: "Au moins 1 lettre minuscule",
    },
    {
      isValid: /[A-Z]/.test(password),
      text: "Au moins 1 lettre majuscule",
    },
    // {
    //   isValid: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    //   text: "Au moins 1 symbole",
    // },
  ];

  return (
    <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-xs font-medium text-gray-700 mb-2">
        Exigences du mot de passe :
      </p>
      <div className="space-y-1">
        {requirements.map((req, index) => (
          <PasswordRequirement key={index} isValid={req.isValid}>
            {req.text}
          </PasswordRequirement>
        ))}
      </div>
    </div>
  );
};
