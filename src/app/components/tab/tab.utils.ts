import { createContext } from "react";

export interface Tab {
  value: string;
}

export interface TabContextValue {
  registerTab: (tab: Tab) => void;
  handleChange: (value: string) => void;
  tabs: Tab[];
  value: string | null;
}

export const TabContext = createContext<TabContextValue | null>(null);
