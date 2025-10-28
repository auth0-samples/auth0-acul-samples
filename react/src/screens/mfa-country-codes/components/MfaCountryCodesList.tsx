import { useMemo, useState } from "react";

import type { Error, PhonePrefix } from "@auth0/auth0-acul-react/types";
import { ChevronRight } from "lucide-react";

import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeSearch from "@/components/ULThemeSearch";
import ULThemeSeparator from "@/components/ULThemeSeparator";
import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";
import { cn } from "@/lib/utils";
import { getCountryFlag } from "@/utils/helpers/countryUtils";

import { useMfaCountryCodesManager } from "../hooks/useMfaCountryCodesManager";

function MfaCountryCodesList() {
  const { errors, phonePrefixes, handleSelectCountryCode, texts } =
    useMfaCountryCodesManager();

  const [searchQuery, setSearchQuery] = useState("");

  // Extract general errors (not field-specific) from the SDK
  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

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

  const searchPlaceholder = texts?.searchPlaceholder || "Search";

  return (
    <>
      {/* General error messages */}
      {generalErrors.length > 0 && (
        <div className="space-y-3 mb-4">
          {generalErrors.map((error: Error, index: number) => (
            <ULThemeAlert key={index}>
              <ULThemeAlertTitle>{error.message}</ULThemeAlertTitle>
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
            {texts?.noResultsText || "No countries found"}
          </div>
        )}
      </div>
    </>
  );
}

export default MfaCountryCodesList;
