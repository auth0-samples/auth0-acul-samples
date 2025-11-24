"use client";

import { useRender } from "@base-ui-components/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-visible:ring-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive theme-default:active:scale-[0.99] relative box-border inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden text-sm font-medium whitespace-nowrap transition-all duration-150 ease-in-out outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "shadow-button-resting hover:shadow-button-hover hover:border-primary/50 border-primary bg-primary text-primary-foreground hover:bg-primary/90 theme-default:before:from-primary-foreground/0 theme-default:before:to-primary-foreground/15 theme-default:before:absolute theme-default:before:top-0 theme-default:before:left-0 theme-default:before:block theme-default:before:h-full theme-default:before:w-full theme-default:before:bg-gradient-to-t theme-default:before:content-[''] border",
        outline:
          "dark:bg-muted/50 hover:text-accent-foreground shadow-button-outlined-resting hover:shadow-button-outlined-hover hover:border-accent bg-background hover:bg-muted text-primary border-primary/35 theme-default:before:from-primary/5 theme-default:before:to-primary/0 theme-default:before:absolute theme-default:before:top-0 theme-default:before:left-0 theme-default:before:block theme-default:before:h-full theme-default:before:w-full theme-default:before:bg-gradient-to-t theme-default:before:content-[''] border",
        ghost: "hover:bg-muted text-primary bg-transparent",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-button-destructive-resting hover:shadow-button-destructive-hover border-destructive-border/25 hover:border-destructive-border/50 theme-default:before:to-primary-foreground/50 theme-default:before:absolute theme-default:before:top-0 theme-default:before:left-0 theme-default:before:block theme-default:before:h-full theme-default:before:w-full theme-default:before:bg-gradient-to-t theme-default:before:content-[''] theme-default:border",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 rounded-2xl px-4 py-2.5 has-[>svg]:px-3",
        xs: "h-7 rounded-md px-2 py-1.5 text-xs has-[>svg]:px-2",
        sm: "h-8 gap-1.5 rounded-xl px-3 py-2 text-xs has-[>svg]:px-2.5",
        lg: "h-12 rounded-3xl px-6 py-3 text-base has-[>svg]:px-4",
        icon: "size-7 rounded-xl",
        link: "", // Link size can be customized via variant overrides
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends useRender.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {}

function Button({
  className,
  variant,
  size,
  render = <button />,
  ...props
}: ButtonProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: cn(buttonVariants({ variant, size }), className),
  };

  return useRender({
    render,
    props: { ...defaultProps, ...props },
  });
}

export { Button, buttonVariants };
