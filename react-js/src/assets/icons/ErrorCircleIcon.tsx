import React from "react";

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

export const ErrorCircleIcon: React.FC<SvgIconProps> = ({
  title,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="none"
    width="1em"
    height="1em"
    aria-hidden={title ? undefined : "true"}
    focusable="false"
    {...props}
  >
    {title && <title>{title}</title>}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 14.667A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.334z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 4.583a.75.75 0 0 1 .75.75V8a.75.75 0 0 1-1.5 0V5.333a.75.75 0 0 1 .75-.75z"
      fill="white"
    />
    <path
      d="M8.667 10.667a.667.667 0 1 1-1.334 0 .667.667 0 0 1 1.334 0z"
      fill="white"
    />
  </svg>
);
