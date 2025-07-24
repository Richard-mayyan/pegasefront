import { useState } from "react";
import { Button } from "@/components/ui/button";
import { columns } from "./components/columns";
// import { TasksImportDialog } from "./components/tasks-import-dialog";
// import { subscriptions } from "./data/subscriptions";
import { Header } from "../../layout/header";
import { ThemeSwitch } from "../../theme-switch";
import { ProfileDropdown } from "../../profile-dropdown";
import { Search } from "../../search";
import { Main } from "../../layout/main";
import { DownloadIcon, PlusIcon } from "lucide-react";
import { ConfirmDialog } from "../../confirm-dialog";
import { toast } from "sonner";
import useDialogState from "@/hooks/use-dialog-state";
import { Member, MemberRow } from "@/logic/domain/entities";
import { DataTable } from "../members/components/data-table";
import MembersContextProvider, {
  TasksDialogType,
} from "../members/context/tasks-context";
import { useQuery } from "react-query";
import { USE_CASES } from "@/logic/infra/di/container";

export default function MembersAdmin() {
  // Local states
  const [currentRow, setCurrentRow] = useState<MemberRow | null>(null);
  const [open, setOpen] = useDialogState<TasksDialogType>(null);

  const {
    isLoading,
    error,
    data: subscriptions,
  } = useQuery({
    queryKey: ["getSubscriptions"],
    queryFn: () => USE_CASES.members.getMemberSubsUC.execute({}),
  });

  const infos = {
    title: "Souscriptions",
    description: "Liste de toutes les souscriptions",
  };

  return (
    <MembersContextProvider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {/* ===== Top Heading ===== */}
      <Header sticky>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap gap-x-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{infos.title}</h2>
            <p className="text-muted-foreground">{infos.description}</p>
          </div>
          <div className="flex gap-2">
            {/* <Button
              variant="outline"
              className="space-x-1"
              onClick={() => setOpen("import")}
            >
              <span>Importer</span> <DownloadIcon size={18} />
            </Button> */}
            <Button className="space-x-1" onClick={() => setOpen("create")}>
              <span>Créer</span> <PlusIcon size={18} />
            </Button>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          {subscriptions && (
            <DataTable data={subscriptions} columns={columns} />
          )}
        </div>
      </Main>

      {/* <ItemMutateDrawer
        key="task-create"
        open={open === "create"}
        onOpenChange={() => setOpen("create")}
      /> */}

      {/* <TasksImportDialog
        key="tasks-import"
        open={open === "import"}
        onOpenChange={() => setOpen("import")}
      /> */}

      {currentRow && (
        <>
          {/* <ItemMutateDrawer
            key={`task-update-${currentRow.id}`}
            open={open === "update"}
            onOpenChange={() => {
              setOpen("update");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
          /> */}

          <ConfirmDialog
            key="task-delete"
            destructive
            open={open === "delete"}
            onOpenChange={() => {
              setOpen("delete");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            handleConfirm={() => {
              setOpen(null);
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
              toast("'The following task has been deleted:'", {
                description: (
                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                      {JSON.stringify(currentRow, null, 2)}
                    </code>
                  </pre>
                ),
              });
            }}
            className="max-w-md"
            title={`Delete this task: ${currentRow.id} ?`}
            desc={
              <>
                You are about to delete a task with the ID{" "}
                <strong>{currentRow.id}</strong>. <br />
                This action cannot be undone.
              </>
            }
            confirmText="Delete"
          />
        </>
      )}
    </MembersContextProvider>
  );
}
