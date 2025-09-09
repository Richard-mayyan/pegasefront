"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface ShareLinkProps {
  url: string;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function ShareLink({
  url,
  label = "Partager le lien",
  placeholder = "Lien de partage",
  className = "",
  disabled = false,
}: ShareLinkProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Lien copié dans le presse-papiers !");

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de la copie:", error);
      toast.error("Impossible de copier le lien");
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          type="text"
          value={url}
          placeholder={placeholder}
          disabled={disabled}
          readOnly
          className="flex-1"
        />
        <Button
          onClick={handleCopy}
          variant="outline"
          size="icon"
          className="shrink-0"
          disabled={disabled}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
