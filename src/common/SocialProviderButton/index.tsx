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

    const baseStyles =
      "flex items-center justify-start w-full max-w-[320px] h-[52px] py-[14px] px-[16px] border [border-radius:var(--ul-theme-border-button-border-radius)] gap-x-4 focus:outline-none transition-colors duration-150 ease-in-out focus:ring-4 focus:[--tw-ring-color:color-mix(in_srgb,var(--ul-theme-color-primary-button)_15%,transparent)]";

    const enabledStyles =
      "[background-color:var(--ul-theme-color-widget-background)] [border-color:var(--ul-theme-color-widget-border)] [color:var(--ul-theme-color-body-text)] hover:[background-color:color-mix(in_srgb,var(--ul-theme-color-widget-border)_20%,var(--ul-theme-color-widget-background))] focus:[background-color:color-mix(in_srgb,var(--ul-theme-color-primary-button)_15%,var(--ul-theme-color-widget-background))] cursor-pointer";

    const disabledStyles =
      "[background-color:color-mix(in_srgb,var(--ul-theme-color-widget-border)_10%,transparent)] [border-color:color-mix(in_srgb,var(--ul-theme-color-widget-border)_50%,transparent)] [color:var(--ul-theme-color-input-labels-placeholders)] cursor-not-allowed";

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
        <span className="overflow-hidden whitespace-nowrap text-ellipsis font-normal text-base">
          {buttonText}
        </span>
      </button>
    );
  },
);

SocialProviderButton.displayName = "SocialProviderButton";

export default SocialProviderButton;
