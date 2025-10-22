import {
  useEmailIdentifierChallenge,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/email-identifier-challenge";
import type {
  EmailChallengeOptions,
  ScreenMembersOnEmailIdentifierChallenge,
} from "@auth0/auth0-acul-react/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const useEmailIdentifierChallengeManager = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const emailIdentifierChallenge = useEmailIdentifierChallenge();

  const { texts, data, links } = screen;

  const handleSubmitEmailChallenge = async (code: string): Promise<void> => {
    const options: EmailChallengeOptions = {
      code: code?.trim() || "",
    };

    await executeSafely(
      `Submit Email Challenge with options: ${JSON.stringify(options)}`,
      () => emailIdentifierChallenge.submitEmailChallenge(options)
    );
  };

  const handleResendCode = async (): Promise<void> => {
    await executeSafely("Resend email code", () =>
      emailIdentifierChallenge.resendCode({})
    );
  };

  const handleReturnToPrevious = async (): Promise<void> => {
    await executeSafely("Return to previous screen", () =>
      emailIdentifierChallenge.returnToPrevious({})
    );
  };

  return {
    emailIdentifierChallenge,
    handleSubmitEmailChallenge,
    handleResendCode,
    handleReturnToPrevious,
    texts: (texts || {}) as ScreenMembersOnEmailIdentifierChallenge["texts"],
    isCaptchaAvailable: screen.isCaptchaAvailable === true,
    errors: transaction.errors || [],
    data,
    links,
  };
};
