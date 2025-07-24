import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMembersContext } from "../context/tasks-context";
import { labels } from "../data/data";
import { taskSchema } from "../data/schema";
import { Button } from "@/components/ui/button";
import { MonitorDotIcon, TrashIcon } from "lucide-react";
import { Member, MemberRow } from "@/logic/domain/entities";
import { useTranslation } from "react-i18next";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = row.original as MemberRow;
  const { setOpen, setCurrentRow } = useMembersContext();
  const { t } = useTranslation();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MonitorDotIcon className="h-4 w-4" />
          <span className="sr-only">{t("table.actions.openMenu")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(task);
            setOpen("update");
          }}
        >
          {t("table.actions.edit")}
        </DropdownMenuItem>
        <DropdownMenuItem disabled>{t("table.actions.copy")}</DropdownMenuItem>
        <DropdownMenuItem disabled>
          {t("table.actions.favorite")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(task);
            setOpen("delete");
          }}
        >
          {t("table.actions.delete")}
          <DropdownMenuShortcut>
            <TrashIcon size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
