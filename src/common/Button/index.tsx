import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The content of the button.
   */
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  disabled,
  ...rest
}) => {
  return (
    <button type={type} disabled={disabled} aria-disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
