import { AlertCircle } from "lucide-react";

import { FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

export interface ULThemeFormMessageProps {
  /**
   * SDK error message (takes precedence over form validation errors)
   */
  sdkError?: string;
  /**
   * Whether there is a form validation error
   */
  hasFormError?: boolean;
  /**
   * Whether to show the error icon
   */
  showIcon?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

const ULThemeFormMessage = ({
  sdkError,
  hasFormError,
  showIcon = true,
  className,
}: ULThemeFormMessageProps) => {
  // Don't render if no errors at all
  if (!sdkError && !hasFormError) {
    return null;
  }

  // Always render with consistent theming and icon for ANY error
  return (
    <div
      className={cn(
        "flex mb-2 items-center text-sm font-medium theme-universal:text-error",
        className
      )}
      role="alert"
      aria-live="polite"
    >
      {showIcon && <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />}
      {sdkError ? (
        <p className="text-destructive text-sm theme-universal:text-error">
          {sdkError}
        </p>
      ) : (
        <FormMessage className="theme-universal:text-error" />
      )}
    </div>
  );
};

ULThemeFormMessage.displayName = "ULThemeFormMessage";

export { ULThemeFormMessage };
