import * as React from "react";

import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinnerVariants = cva(
  "text-surface inline-block h-8 w-8 rounded-full duration-[5000] ease-linear",
  {
    variants: {
      variant: {
        dots: "border-primary animate-[spin_5s_linear_infinite] border-6 border-dotted",
        pulse: "bg-primary animate-pulse",
        solid: "border-primary animate-spin border-2 border-e-transparent",
      },
      size: {
        sm: "size-4",
        md: "size-8",
        lg: "size-12",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

export function Spinner({ variant, size, className, ...props }: SpinnerProps) {
  return (
    <div
      className={cn(spinnerVariants({ variant, size }), className)}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
