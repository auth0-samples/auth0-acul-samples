import React from "react";

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export const LockHeavyMask: React.FC<SvgIconProps> = ({ ...props }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M37.9156 44H10.0057C7.79312 44 6 42.2069 6 39.9943V26.0005C6 23.7879 7.79312 21.9948 10.0057 21.9948H37.9156C40.1282 21.9948 41.9213 23.7879 41.9213 26.0005V39.9943C41.9213 42.2069 40.1282 44 37.9156 44Z"
      fill={props?.color || "#D0CEFF"}
    />
    <path
      d="M17.9651 21.9948V15.9769C17.9651 12.6711 20.6442 9.99199 23.95 9.99199C27.2559 9.99199 29.935 12.6711 29.935 15.9769L29.9538 15.9934C29.9538 17.6499 31.2969 18.9929 32.9533 18.9929C34.6098 18.9929 35.9529 17.6499 35.9529 15.9934L35.9576 16.0075C35.9599 9.377 30.5829 4 23.95 4C17.3195 4 11.9425 9.377 11.9425 16.0099V21.9948"
      fill={props?.color || "#635DFF"}
    />
  </svg>
);
