"use client";

import { createContext, useContext } from "react";

const TermsContext = createContext<any>(null);

export function TermsProvider({ value, children }: { value: any; children: React.ReactNode }) {
  return <TermsContext.Provider value={value}>{children}</TermsContext.Provider>;
}

export function useTerms() {
  const ctx = useContext(TermsContext);
  if (!ctx) throw new Error("useTerms must be used within TermsProvider");
  return ctx;
}
