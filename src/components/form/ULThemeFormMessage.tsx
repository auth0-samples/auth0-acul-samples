import { ErrorCircleIcon } from "@/assets/icons";
import Icon from "@/common/Icon";
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
      {showIcon && (
        <Icon As={ErrorCircleIcon} className="h-4 w-4 mr-1 flex-shrink-0" />
      )}
      <FormMessage className="theme-universal:text-error">
        {sdkError}
      </FormMessage>
    </div>
  );
};

ULThemeFormMessage.displayName = "ULThemeFormMessage";

export { ULThemeFormMessage };
