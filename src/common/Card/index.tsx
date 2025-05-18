import React from "react";

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

const Card: React.FC<CardProps> = ({ children, className, ...rest }) => {
  const defaultStyles = "bg-background-widget rounded shadow-md px-10 py-10";
  return (
    <div className={`${defaultStyles} ${className || ""}`.trim()} {...rest}>
      {children}
    </div>
  );
};

export default Card;
