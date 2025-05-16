import React from "react";

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

export const ExclamationCircleIcon: React.FC<SvgIconProps> = ({
  title,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none" // Typically error icons are outlines, fill can be added if needed
    stroke="currentColor"
    strokeWidth="1.5"
    width="1em"
    height="1em"
    aria-hidden={title ? undefined : "true"}
    focusable="false"
    {...props} // className, etc. passed from Icon wrapper
  >
    {title && <title>{title}</title>} {/* SVG accessible title */}
    {/* Placeholder paths for ExclamationCircleIcon - replace with actual SVG */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
    />
  </svg>
);
