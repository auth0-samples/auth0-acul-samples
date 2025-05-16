import React from "react";

export interface SeparatorProps {
  text?: string; // Optional text to display in the middle of the separator
  className?: string;
  textClassName?: string;
  lineClassName?: string;
}

const Separator: React.FC<SeparatorProps> = ({
  text,
  className = "my-6", // Default margin
  textClassName = "px-2 text-xs text-text-default uppercase",
  lineClassName = "border-gray-mid",
}) => {
  if (text) {
    return (
      <div className={`relative flex items-center ${className}`}>
        <div className={`flex-grow border-t ${lineClassName}`} />
        <span className={`flex-shrink ${textClassName}`}>{text}</span>
        <div className={`flex-grow border-t ${lineClassName}`} />
      </div>
    );
  }

  return <hr className={`${className} ${lineClassName}`} />;
};

export default Separator;
