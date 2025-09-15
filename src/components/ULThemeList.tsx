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
  onItemClick: (item: string) => void;
  className?: string;
}

const ULThemeList = ({ items, onItemClick, className }: ULThemeListProps) => {
  // Base component styles
  const baseStyles =
    "text-link-focus text-(length:--ul-theme-font-links-size) font-(weight:--ul-theme-font-links-weight) focus:rounded-(--ul-theme-border-links-border-radius) hover:text-link-focus/80";

  // UL theme overrides
  const variantThemeOverrides =
    "theme-universal:focus:outline-none theme-universal:focus:ring-4 theme-universal:focus:ring-base-focus/15 theme-universal:focus:bg-base-focus/15"; // focus base color
  return (
    <List
      variant="icon"
      spacing="default"
      iconPosition="start"
      className={cn(baseStyles, variantThemeOverrides, className)}
    >
      {items.map((item, index) => (
        <ListItem
          key={index}
          icon={item.icon}
          description={item.description}
          info={item.info}
          onClick={() => onItemClick(item.label)}
        >
          {item.label}
        </ListItem>
      ))}
    </List>
  );
};

export default ULThemeList;
