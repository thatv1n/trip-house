import * as R from "ramda";
import { FC, ReactNode, useCallback, useMemo, useState } from "react";
import { Tab, TabContext as _TabContext } from "./tab.utils";

interface TabContextProps {
  children?: ReactNode;
  defaultValue?: string;
}

export const TabContext: FC<TabContextProps> = ({ children, defaultValue = null }) => {
  const [value, setValue] = useState<string | null>(defaultValue);
  const [tabs, setTabs] = useState<Tab[]>([]);
  const registerTab = useCallback((newTab: Tab) => {
    setTabs((_tabs) => R.append(newTab, _tabs));
    if (value === null) {
      setValue(newTab.value);
    }
  }, [value]);
  const handleChange = useCallback((value: string) => setValue(value), []);
  const contextValue = useMemo(() => ({
    registerTab,
    handleChange,
    tabs,
    value,
  }), [registerTab, handleChange, value, tabs]);
  return (
    <_TabContext.Provider value={contextValue}>
      {children}
    </_TabContext.Provider>
  );
};
