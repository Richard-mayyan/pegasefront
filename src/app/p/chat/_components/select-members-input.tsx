import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { getPlaceholderImage } from "@/lib/constants";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppData } from "@/components/layouts/AppDataProvider";
import { apiClient } from "@/logic/infra/repos/nodeapi/axios";
import { toast } from "sonner";

type Props = {};

function SelectMembersInput({}: Props) {
  const { currentCommunity } = useAppData();
  const [members, setMembers] = useState<
    Array<{ id: any; name: string; avatar?: string }>
  >([]);

  useEffect(() => {
    const load = async () => {
      if (!currentCommunity?.id) return;
      try {
        const res = await apiClient.get(
          `/communities/${currentCommunity.id}/students`
        );
        const list = res.data?.data || res.data || [];
        setMembers(
          list.map((m: any) => ({
            id: m.id,
            name:
              `${m.firstName || m.firstname || ""} ${
                m.lastName || m.lastname || ""
              }`.trim() || m.email,
            avatar: m.avatar || m.image || getPlaceholderImage("user"),
          }))
        );
      } catch (e) {
        toast.error("Impossible de charger les membres");
      }
    };
    load();
  }, [currentCommunity?.id]);
  return (
    <div className="space-y-2">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sélectionnez les membres" />
        </SelectTrigger>
        <SelectContent>
          {/* Simulating the expanded list content as seen in the image */}
          {members.map((member) => (
            <SelectItem key={member.id} value={String(member.id)}>
              <div className="flex items-center gap-2">
                <img
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                {member.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectMembersInput;
