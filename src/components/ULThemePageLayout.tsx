import React from "react";
import { cn } from "@/lib/utils";

export interface ULThemePageLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the layout.
   */
  children: React.ReactNode;
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
    "flex px-10 py-20 justify-page-layout bg-background-page bg-(image:--ul-theme-page-bg-background-image-url)";
  return (
    <div className={cn(themedStyles, className)} {...rest}>
      {children}
    </div>
  );
};

export default ULThemePageLayout;
