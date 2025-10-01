import {
  ScreenMembersOnMfaSmsEnrollment,
  useMfaSmsEnrollment,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/mfa-sms-enrollment";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const useMfaSmsEnrollmentManager = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const mfaSmsEnrollment = useMfaSmsEnrollment();

  const { texts, data, links } = screen;

  const handleContinueEnrollment = async (
    phone: string,
    captcha?: string
  ): Promise<void> => {
    const options = {
      phone: phone?.trim() || "",
      ...(captcha && { captcha }),
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
    errors: transaction.errors || [],
    data,
    links,
  };
};
