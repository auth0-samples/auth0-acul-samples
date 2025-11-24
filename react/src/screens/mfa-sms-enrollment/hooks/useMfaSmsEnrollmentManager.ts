import {
  useMfaSmsEnrollment,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/mfa-sms-enrollment";
import {
  MfaSmsEnrollmentMembers,
  ScreenMembersOnMfaSmsEnrollment,
} from "@auth0/auth0-acul-react/types";

import locales from "@/screens/mfa-sms-enrollment/locales/en.json";
import { executeSafely } from "@/utils/helpers/executeSafely";

export const useMfaSmsEnrollmentManager = () => {
  const mfaSmsEnrollment: MfaSmsEnrollmentMembers = useMfaSmsEnrollment();
  const screen: ScreenMembersOnMfaSmsEnrollment = useScreen();
  const transaction = useTransaction();

  const { texts, data, links } = screen;
  const { countryCode, countryPrefix } = transaction;

  const handleContinueEnrollment = async (phone: string): Promise<void> => {
    const options = {
      phone: phone?.trim() || "",
    };

    await executeSafely(
      `Continue MFA SMS Enrollment with options: ${JSON.stringify(options)}`,
      () => mfaSmsEnrollment.continueEnrollment(options)
    );
  };

  const handlePickCountryCode = async (): Promise<void> => {
    await executeSafely("Pick country code", () =>
      mfaSmsEnrollment.pickCountryCode({})
    );
  };

  const handleTryAnotherMethod = async (): Promise<void> => {
    await executeSafely("Try another MFA method", () =>
      mfaSmsEnrollment.tryAnotherMethod({})
    );
  };

  return {
    mfaSmsEnrollment,
    handleContinueEnrollment,
    handlePickCountryCode,
    handleTryAnotherMethod,
    texts: (texts || {}) as ScreenMembersOnMfaSmsEnrollment["texts"],
    locales,
    data,
    links,
    countryCode,
    countryPrefix,
  };
};
