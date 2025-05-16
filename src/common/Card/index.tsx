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
  return (
    <div className={className || ""} {...rest}>
      {children}
    </div>
  );
};

export default Card;
