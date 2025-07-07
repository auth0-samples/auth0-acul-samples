import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const linkVariants = cva(
  "focus-within:ring-ring inline-flex items-center gap-2 rounded-md py-0.5 underline-offset-4 transition-colors focus:ring-3 focus-visible:outline-hidden",
  {
    variants: {
      variant: {
        destructive: "text-destructive hover:text-destructive/90",
        muted: "text-muted hover:text-muted/80",
        primary: "text-primary hover:text-primary/90",
      },
      underline: {
        none: "no-underline",
        hover: "no-underline hover:underline",
        always: "underline",
      },
    },
    defaultVariants: {
      variant: "primary",
      underline: "always",
    },
  },
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {}

function Link(
  { className, children, variant, underline, ...props }: LinkProps,
  ref: React.Ref<HTMLAnchorElement> | undefined,
) {
  return (
    <a
      ref={ref}
      className={cn(linkVariants({ variant, underline }), className)}
      {...props}
    >
      {children}
    </a>
  );
}

export { Link };
