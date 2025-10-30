import {
  continueMethod,
  pickEmail,
  resendCode,
  tryAnotherMethod,
  useErrors,
  useMfaEmailChallenge,
  useResend,
  useScreen,
  useUser,
} from "@auth0/auth0-acul-react/mfa-email-challenge";
import {
  ContinueOptions,
  ScreenMembersOnMfaEmailChallenge,
} from "@auth0/auth0-acul-react/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

import locales from "../locales/en.json";

export const useMfaEmailChallengeManager = () => {
  const { texts, data } = useScreen();

  const handleResendEmail = async (): Promise<void> => {
    await executeSafely(`Resend email with code`, () => resendCode());
  };

  const handleContinue = async (
    code: string,
    rememberDevice: boolean = false
  ): Promise<void> => {
    const options: ContinueOptions = {
      code: code?.trim() || "",
      rememberDevice,
    };

    const logOptions = {
      ...options,
      code: "[REDACTED]",
    };

    await executeSafely(
      `Continue MFA Email Challenge with options: ${JSON.stringify(logOptions)}`,
      () => continueMethod(options)
    );
  };

  const handleTryAnotherMethod = async (): Promise<void> => {
    await executeSafely(`Try another MFA method`, () => tryAnotherMethod());
  };

  const handlePickEmail = async () => {
    await executeSafely(`Pick Another Email`, () => pickEmail());
  };

  return {
    mfaEmailChallenge: useMfaEmailChallenge(),
    data: (data || {}) as ScreenMembersOnMfaEmailChallenge["data"],
    texts: (texts || {}) as ScreenMembersOnMfaEmailChallenge["texts"],
    enrolledEmails: useUser().enrolledEmails,
    useErrors: useErrors(),
    locales,
    handleResendEmail,
    handleContinue,
    handleTryAnotherMethod,
    handlePickEmail,
    useResend,
  };
};
