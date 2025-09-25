import * as React from "react";

import { Checkbox as CheckboxPrimitive } from "@base-ui-components/react/checkbox";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export function ULThemeCheckbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  // Theme overrides for checkbox styling
  const themeOverrides = cn(
    // Override bg-primary with bg-primary-button
    "data-checked:theme-universal:bg-primary-button",
    "data-indeterminate:theme-universal:bg-primary-button",
    // Override rounded-lg with rounded-input
    "theme-universal:rounded-input",
    // Override border color to match button styling
    "data-checked:theme-universal:border-primary-button",
    "data-indeterminate:theme-universal:border-primary-button",
    // Ensure proper hover and focus states
    "theme-universal:hover:border-primary-button/50",
    "theme-universal:focus-visible:ring-base-focus/15",
    "hover:cursor-pointer"
  );

  return <Checkbox className={cn(themeOverrides, className)} {...props} />;
}
