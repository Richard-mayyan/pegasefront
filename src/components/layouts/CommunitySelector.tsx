"use client";

import React from "react";
import { useAppData } from "./AppDataProvider";
import { CommunityEntity } from "@/logic/domain/entities";
import { Button } from "@/components/ui/button";
import { ChevronDown, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CommunitySelectorProps {
  className?: string;
}

export function CommunitySelector({ className }: CommunitySelectorProps) {
  const { currentCommunity, communities, setCommunity, isLoadingCommunities } =
    useAppData();

  if (isLoadingCommunities) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
        <span className="text-gray-500">Chargement...</span>
      </div>
    );
  }

  if (!communities || communities.length === 0) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Users className="w-4 h-4 text-gray-400" />
        <span className="text-gray-500">Aucune communauté</span>
      </div>
    );
  }

  const handleCommunityChange = (newCommunity: CommunityEntity) => {
    setCommunity(newCommunity);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`flex items-center space-x-2 hover:bg-gray-100 ${className}`}
        >
          <Users className="w-4 h-4" />
          <span className="font-medium">
            {currentCommunity?.name || "Sélectionner une communauté"}
          </span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {communities.map((comm) => (
          <DropdownMenuItem
            key={comm.id}
            onClick={() => handleCommunityChange(comm)}
            className={`cursor-pointer ${
              currentCommunity?.id === comm.id ? "bg-gray-100 font-medium" : ""
            }`}
          >
            <div className="flex items-center space-x-3 w-full">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: comm.color || "#6b7280" }}
              ></div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{comm.name}</div>
                {comm.description && (
                  <div className="text-xs text-gray-500 truncate">
                    {comm.description}
                  </div>
                )}
              </div>
              {currentCommunity?.id === comm.id && (
                <div className="text-blue-600 text-xs">✓</div>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
