import { forwardRef } from "react";

import { ChevronRight } from "lucide-react";

import { ULThemeButton } from "@/components/ULThemeButton";
import { cn } from "@/lib/utils";

export interface ULThemeCountryCodePickerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Selected country information
   */
  selectedCountry?:
    | {
        name: string;
        code: string; // Country code like "DZ"
        dialCode: string; // Phone code like "+213"
        flag: string; // Flag emoji or URL
      }
    | undefined;
  /**
   * Placeholder text when no country is selected
   */
  placeholder?: string;
  /**
   * Full width styling
   */
  fullWidth?: boolean;
}

const ULThemeCountryCodePicker = forwardRef<
  HTMLButtonElement,
  ULThemeCountryCodePickerProps
>(
  (
    {
      selectedCountry,
      placeholder = "Select Country",
      fullWidth = false,
      className,
      disabled,
      ...rest
    },
    ref
  ) => {
    const widthStyles = fullWidth ? "w-full" : "";
    const disabledStyles = disabled
      ? "disabled:opacity-70 cursor-not-allowed"
      : "cursor-pointer";

    return (
      <ULThemeButton
        ref={ref}
        type="button"
        variant="outline"
        disabled={disabled}
        className={cn(
          // Override ULThemeButton styles for country picker specific styling
          "justify-between text-left font-medium",
          "theme-universal:bg-input-bg",
          "theme-universal:text-input-text",
          "theme-universal:border-input-border",
          "theme-universal:text-(length:--ul-theme-font-body-text-size)",
          "theme-universal:font-body",
          "theme-universal:rounded-input",
          "theme-universal:hover:border-base-focus",
          widthStyles,
          disabledStyles,
          className
        )}
        {...rest}
      >
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {selectedCountry ? (
            <>
              {/* Flag */}
              <div className="flex-shrink-0 w-6 h-4 flex items-center justify-center">
                {selectedCountry.flag.startsWith("http") ? (
                  <img
                    src={selectedCountry.flag}
                    alt={`${selectedCountry.name} flag`}
                    className="w-6 h-4 object-cover rounded-sm"
                  />
                ) : (
                  <span className="text-font-base">{selectedCountry.flag}</span>
                )}
              </div>

              {/* Country Info */}
              <div className="flex-1 min-w-0">
                <span className="theme-universal:text-input-text theme-universal:font-body truncate">
                  {selectedCountry.name}, {selectedCountry.code},{" "}
                  {selectedCountry.dialCode}
                </span>
              </div>
            </>
          ) : (
            <>
              {/* Placeholder state */}
              <div className="flex-shrink-0 w-6 h-4 theme-universal:bg-input-border rounded-sm"></div>
              <span className="theme-universal:text-input-labels flex-1 truncate">
                {placeholder}
              </span>
            </>
          )}
        </div>

        {/* Chevron */}
        <ChevronRight
          className={cn("w-4 h-4 theme-universal:text-input-labels")}
        />
      </ULThemeButton>
    );
  }
);

ULThemeCountryCodePicker.displayName = "ULThemeCountryCodePicker";

export default ULThemeCountryCodePicker;
