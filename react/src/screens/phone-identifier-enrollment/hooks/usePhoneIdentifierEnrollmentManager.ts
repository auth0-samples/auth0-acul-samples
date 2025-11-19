import {
  continuePhoneEnrollment,
  returnToPrevious,
  useErrors,
  usePhoneIdentifierEnrollment,
  useScreen,
} from "@auth0/auth0-acul-react/phone-identifier-enrollment";
import {
  PhoneEnrollmentOptions,
  ScreenMembersOnPhoneIdentifierEnrollment,
} from "@auth0/auth0-acul-react/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

import locales from "../locales/en.json";

export const usePhoneIdentifierEnrollmentManager = () => {
  const screen = useScreen();
  const phoneIdentifierEnrollment = usePhoneIdentifierEnrollment();

  const { texts, data } = screen;

  const handleContinueEnrollment = async (type: "text" | "voice") => {
    const options: PhoneEnrollmentOptions = {
      type: type,
    };
    await executeSafely(
      `Continue Phone Identifier Enrollment with options: ${JSON.stringify(options)}`,
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
    data: data,
    locales,
    useErrors: useErrors(),
  };
};
