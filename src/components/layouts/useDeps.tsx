// "use client";
// import { AppExtraArguments } from "@/logic/application/redux/store";
// import { InMemoryClientRepository } from "@/logic/infra/repos/InMemoryClientRepo";
// import React, { createContext, useContext } from "react";
// type AppContextType = AppExtraArguments;

// const DepsContext = createContext<AppContextType | undefined>(undefined);

// export const DepsProvider = ({
//   children,
//   deps,
// }: {
//   children: React.ReactNode;
//   deps: AppExtraArguments;
// }) => {
//   // const value = { clientRepo: new InMemoryClientRepository() };

//   return <DepsContext.Provider value={deps}>{children}</DepsContext.Provider>;
// };

// export const useDeps = () => useContext(DepsContext);
