import React from "react";
import { cn } from "@/lib/utils";

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
  const defaultStyles = "bg-background-widget rounded shadow-md px-10 py-10";
  return (
    <div className={cn(defaultStyles, className)} {...rest}>
      {children}
    </div>
  );
};

export default Card;
