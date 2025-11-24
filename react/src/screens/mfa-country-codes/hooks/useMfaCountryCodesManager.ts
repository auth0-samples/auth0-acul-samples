import {
  useMfaCountryCodes,
  useScreen,
} from "@auth0/auth0-acul-react/mfa-country-codes";
import type { SelectCountryCodeOptions } from "@auth0/auth0-acul-react/types";

import locales from "@/screens/mfa-country-codes/locales/en.json";
import { executeSafely } from "@/utils/helpers/executeSafely";

export const useMfaCountryCodesManager = () => {
  const screen = useScreen();
  const mfaCountryCodes = useMfaCountryCodes();

  const { texts, data } = screen;

  const handleBackAction = async (): Promise<void> => {
    await executeSafely("Navigate back", () => mfaCountryCodes.goBack({}));
  };

  const handleSelectCountryCode = async (
    countryCode: string,
    phonePrefix: string
  ): Promise<void> => {
    const options: SelectCountryCodeOptions = {
      country_code: countryCode,
      phone_prefix: phonePrefix,
    };

    await executeSafely(
      `Select country code: ${countryCode} with prefix: +${phonePrefix}`,
      () => mfaCountryCodes.selectCountryCode(options)
    );
  };

  return {
    mfaCountryCodes,
    handleBackAction,
    handleSelectCountryCode,
    texts: texts || {},
    locales,
    phonePrefixes: data?.phone_prefixes || [],
  };
};
