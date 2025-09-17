import * as React from "react";

import { cn } from "@/lib/utils";

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  variant?: "bullet" | "number" | "icon" | "plain";
  spacing?: "tight" | "default" | "relaxed";
  iconPosition?: "start" | "end";
}

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode;
  description?: string;
  info?: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children, icon, description, info, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn("flex items-start justify-between gap-2", className)}
        {...props}
      >
        <div className="flex min-w-0 gap-2">
          {icon && (
            <div className="text-muted-foreground mt-1 shrink-0">{icon}</div>
          )}
          <div className="min-w-0 flex flex-col gap-1">
            <div className="text-header text-(length:--list-title-font-size) leading-(height:--list-title-font-size)">
              {children}
            </div>
            {description && (
              <p className="text-body-text text-(length:--list-subtitle-font-size) leading-(height:--list-subtitle-font-size)">
                {description}
              </p>
            )}
          </div>
        </div>
        {info && <div className="shrink-0">{info}</div>}
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

const List = React.forwardRef<HTMLUListElement, ListProps>(
  (
    {
      className,
      children,
      variant = "plain",
      spacing = "default",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      iconPosition = "start",
      ...props
    },
    ref
  ) => {
    return (
      <ul
        ref={ref}
        className={cn(
          "text-sm",

          spacing === "tight" && "space-y-2",
          spacing === "default" && "space-y-3",
          spacing === "relaxed" && "space-y-4",

          variant === "bullet" && "list-inside list-disc",
          variant === "number" && "list-inside list-decimal",
          variant === "plain" && "divide-border list-none divide-y",
          className
        )}
        {...props}
      >
        {children}
      </ul>
    );
  }
);
List.displayName = "List";

export { List, ListItem };
