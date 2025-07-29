import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import {
  ULThemeFloatingLabelField,
  type ULThemeFloatingLabelFieldProps,
} from "@/components/form/ULThemeFloatingLabelField";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ULThemePasswordFieldProps
  extends Omit<ULThemeFloatingLabelFieldProps, "type" | "endAdornment"> {
  onVisibilityToggle?: (isVisible: boolean) => void;
  buttonClassName?: string;
}

export const ULThemePasswordField = ({
  onVisibilityToggle,
  buttonClassName,
  ...props
}: ULThemePasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    const newState = !showPassword;
    setShowPassword(newState);
    onVisibilityToggle?.(newState);
  };

  const passwordButton = (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={handleToggle}
      className={cn(
        // Layout & Positioning
        "h-full w-full min-w-[44px] mr-[-5px]",

        // Border Radius - matches input field
        "theme-universal:rounded-r-input theme-universal:rounded-l-none",

        // Background & Border
        "border-0",

        // Colors
        "theme-universal:text-input-labels",
        "theme-universal:hover:text-input-text",

        // Transitions
        "transition-colors",

        // Focus States
        "focus-visible:ring-0 focus-visible:ring-offset-0",

        // Layout
        "flex items-center justify-center",
        buttonClassName
      )}
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <EyeOff className="h-5 w-5" />
      ) : (
        <Eye className="h-5 w-5" />
      )}
    </Button>
  );

  return (
    <ULThemeFloatingLabelField
      {...props}
      type={showPassword ? "text" : "password"}
      endAdornment={passwordButton}
    />
  );
};

ULThemePasswordField.displayName = "ULThemePasswordField";
