import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface ULThemePageLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the layout.
   */
  children: ReactNode;
  /**
   * Optional class names for additional styling or overriding default styles.
   */
  className?: string;
}

const ULThemePageLayout = ({
  children,
  className,
  ...rest
}: ULThemePageLayoutProps) => {
  const themedStyles =
    "flex items-center min-h-screen px-10 py-20 justify-page-layout bg-(color:--ul-theme-page-bg-background-color) bg-(image:--ul-theme-page-bg-background-image-url)";
  return (
    <div className={cn(themedStyles, className)} {...rest}>
      {children}
    </div>
  );
};

export default ULThemePageLayout;
