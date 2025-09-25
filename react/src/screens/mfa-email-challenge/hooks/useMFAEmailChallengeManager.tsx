import {
  continueMethod,
  ContinueOptions,
  resendCode,
  ScreenMembersOnMfaEmailChallenge,
  tryAnotherMethod,
  useMfaEmailChallenge,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/mfa-email-challenge";

import { executeSafely } from "@/utils/helpers/executeSafely";

/**
 * Handles the authentication using Email MFA factor
 *
 * @returns A promise that resolves when the MFA authentication process using Email is complete.
 */
export const useMfaEmailChallengeManager = () => {
  const { texts, data } = useScreen();

  const handleResendEmail = async (): Promise<void> => {
    executeSafely(`Resend email with code`, () => resendCode());
  };

  const handleContinue = async (
    code: string,
    rememberDevice: boolean = false
  ): Promise<void> => {
    const options: ContinueOptions = {
      code: code?.trim() || "",
      rememberDevice,
    };

    await executeSafely(
      `Continue MFA Email Challenge with options: ${JSON.stringify(options)}`,
      () => continueMethod(options)
    );
  };

  const handleTryAnotherMethod = async (): Promise<void> => {
    executeSafely(`Try another MFA method`, () => tryAnotherMethod());
  };

  return {
    mfaEmailChallenge: useMfaEmailChallenge(),
    data: (data || {}) as ScreenMembersOnMfaEmailChallenge["data"],
    texts: (texts || {}) as ScreenMembersOnMfaEmailChallenge["texts"],
    errors: useTransaction().errors || [],
    handleResendEmail,
    handleContinue,
    handleTryAnotherMethod,
  };
};
