import {
  continuePhoneEnrollment,
  PhoneEnrollmentOptions,
  returnToPrevious,
  ScreenMembersOnPhoneIdentifierEnrollment,
  usePhoneIdentifierEnrollment,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/phone-identifier-enrollment";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const usePhoneIdentifierEnrollmentManager = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const phoneIdentifierEnrollment = usePhoneIdentifierEnrollment();

  const { texts, data } = screen;

  const handleContinueEnrollment = async (type: "text" | "voice") => {
    const options: PhoneEnrollmentOptions = {
      type: type || "text",
    };
    await executeSafely(
      `Continue MFA SMS Enrollment with options: ${JSON.stringify(options)}`,
      () => continuePhoneEnrollment(options)
    );
  };

  const handleReturnToPrevious = async () => {
    await executeSafely(`Return to previous screen`, () =>
      returnToPrevious({})
    );
  };

  return {
    phoneIdentifierEnrollment,
    handleContinueEnrollment,
    handleReturnToPrevious,
    texts: (texts || {}) as ScreenMembersOnPhoneIdentifierEnrollment["texts"],
    errors: transaction.errors || [],
    data: data,
  };
};
