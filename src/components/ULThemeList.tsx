import {
  List,
  ListDescription,
  ListElementProps,
  ListItem,
  ListItemProps,
  ListProps,
  ListTitle,
} from "@/components/ui/list";
import { cn } from "@/lib/utils";

const ULThemeList = ({ children, className, ...props }: ListProps) => {
  return (
    <List {...props} className={className}>
      {children}
    </List>
  );
};

const ULThemeListItem = ({
  children,
  icon,
  info,
  className,
}: ListItemProps) => {
  const listItemThemeOverrides =
    "theme-universal:font-(weight:--ul-theme-font-body-text-weight) mb-4 last:mb-8";

  return (
    <ListItem
      icon={icon}
      info={info}
      className={cn(listItemThemeOverrides, className)}
    >
      {children}
    </ListItem>
  );
};

const ULThemeListTitle = ({
  children,
  className,
  ...props
}: ListElementProps) => {
  const ulThemeTitleOverrides =
    "text-header font-bold text-(length:--font-size-list-title) leading-(height:--font-size-list-title)";
  return (
    <ListTitle {...props} className={cn(ulThemeTitleOverrides, className)}>
      {children}
    </ListTitle>
  );
};

const ULThemeListDescription = ({
  children,
  className,
  ...props
}: ListElementProps) => {
  const ulThemeDescOverrides =
    "text-body-text text-(length:--font-size-list-subtitle) leading-(height:--font-size-list-subtitle)";
  return (
    <ListDescription {...props} className={cn(ulThemeDescOverrides, className)}>
      {children}
    </ListDescription>
  );
};

export {
  ULThemeList,
  ULThemeListDescription,
  ULThemeListItem,
  ULThemeListTitle,
};
