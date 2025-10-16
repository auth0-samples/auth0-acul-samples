import type { SVGProps } from "react";

export const MFADeviceIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="12px"
    height="18px"
    viewBox="0 0 12 18"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill={props?.color || "#757575"}
      d="M2,1 C1.44771525,1 1,1.44771525 1,2 L1,16 C1,16.5522847 1.44771525,17 2,17 L10,17 C10.5522847,17 11,16.5522847 11,16 L11,2 C11,1.44771525 10.5522847,1 10,1 L2,1 Z M2,0 L10,0 C11.1045695,-2.22044605e-16 12,0.8954305 12,2 L12,16 C12,17.1045695 11.1045695,18 10,18 L2,18 C0.8954305,18 0,17.1045695 0,16 L0,2 C0,0.8954305 0.8954305,2.22044605e-16 2,0 Z M1,3 L11,3 L11,4 L1,4 L1,3 Z M1,12 L11,12 L11,13 L1,13 L1,12 Z M6,16 C5.44771525,16 5,15.5522847 5,15 C5,14.4477153 5.44771525,14 6,14 C6.55228475,14 7,14.4477153 7,15 C7,15.5522847 6.55228475,16 6,16 Z"
    />
  </svg>
);
