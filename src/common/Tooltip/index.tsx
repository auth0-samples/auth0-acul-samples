import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  children: React.ReactElement;
  text: string;
  className?: string;
  tooltipClassName?: string;
  position?: "top" | "bottom" | "left" | "right";
}

const Tooltip = ({
  children,
  text,
  className,
  tooltipClassName,
  position = "top",
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "left-1/2 -translate-x-1/2 bottom-[-4px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-black",
    bottom:
      "left-1/2 -translate-x-1/2 top-[-4px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[4px] border-b-black",
    left: "right-[-4px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[4px] border-l-black",
    right:
      "left-[-4px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[4px] border-r-black",
  };

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocusCapture={() => setIsVisible(true)}
      onBlurCapture={() => setIsVisible(false)}
    >
      {children}
      {isVisible && text && (
        <div
          role="tooltip"
          className={cn(
            "absolute z-10 px-2 py-1 text-xs font-medium text-white bg-black rounded shadow-sm text-center",
            positionClasses[position],
            tooltipClassName,
          )}
        >
          {text}
          <div className={cn("absolute", arrowClasses[position])} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
