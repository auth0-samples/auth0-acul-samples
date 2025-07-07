import { forwardRef } from "react";
import { cn } from "@/lib/utils";

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
      "flex items-center justify-start w-full max-w-[320px] h-[52px] py-[14px] px-[16px] border rounded gap-x-4 focus:outline-none transition-colors duration-150 ease-in-out focus:ring-4 focus:ring-primary/15";

    const enabledStyles =
      "bg-white border-gray-mid text-text-default hover:bg-gray-mid/20 focus:bg-primary/15 cursor-pointer";

    const disabledStyles =
      "bg-gray-mid/10 border-gray-mid/50 text-text-secondary cursor-not-allowed";

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
