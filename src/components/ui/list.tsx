import * as React from "react";

import { cn } from "@/lib/utils";

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  variant?: "bullet" | "number" | "icon" | "plain";
  spacing?: "tight" | "default" | "relaxed";
  iconPosition?: "start" | "end";
}

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  info?: React.ReactNode;
}

export interface ListElementProps {
  children: React.ReactNode;
  className?: string;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children, icon, info, ...props }, ref) => {
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
          <div className="min-w-0 flex flex-col gap-1">{children}</div>
        </div>
        {info && <div className="shrink-0">{info}</div>}
      </li>
    );
  }
);

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

const ListTitle = ({ children, className }: ListElementProps) => {
  return (
    <div className={cn("text-primary text-sm", className)}>{children}</div>
  );
};

const ListDescription = ({ children, className }: ListElementProps) => {
  return (
    <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>
  );
};

List.displayName = "List";

export { List, ListDescription, ListItem, ListTitle };
