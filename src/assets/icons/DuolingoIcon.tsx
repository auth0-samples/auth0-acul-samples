import React from "react";

export const DuolingoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="20" height="20" rx="10" fill="#71B449" />
    <g clipPath="url(#clip0_duolingo_icon)">
      <path
        d="M11 16.0001H5V10.3001H16.9925C16.8362 13.4744 14.2131 16.0001 11 16.0001Z"
        fill="#E8F3DA"
      />
      <path
        d="M11 3.99995H5V9.69995H16.9925C16.8362 6.52564 14.2131 3.99995 11 3.99995Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_duolingo_icon">
        <rect
          width="12"
          height="12.0001"
          fill="white"
          transform="translate(5 4)"
        />
      </clipPath>
    </defs>
  </svg>
);
