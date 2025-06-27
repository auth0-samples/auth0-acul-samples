import React from "react";
import { cn } from "@/utils/helpers/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the card.
   */
  children: React.ReactNode;
  /**
   * Optional class names for additional styling or overriding default styles.
   */
  className?: string;
}

const Card = ({ children, className, ...rest }: CardProps) => {
  const baseStyles = [
    // Auth0 semantic classes - clean and readable
    "bg-widget-bg",
    "rounded-widget",
    "p-10",
    "shadow-widget",
  ];

  return (
    <div className={cn(baseStyles, className)} {...rest}>
      {children}
    </div>
  );
};

export default Card;
