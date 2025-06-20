import { forwardRef } from "react";
import { cn } from "@/utils/helpers/cn";

interface SocialProviderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  displayName: string;
  iconComponent: React.ReactNode | null;
  buttonText: string;
}

const SocialProviderButton = forwardRef<
  HTMLButtonElement,
  SocialProviderButtonProps
>(
  (
    {
      onClick,
      displayName,
      iconComponent,
      buttonText,
      disabled = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const dataTestId = `social-provider-button-${displayName.toLowerCase().replace(/\s+/g, "-")}`;

    const baseStyles = [
      "flex items-center justify-start w-full max-w-[320px] h-[52px] py-[14px] px-[16px]",
      "border rounded-button gap-x-4 focus:outline-none transition-colors duration-150 ease-in-out",
      "focus:ring-4 focus:ring-primary-button/15",
      "text-button font-button",
    ];

    const enabledStyles = [
      "bg-widget-bg border-widget-border text-body-text",
      "hover:bg-widget-border/20 focus:bg-primary-button/15",
      "cursor-pointer",
    ];

    const disabledStyles = [
      "bg-widget-border/10 border-widget-border/50 text-input-labels",
      "cursor-not-allowed",
    ];

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={cn(
          baseStyles,
          disabled ? disabledStyles : enabledStyles,
          className,
        )}
        data-testid={dataTestId}
        title={buttonText}
        disabled={disabled}
        {...rest}
      >
        {iconComponent && (
          <span className="mr-3 w-5 h-5 flex items-center justify-center flex-shrink-0">
            {iconComponent}
          </span>
        )}
        <span className="overflow-hidden whitespace-nowrap text-ellipsis">
          {buttonText}
        </span>
      </button>
    );
  },
);

SocialProviderButton.displayName = "SocialProviderButton";

export default SocialProviderButton;
