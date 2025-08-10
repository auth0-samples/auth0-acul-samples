import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface ULThemeSubtitleProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The subtitle of the screen.
   */
  children: ReactNode;
  /**
   * Optional class names for additional styling or overriding default styles.
   */
  className?: string;
}

const ULThemeSubtitle = ({
  children,
  className,
  ...rest
}: ULThemeSubtitleProps) => {
  const themedStyles =
    "mb-4 text-body-text justify-text-header text-(length:--ul-theme-font-subtitle-size) font-subtitle";

  return (
    <p className={cn(themedStyles, className)} {...rest}>
      {children}
    </p>
  );
};

export default ULThemeSubtitle;
