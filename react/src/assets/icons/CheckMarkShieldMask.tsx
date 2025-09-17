import React from "react";

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export const CheckMarkShieldMask: React.FC<SvgIconProps> = ({ ...props }) => (
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
      d="M32.7303 7.37629L21.0708 3.49307C20.7449 3.38313 20.4033 3.33012 20.0637 3.33208C19.724 3.33012 19.3825 3.38313 19.0546 3.49307L7.39708 7.37629C5.9659 7.85335 5 9.19225 5 10.702V23.0073L5.01571 23.0525C5.2454 26.3546 13.8226 34.4626 20.0028 36.6654H20.1245C26.3047 34.4626 34.8839 26.3546 35.1117 23.0525L35.1254 23.0073V10.702C35.1254 9.19225 34.1615 7.85335 32.7303 7.37629Z"
      fill={props?.color || "#D0CEFF"}
    />
  </svg>
);
