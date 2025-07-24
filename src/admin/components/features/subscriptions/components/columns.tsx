import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { MemberRow, Subscription } from "@/logic/domain/entities";
import { DataTableColumnHeader } from "../../members/components/data-table-column-header";
import { DataTableRowActions } from "../../members/components/data-table-row-actions";

export const columns: ColumnDef<Subscription>[] = [
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
    accessorKey: "userId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UserID" />
    ),
    cell: ({ row }) => <span>{row.getValue("userId")}</span>,
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
