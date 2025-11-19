import { useMemo, useState } from "react";

import { useErrors } from "@auth0/auth0-acul-react/mfa-country-codes";
import type { ErrorItem, PhonePrefix } from "@auth0/auth0-acul-react/types";
import { ChevronRight } from "lucide-react";

import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeSearch from "@/components/ULThemeSearch";
import ULThemeSeparator from "@/components/ULThemeSeparator";
import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";
import { cn } from "@/lib/utils";
import { getCountryFlag } from "@/utils/helpers/countryUtils";

import { useMfaCountryCodesManager } from "../hooks/useMfaCountryCodesManager";

function MfaCountryCodesList() {
  const { phonePrefixes, handleSelectCountryCode, texts, locales } =
    useMfaCountryCodesManager();

  const [searchQuery, setSearchQuery] = useState("");

  const { errors, hasError, dismiss } = useErrors();

  // Get general errors (not field-specific)
  const generalErrors: ErrorItem[] = errors
    .byKind("auth0")
    .filter((err) => !err.field);

  // Filter countries based on search query - memoized to avoid recalculation on every render
  const filteredCountries = useMemo(() => {
    return phonePrefixes.filter((prefix: PhonePrefix) => {
      const query = searchQuery.toLowerCase();
      return (
        prefix.country.toLowerCase().includes(query) ||
        prefix.country_code.toLowerCase().includes(query) ||
        prefix.phone_prefix.includes(query)
      );
    });
  }, [phonePrefixes, searchQuery]);

  // Use locales as fallback to SDK texts
  const searchPlaceholder =
    texts?.searchPlaceholder || locales?.list?.searchPlaceholder;
  const noResultsText = texts?.noResultsText || locales?.list?.noResultsText;

  return (
    <>
      {/* Display general errors */}
      {hasError && generalErrors.length > 0 && (
        <div className="space-y-3 mb-4">
          {generalErrors.map((error) => (
            <ULThemeAlert
              key={error.id}
              variant="destructive"
              onDismiss={() => dismiss(error.id)}
            >
              <ULThemeAlertTitle>
                {error.message || locales?.errors?.errorOccurred}
              </ULThemeAlertTitle>
            </ULThemeAlert>
          ))}
        </div>
      )}

      {/* Search Box */}
      <div className="mb-2">
        <ULThemeSearch
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Scrollable Country List */}
      <div
        className={cn(
          "space-y-0 max-h-[400px] overflow-y-auto overflow-x-hidden",
          // Custom scrollbar styling
          "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
          "[&::-webkit-scrollbar]:w-2",
          "[&::-webkit-scrollbar-track]:bg-transparent",
          "[&::-webkit-scrollbar-thumb]:bg-gray-300",
          "[&::-webkit-scrollbar-thumb]:rounded-full",
          "[&::-webkit-scrollbar-thumb]:hover:bg-gray-400"
        )}
      >
        {filteredCountries.length > 0 ? (
          filteredCountries.map((prefix: PhonePrefix, index: number) => {
            const countryLabel = `${prefix.country} (+${prefix.phone_prefix})`;

            return (
              <div
                key={`${prefix.country_code}-${prefix.phone_prefix}`}
                className={cn(
                  "transition-colors duration-150",
                  "hover:bg-gray-50/50 rounded-md"
                )}
              >
                <ULThemeSocialProviderButton
                  variant="ghost"
                  displayName={countryLabel}
                  buttonText={countryLabel}
                  iconComponent={
                    <span className="text-2xl w-6 h-6 flex items-center justify-center">
                      {getCountryFlag(prefix.country_code)}
                    </span>
                  }
                  iconEnd={<ChevronRight size={24} color="#6f7780" />}
                  onClick={() =>
                    handleSelectCountryCode(
                      prefix.country_code,
                      prefix.phone_prefix
                    )
                  }
                  className="w-full justify-between px-0 [&>span:nth-child(2)]:font-semibold"
                />
                {index < filteredCountries.length - 1 && (
                  <ULThemeSeparator className="my-1" />
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 theme-universal:text-input-labels">
            {noResultsText}
          </div>
        )}
      </div>
    </>
  );
}

export default MfaCountryCodesList;
