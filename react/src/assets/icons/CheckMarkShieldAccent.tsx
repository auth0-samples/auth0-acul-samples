import React from "react";

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export const CheckMarkShieldAccent: React.FC<SvgIconProps> = ({ ...props }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.8972 24.0885L27.9676 17.0181C28.6646 16.3231 28.6646 15.1943 27.9676 14.4973C27.2727 13.8004 26.1438 13.8004 25.4469 14.4973L18.3764 21.5678L15.3129 18.5043C14.6317 17.823 13.5264 17.823 12.8452 18.5043C12.1639 19.1855 12.1639 20.2908 12.8452 20.972L15.9087 24.0355L15.9018 24.0424L18.4225 26.5632L18.4294 26.5563L18.4305 26.5573L20.8982 24.0896L20.8972 24.0885Z"
      fill={props?.color || "#635DFF"}
    />
  </svg>
);
