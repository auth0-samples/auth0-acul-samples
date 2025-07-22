import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface ULThemeTitleProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The title of the screen.
   */
  children: ReactNode;
  /**
   * Optional class names for additional styling or overriding default styles.
   */
  className?: string;
}

const ULThemeTitle = ({ children, className, ...rest }: ULThemeTitleProps) => {
  const themedStyles =
    "mt-6 mb-4 text-header justify-text-header text-(length:--ul-theme-font-title-size) font-title";

  return (
    <h1 className={cn(themedStyles, className)} {...rest}>
      {children}
    </h1>
  );
};

export default ULThemeTitle;
