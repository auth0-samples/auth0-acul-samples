import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

export interface ULThemeSocialProviderButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    ButtonProps {
  /**
   * The icon to be displayed in the social login button component
   */
  iconComponent: React.ReactNode | null;
  /**
   * The display Name to be displayed in the social login button component
   */
  displayName: string;
  /**
   * The button text to be displayed in the social login button component
   */
  buttonText: string;
  /**
   * Optional class names for additional styling or overriding default styles.
   */
  className?: string;
}

const ULThemeSocialProviderButton = ({
  onClick,
  variant = "outline",
  size = "default",
  iconComponent,
  displayName,
  buttonText,
  disabled = false,
  className,
  ...rest
}: ULThemeSocialProviderButtonProps) => {
  // Data Test Id needed for targetting element
  const dataTestId = `social-provider-button-${displayName.toLowerCase().replace(/\s+/g, "-")}`;

  // Base Styles getting applied for look and feel
  const baseStyles =
    "flex items-center justify-start w-full max-w-[320px] h-[52px] py-[14px] px-[16px] gap-x-4";

  // Keeping the button enable and disable styles as is. Will need to revisit this in future if needed
  const enabledStyles =
    "bg-white border-gray-mid text-text-default cursor-pointer";
  const disabledStyles =
    "bg-gray-mid/10 border-gray-mid/50 text-text-secondary cursor-not-allowed";

  // UL theme overrrides
  const variantThemeOverrides = {
    outline: cn(
      "theme-universal:font-button", //font-weight
      "theme-universal:rounded-button", // border-radius
      "theme-universal:border-(length:--ul-theme-border-button-border-weight)", // border-weight or border-width
      "theme-universal:border-(--color-secondary-button-border)", // border-color
      "theme-universal:text-(--color-secondary-button-label)", // text label color
      "theme-universal:hover:shadow-[var(--button-hover-shadow)]", // box-shadow on hover
      "theme-universal:focus:outline-none theme-universal:focus:ring-4 theme-universal:focus:ring-base-focus/15 theme-universal:focus:bg-base-focus/15" // focus base color
    ),
    primary: "", // Add primary overrides if needed
    secondary: "", // Add secondary overrides if needed
    destructive: "", // Add destructive overrides if needed
    ghost: "", // Add ghost overrides if needed
    link: "", // Add link overrides if needed
  };

  // Combine all theme classes with proper type safety
  const themeClasses = cn(variant && variantThemeOverrides[variant]);

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        baseStyles,
        disabled ? disabledStyles : enabledStyles,
        themeClasses,
        className
      )}
      data-testid={dataTestId}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {iconComponent && (
        <span className="w-5 h-5 flex items-center justify-center">
          {iconComponent}
        </span>
      )}
      <span className="overflow-hidden whitespace-nowrap text-ellipsis text-base">
        {buttonText}
      </span>
    </Button>
  );
};

export default ULThemeSocialProviderButton;
