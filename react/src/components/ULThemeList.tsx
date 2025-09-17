import React from "react";

import { List, ListItem, ListProps } from "@/components/ui/list";
import { cn } from "@/lib/utils";

interface ULThemeListProps extends ListProps {
  items: {
    label: string;
    description?: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
  className?: string;
  variant?: "bullet" | "number" | "icon" | "plain";
  spacing?: "default";
  iconPosition?: "start";
}

const ULThemeList = (props: ULThemeListProps) => {
  // UL List item theme overrides
  const listItemThemeOverrides =
    "theme-universal:font-(weight:--ul-theme-font-body-text-weight) mb-4 last:mb-8";
  return (
    <List
      variant={props.variant}
      spacing={props.spacing}
      iconPosition={props.iconPosition}
    >
      {props?.items?.map((item, index) => (
        <ListItem
          key={index}
          icon={item.icon}
          description={item.description}
          info={item.info}
          className={cn(listItemThemeOverrides, props.className)}
        >
          {item.label}
        </ListItem>
      ))}
    </List>
  );
};

export default ULThemeList;
