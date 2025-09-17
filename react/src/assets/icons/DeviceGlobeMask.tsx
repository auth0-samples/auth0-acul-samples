import React from "react";

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export const DeviceGlobeMask: React.FC<SvgIconProps> = ({ ...props }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M27.985 2H12.015C9.79728 2 8 3.61381 8 5.60509V34.3949C8 36.3862 9.79728 38 12.015 38H27.985C30.2027 38 32 36.3862 32 34.3949V5.60509C32 3.61381 30.2027 2 27.985 2Z"
      fill={props?.color || "#000000"}
    />
  </svg>
);
