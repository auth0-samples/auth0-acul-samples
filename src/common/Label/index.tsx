import React from "react";
import { cn } from "@/utils/helpers/cn";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  htmlFor: string;
  className?: string;
  isError?: boolean;
  forceApplyFocusStyle?: boolean;
}

const Label = ({
  children,
  htmlFor,
  className,
  isError,
  forceApplyFocusStyle,
  ...rest
}: LabelProps) => {
  const unfloatedTextColor = isError
    ? "[color:var(--ul-theme-color-error)]"
    : forceApplyFocusStyle
      ? "![color:var(--ul-theme-color-links-focused-components)]"
      : "[color:var(--ul-theme-color-input-labels-placeholders)]";

  const baseLabelStyles = cn(
    "absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-200 ease-in-out pointer-events-none origin-[0]",
    unfloatedTextColor,
  );

  const floatedTextColorForFilledOrForced = isError
    ? "![color:var(--ul-theme-color-error)]"
    : "![color:var(--ul-theme-color-links-focused-components)]";

  const floatedLabelStyles = cn(
    "peer-focus:scale-75 peer-focus:-translate-y-[1.18rem] peer-focus:top-2 peer-focus:z-10",
    isError
      ? "peer-focus:![color:var(--ul-theme-color-error)]"
      : "peer-focus:![color:var(--ul-theme-color-links-focused-components)]",
    "peer-[.is-forced-focus]:scale-75 peer-[.is-forced-focus]:-translate-y-[1.18rem] peer-[.is-forced-focus]:top-2 peer-[.is-forced-focus]:z-10",
    `peer-[.is-forced-focus]:${floatedTextColorForFilledOrForced}`,
    "peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-[1.18rem] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:z-10",
    `peer-[:not(:placeholder-shown)]:${floatedTextColorForFilledOrForced}`,
    "peer-focus:[background-color:var(--ul-theme-color-widget-background)] peer-focus:px-2",
    "peer-[.is-forced-focus]:[background-color:var(--ul-theme-color-widget-background)] peer-[.is-forced-focus]:px-2",
    "peer-[:not(:placeholder-shown)]:[background-color:var(--ul-theme-color-widget-background)] peer-[:not(:placeholder-shown)]:px-2",
  );

  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        baseLabelStyles,
        floatedLabelStyles,
        "overflow-hidden whitespace-nowrap text-ellipsis max-w-[calc(100%-1rem)] box-border px-3",
        className,
      )}
      {...rest}
    >
      {children}
    </label>
  );
};

export default Label;
