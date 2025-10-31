import {
  resendCode,
  returnToPrevious,
  submitPhoneChallenge,
  useErrors,
  usePhoneIdentifierChallenge,
  useResend,
  useScreen,
} from "@auth0/auth0-acul-react/phone-identifier-challenge";
import {
  PhoneChallengeOptions,
  ScreenMembersOnPhoneIdentifierChallenge,
} from "@auth0/auth0-acul-react/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

import locales from "../locales/en.json";

export const usePhoneIdentifierChallengeManager = () => {
  const screen = useScreen();
  const phoneIdentifierChallenge = usePhoneIdentifierChallenge();

  const { texts, data } = screen;

  const handleSubmitPhoneChallenge = async (code: string): Promise<void> => {
    const options: PhoneChallengeOptions = {
      code: code?.trim() || "",
    };

    await executeSafely(
      `Submit Phone Challenge with options: ${JSON.stringify(options)}`,
      () => submitPhoneChallenge(options)
    );
  };

  const handleResendCode = async (): Promise<void> => {
    await executeSafely("Resend code", () => resendCode({}));
  };

  const handleReturnToPrevious = async (): Promise<void> => {
    await executeSafely("Return to previous screen", () =>
      returnToPrevious({})
    );
  };

  return {
    phoneIdentifierChallenge,
    handleSubmitPhoneChallenge,
    handleResendCode,
    handleReturnToPrevious,
    texts: (texts || {}) as ScreenMembersOnPhoneIdentifierChallenge["texts"],
    data: (data || {}) as ScreenMembersOnPhoneIdentifierChallenge["data"],
    locales,
    useErrors: useErrors(),
    useResend,
  };
};
