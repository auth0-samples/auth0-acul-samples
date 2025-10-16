import type { InputHTMLAttributes } from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

const ulThemeSearchVariants = cva(
  [
    // Layout & Spacing
    "w-full h-12 pl-10 pr-4",

    // Base Background & Colors
    "theme-universal:bg-input-bg",
    "theme-universal:text-input-text",

    // Border Styling
    "theme-universal:border-input-border",
    "theme-universal:rounded-input",
    "border outline-none",

    // Typography
    "theme-universal:text-(length:--ul-theme-font-body-text-size)",
    "theme-universal:font-body",

    // Placeholder Styling
    "theme-universal:placeholder:text-input-labels",

    // Focus States
    "theme-universal:focus:border-base-focus",
    "transition-colors duration-150",
  ],
  {
    variants: {
      variant: {
        default: [],
      },
      size: {
        default: "h-12",
        sm: "h-10",
        lg: "h-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const ulThemeSearchIconVariants = cva(
  [
    "absolute left-3 top-1/2 -translate-y-1/2",
    "theme-universal:text-input-labels",
  ],
  {
    variants: {
      size: {
        default: "w-5 h-5",
        sm: "w-4 h-4",
        lg: "w-6 h-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface ULThemeSearchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof ulThemeSearchVariants> {
  /**
   * Additional class for the wrapper container
   */
  wrapperClassName?: string;
  /**
   * Additional class for the search icon
   */
  iconClassName?: string;
}

export const ULThemeSearch = ({
  className,
  wrapperClassName,
  iconClassName,
  variant,
  size,
  placeholder = "Search",
  ...props
}: ULThemeSearchProps) => {
  return (
    <div className={cn("relative", wrapperClassName)}>
      <Search
        className={cn(ulThemeSearchIconVariants({ size }), iconClassName)}
      />
      <input
        type="text"
        placeholder={placeholder}
        className={cn(ulThemeSearchVariants({ variant, size }), className)}
        {...props}
      />
    </div>
  );
};

export default ULThemeSearch;
