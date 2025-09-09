"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Circle, Plus, PlusIcon } from "lucide-react";
import React from "react";
import { useAuth } from "@/components/layouts/AuthProvider";
import { ROUTES } from "@/lib/constants";
import { useAppData } from "@/components/layouts/AppDataProvider";
import { RegisterProfileEnum } from "@/logic/domain/entities";
import { useRouter } from "next/navigation";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

function SearchInput({ value, onChange }: Props) {
  const { user } = useAuth();
  const { doIfUpgradeSubscription } = useAppData();
  const router = useRouter();
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="relative flex-1">
        <Input
          placeholder="Rechercher"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-customBg focus:border-customBg"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
        >
          <Circle className="h-4 w-4 text-gray-500" />
        </Button>
      </div>
      {user?.profile === RegisterProfileEnum.Coach && (
        <Button
          onClick={() =>
            doIfUpgradeSubscription(() => router.push(ROUTES.createModule))
          }
          variant={"roam"}
          className="gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          ajouter un module
        </Button>
      )}
    </div>
  );
}

export default SearchInput;
