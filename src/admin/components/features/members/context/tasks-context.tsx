import { Member, MemberRow } from "@/logic/domain/entities";
import React from "react";

export type TasksDialogType = "create" | "update" | "delete" | "import";

interface TasksContextType {
  open: TasksDialogType | null;
  setOpen: (str: TasksDialogType | null) => void;
  currentRow: MemberRow | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<MemberRow | null>>;
}

const TasksContext = React.createContext<TasksContextType | null>(null);

interface Props {
  children: React.ReactNode;
  value: TasksContextType;
}

export default function MembersContextProvider({ children, value }: Props) {
  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMembersContext = () => {
  const tasksContext = React.useContext(TasksContext);

  if (!tasksContext) {
    throw new Error(
      "useTasksContext has to be used within <TasksContext.Provider>"
    );
  }

  return tasksContext;
};
