import * as React from "react";

import { X } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export interface ULThemeErrorProps extends React.ComponentProps<"div"> {
  variant?: "destructive";
  onDismiss?: () => void;
}

function ULThemeAlert({
  variant = "destructive",
  className,
  onDismiss,
  children,
  ...props
}: ULThemeErrorProps) {
  // Variant-specific theme overrides for Auth0 styling
  const variantThemeOverrides = {
    destructive: cn(
      "p-4",
      "theme-universal:bg-error", //background-color
      "theme-universal:text-(--ul-theme-color-primary-button-label)", //text-color
      "theme-universal:rounded-button", //border-radius
      "theme-universal:font-body", //font-weight
      "theme-universal:text-(length:--ul-theme-font-body-text-size)" //font-size
    ),
  };

  const themeClasses = cn(variant && variantThemeOverrides[variant]);

  return (
    <Alert
      variant={variant}
      className={cn(className, themeClasses, onDismiss && "relative")}
      {...props}
    >
      {children}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={cn(
            "absolute right-4 top-4",
            "opacity-60 hover:opacity-100 transition-opacity",
            "focus:outline-none focus:ring-offset-2 focus:ring-current rounded"
          )}
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </Alert>
  );
}

function ULThemeAlertTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // Theme overrides for error title styling
  const themeClasses = cn(
    "theme-universal:text-(--ul-theme-color-primary-button-label)", //text-color
    "theme-universal:font-body", //font-weight
    "theme-universal:text-(length:--ul-theme-font-body-text-size)" //font-size
  );

  return <AlertTitle className={cn(className, themeClasses)} {...props} />;
}

export { ULThemeAlert, ULThemeAlertTitle };
export default ULThemeAlert;
