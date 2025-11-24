import React from "react";

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export const GooglePlayIcon: React.FC<SvgIconProps> = ({ ...props }) => (
  <svg
    width="30px"
    height="30px"
    viewBox="0 0 14 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <title>Google Play</title>
    <desc>Created with Sketch.</desc>
    <defs>
      <linearGradient
        x1="80.7588076%"
        y1="50%"
        x2="-157.381258%"
        y2="50%"
        id="linearGradient-1"
      >
        <stop stopColor="#FFDF00" offset="0%"></stop>
        <stop stopColor="#FBBC0E" offset="41%"></stop>
        <stop stopColor="#F9A418" offset="78%"></stop>
        <stop stopColor="#F89B1C" offset="100%"></stop>
      </linearGradient>
      <linearGradient
        x1="86.2404448%"
        y1="17.8499351%"
        x2="-50.1563586%"
        y2="194.794179%"
        id="linearGradient-2"
      >
        <stop stopColor="#EE4447" offset="0%"></stop>
        <stop stopColor="#C5166C" offset="100%"></stop>
      </linearGradient>
      <linearGradient
        x1="-50.7644197%"
        y1="-95.6055392%"
        x2="60.5976372%"
        y2="48.8842767%"
        id="linearGradient-3"
      >
        <stop stopColor="#269E6F" offset="0%"></stop>
        <stop stopColor="#2BA06F" offset="5%"></stop>
        <stop stopColor="#53B26B" offset="47%"></stop>
        <stop stopColor="#6BBD69" offset="80%"></stop>
        <stop stopColor="#74C168" offset="100%"></stop>
      </linearGradient>
    </defs>
    <g
      id="Symbols"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <g
        id="Google-Play"
        transform="translate(-1.000000, 0.000000)"
        fillRule="nonzero"
      >
        <g transform="translate(1.000000, 0.000000)" id="Shape">
          <path
            d="M0.345679012,0.402716049 C0.149675511,0.636485254 0.0507086828,0.936478451 0.0691358025,1.24098765 L0.0691358025,14.428642 C0.0508862331,14.7331281 0.14983194,15.0330573 0.345679012,15.2669136 L0.388888889,15.3101235 L7.77777778,7.92123457 L7.77777778,7.74839506 L0.388888889,0.359506173 L0.345679012,0.402716049 Z"
            fill={props?.color || "#5BC8F3"}
          ></path>
          <path
            d="M10.2390123,10.3859259 L7.77777778,7.92123457 L7.77777778,7.74839506 L10.2390123,5.2837037 L10.294321,5.31481481 L13.2118519,6.97234568 C14.0449383,7.44592593 14.0449383,8.22024691 13.2118519,8.70074074 L10.294321,10.3530864 L10.2390123,10.3859259 Z"
            fill="url(#linearGradient-1)"
          ></path>
          <path
            d="M10.294321,10.3530864 L7.77777778,7.83481481 L0.345679012,15.2669136 C0.620493827,15.557284 1.07333333,15.5935802 1.58493827,15.3032099 L10.294321,10.3530864"
            fill="url(#linearGradient-2)"
          ></path>
          <path
            d="M10.294321,5.31654321 L1.58320988,0.366419753 C1.07333333,0.0760493827 0.618765432,0.112345679 0.345679012,0.402716049 L7.77777778,7.83481481 L10.294321,5.31654321 Z"
            fill="url(#linearGradient-3)"
          ></path>
        </g>
      </g>
    </g>
  </svg>
);
