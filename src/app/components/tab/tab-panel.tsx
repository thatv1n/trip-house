import { FC, Fragment, ReactNode, useContext } from "react";
import { TabContext } from "./tab.utils";

interface TabPanelProps {
  children: ReactNode;
  value: string;
}

export const TabPanel: FC<TabPanelProps> = ({ children, value }) => {
  const context = useContext(TabContext);
  if (context === null) {
    return null;
  }
  const { value: currentValue } = context;
  if (value === currentValue) {
    return <Fragment>{children}</Fragment>;
  }
  return null;
};
