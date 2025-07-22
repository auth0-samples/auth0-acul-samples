import { forwardRef } from "react";

import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export interface CountryCodePickerProps
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
   * Loading state
   */
  isLoading?: boolean;
  /**
   * Full width styling
   */
  fullWidth?: boolean;
}

const CountryCodePicker = forwardRef<HTMLButtonElement, CountryCodePickerProps>(
  (
    {
      selectedCountry,
      placeholder = "Select Country",
      isLoading = false,
      fullWidth = false,
      className,
      disabled,
      ...rest
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-between px-4 py-4 bg-background-widget text-text-default border border-gray-mid hover:bg-primary/5 focus:bg-primary/15 focus:outline-none focus:ring-4 focus:ring-primary/15 transition-colors duration-150 ease-in-out text-md rounded font-medium text-left";

    const widthStyles = fullWidth ? "w-full" : "";
    const disabledStyles =
      disabled || isLoading
        ? "disabled:opacity-70 cursor-not-allowed"
        : "cursor-pointer";

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || isLoading}
        className={cn(baseStyles, widthStyles, disabledStyles, className)}
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
                  <span className="text-lg">{selectedCountry.flag}</span>
                )}
              </div>

              {/* Country Info */}
              <div className="flex-1 min-w-0">
                <span className="text-gray-900 font-medium truncate">
                  {selectedCountry.name}, {selectedCountry.code},{" "}
                  {selectedCountry.dialCode}
                </span>
              </div>
            </>
          ) : (
            <>
              {/* Placeholder state */}
              <div className="flex-shrink-0 w-6 h-4 bg-gray-200 rounded-sm"></div>
              <span className="text-gray-500 flex-1 truncate">
                {placeholder}
              </span>
            </>
          )}
        </div>

        {/* Chevron */}
        <div className="flex-shrink-0 ml-2">
          <ChevronRight
            className={cn(
              "w-4 h-4 text-gray-400 transition-transform duration-200",
              isLoading && "animate-pulse"
            )}
          />
        </div>
      </button>
    );
  }
);

CountryCodePicker.displayName = "CountryCodePicker";

export default CountryCodePicker;
