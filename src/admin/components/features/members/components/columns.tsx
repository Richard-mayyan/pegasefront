import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { labels, priorities, statuses } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { MemberRow } from "@/logic/domain/entities";

export const columns: ColumnDef<MemberRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prénom" />
    ),
    cell: ({ row }) => <span>{row.getValue("firstName")}</span>,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nom" />
    ),
    cell: ({ row }) => <span>{row.getValue("lastName")}</span>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <span className="max-w-48 truncate">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "membershipStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Statut" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("membershipStatus") as string;
      const map: Record<string, string> = {
        active: "Actif",
        inactive: "Inactif",
        pending: "En attente",
      };
      return <span>{map[value]}</span>;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "membershipType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type d’abonnement" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("membershipType") as string;
      const map: Record<string, string> = {
        monthly: "Mensuel",
        yearly: "Annuel",
        "drop-in": "À la séance",
      };
      return <span>{map[value]}</span>;
    },
  },

  {
    accessorKey: "joinedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Inscription" />
    ),
    cell: ({ row }) => {
      const date: Date = row.getValue("joinedAt");
      return <span>{new Date(date).toLocaleDateString()}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

// {
//   accessorKey: 'membershipType',
//   header: ({ column }) => (
//     <DataTableColumnHeader column={column} title='Type d’abonnement' />
//   ),
// cell: ({ row }) => {
//   const value = row.getValue('membershipType') as string
//   const map: Record<string, string> = {
//     monthly: 'Mensuel',
//     yearly: 'Annuel',
//     drop-in: 'À la séance',
//   }
//   return <span>{map[value]}</span>
// },
// },
// {
//   accessorKey: 'joinedAt',
//   header: ({ column }) => (
//     <DataTableColumnHeader column={column} title='Inscription' />
//   ),
//   cell: ({ row }) => {
//     const date: Date = row.getValue('joinedAt')
//     return <span>{new Date(date).toLocaleDateString()}</span>
//   },
// },
// {
//   id: 'actions',
//   cell: ({ row }) => <DataTableRowActions row={row} />,
// },
