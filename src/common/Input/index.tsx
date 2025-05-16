import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * The unique id of the input field.
   */
  id: string;
  /**
   * The name of the input field.
   */
  name: string;
  /**
   * Optional class names for styling.
   */
  className?: string;
  /**
   * Ref for the input element.
   */
  ref?: React.Ref<HTMLInputElement>;
  forceFocusStyle?: boolean;
  placeholder?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      className,
      id,
      name,
      forceFocusStyle,
      placeholder,
      ...rest
    },
    ref,
  ) => {
    let baseInputStyles =
      "block w-full px-3 py-4 h-14 border rounded focus:outline-none peer box-border";

    const standardFocusClasses = "ring-1 ring-link border-link";
    let forcedFocusClass = "";

    if (forceFocusStyle) {
      baseInputStyles += ` ${standardFocusClasses}`;
      forcedFocusClass = "is-forced-focus";
    } else {
      baseInputStyles += ` focus:ring-1`;
    }

    return (
      <input
        type={type}
        id={id}
        name={name}
        ref={ref}
        placeholder={placeholder || "\u00A0"}
        className={`${baseInputStyles} ${forcedFocusClass} ${className || ""}`.trim()}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";
export default Input;
