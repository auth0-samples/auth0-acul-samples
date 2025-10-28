import React from "react";

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export const LockHeavyAccent: React.FC<SvgIconProps> = ({ ...props }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M23.9312 37.9491C26.6861 37.9491 28.9194 35.7158 28.9194 32.9609C28.9194 30.206 26.6861 27.9727 23.9312 27.9727C21.1763 27.9727 18.943 30.206 18.943 32.9609C18.943 35.7158 21.1763 37.9491 23.9312 37.9491Z"
      fill={props?.color || "#635DFF"}
    />
    <path
      d="M17.9651 21.9948V15.9769C17.9651 12.6711 20.6442 9.99199 23.95 9.99199C27.2559 9.99199 29.935 12.6711 29.935 15.9769L29.9538 15.9934C29.9538 17.6499 31.2969 18.9929 32.9533 18.9929C34.6098 18.9929 35.9529 17.6499 35.9529 15.9934L35.9576 16.0075C35.9599 9.377 30.5829 4 23.95 4C17.3195 4 11.9425 9.377 11.9425 16.0099V21.9948"
      fill={props?.color || "#635DFF"}
    />
  </svg>
);
