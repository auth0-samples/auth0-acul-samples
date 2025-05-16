import React from "react";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  htmlFor: string;
  className?: string;
}

const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  className,
  ...rest
}) => {
  // Base styles for the label, including absolute positioning and transition
  const baseLabelStyles =
    "absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary transition-all duration-200 ease-in-out pointer-events-none origin-[0]";

  // Styles for when the label is floated (input has focus or value)
  // Includes moving up, scaling down, changing color, and adding a background to cut through the input border
  const floatedLabelStyles =
    "peer-focus:scale-75 peer-focus:-translate-y-[1.15rem] peer-focus:top-2 peer-focus:text-link peer-focus:z-10 " +
    "peer-[.is-forced-focus]:scale-75 peer-[.is-forced-focus]:-translate-y-[1.15rem] peer-[.is-forced-focus]:top-2 peer-[.is-forced-focus]:text-link peer-[.is-forced-focus]:z-10 " +
    "peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-[1.15rem] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-link peer-[:not(:placeholder-shown)]:z-10 " +
    "peer-focus:bg-background-widget peer-focus:px-2 " +
    "peer-[.is-forced-focus]:bg-background-widget peer-[.is-forced-focus]:px-2 " +
    "peer-[:not(:placeholder-shown)]:bg-background-widget peer-[:not(:placeholder-shown)]:px-2";

  return (
    <label
      htmlFor={htmlFor}
      className={`${baseLabelStyles} ${floatedLabelStyles} ${className || ""}`.trim()}
      {...rest}
    >
      {children}
    </label>
  );
};

export default Label;
