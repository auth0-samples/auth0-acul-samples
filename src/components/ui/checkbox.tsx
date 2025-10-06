import * as React from "react";

import { Checkbox as CheckboxPrimitive } from "@base-ui-components/react/checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "group shadow-checkbox-resting peer hover:shadow-checkbox-hover focus-visible:ring-ring hover:border-primary/50 border-border data-indeterminate:border-primary data-indeterminate:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-checked:border-primary focus-visible:border-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-checked:bg-primary relative flex size-6 shrink-0 appearance-none items-center justify-center rounded-lg border transition-[colors,shadow] duration-150 ease-in-out outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="data-checked:animate-in data-unchecked:animate-out data-unchecked:fade-out-0 data-checked:fade-in-0 data-unchecked:slide-out-to-bottom-5 data-unchecked:zoom-out-75 data-checked:zoom-in-75 data-checked:slide-in-from-bottom-5 text-primary-foreground stroke-primary-foreground flex duration-150 ease-in-out data-checked:block data-unchecked:hidden"
      >
        {props.indeterminate ? (
          <MinusIcon className="size-3 stroke-[4px]" absoluteStrokeWidth />
        ) : (
          <CheckIcon className="size-3 stroke-[4px]" absoluteStrokeWidth />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
