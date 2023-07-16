import { FC, ReactNode, useContext, useEffect } from "react";
import { Typography } from "../typography";
import { TabContext } from "./tab.utils";

interface TabProps {
  value: string;
  children: ReactNode;
}

export const Tab: FC<TabProps> = ({ children, value }) => {
  const context = useContext(TabContext);
  if (context === null) {
    return null;
  }
  const { value: currentValue, registerTab, handleChange } = context;
  useEffect(() => {
    registerTab({ value });
  }, []);
  const isActive = value === currentValue;
  const handleClick = () => {
    if (!isActive) {
      handleChange(value);
    }
  }
  return (
    <Typography css={{ cursor: 'pointer' }} mr="4rem" variant="subtitle2" fontWeight={isActive ? 'medium' : 'regular'} color={isActive ? 'mainOrange': 'black'} onClick={handleClick}>{children}</Typography>
  );
};
