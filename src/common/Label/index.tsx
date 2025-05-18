import React from "react";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  htmlFor: string;
  className?: string;
  isError?: boolean;
}

const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  className,
  isError,
  ...rest
}) => {
  const unfloatedTextColor = isError ? "text-error" : "text-text-secondary";
  const baseLabelStyles =
    `absolute left-3 top-1/2 -translate-y-1/2 ${unfloatedTextColor} transition-all duration-200 ease-in-out pointer-events-none origin-[0]`;

  // Determine floated text color based on isError
  const floatedTextColor = isError ? "!text-error" : "text-link";

  // Styles for when the label is floated (input has focus or value)
  // Includes moving up, scaling down, changing color, and adding a background to cut through the input border
  const floatedLabelStyles =
    // Base floating anatomy (scale, position, z-index)
    "peer-focus:scale-75 peer-focus:-translate-y-[1.18rem] peer-focus:top-2 peer-focus:z-10 " +
    "peer-[.is-forced-focus]:scale-75 peer-[.is-forced-focus]:-translate-y-[1.18rem] peer-[.is-forced-focus]:top-2 peer-[.is-forced-focus]:z-10 " +
    "peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-[1.18rem] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:z-10 " +
    // Apply determined text color to all floated states
    `peer-focus:${floatedTextColor} ` +
    `peer-[.is-forced-focus]:${floatedTextColor} ` +
    `peer-[:not(:placeholder-shown)]:${floatedTextColor} ` +
    // Background for cut-through effect (common to all floated states)
    "peer-focus:bg-background-widget peer-focus:px-2 " +
    "peer-[.is-forced-focus]:bg-background-widget peer-[.is-forced-focus]:px-2 " +
    "peer-[:not(:placeholder-shown)]:bg-background-widget peer-[:not(:placeholder-shown)]:px-2";

  return (
    <label
      htmlFor={htmlFor}
      className={`${baseLabelStyles} ${floatedLabelStyles} overflow-hidden whitespace-nowrap text-ellipsis max-w-full box-border px-3 ${className || ""}`.trim()}
      {...rest}
    >
      {children}
    </label>
  );
};

export default Label;
