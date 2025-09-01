import {
  ScreenMembersOnLoginPasswordlessEmailCode,
  useLoginPasswordlessEmailCode,
} from "@auth0/auth0-acul-react";

import { executeSafely } from "@/utils/helpers/executeSafely";

/**
 * Handles the login process using a email and a code.
 * Optionally includes a CAPTCHA value if required.
 *
 * @param captcha - (Optional) The CAPTCHA value if required.
 * @param code - Code sent to the user's email.
 * @returns A promise that resolves when the login process is complete.
 */
export const useLoginPasswordlessEmailCodeManager = () => {
  const loginPasswordlessEmailCode = useLoginPasswordlessEmailCode();
  const { transaction, screen } = loginPasswordlessEmailCode;

  const { texts, captchaImage, data, links } = screen;

  const handleSubmitEmailCode = async (
    code: string,
    captcha?: string
  ): Promise<void> => {
    const options: { code: string; captcha?: string } = {
      code: code?.trim() || "",
    };
    if (screen.isCaptchaAvailable && captcha?.trim()) {
      options.captcha = captcha.trim();
    }
    executeSafely(
      `Submit Email Code with options: ${JSON.stringify(options)}`,
      () => loginPasswordlessEmailCode.submitCode(options)
    );
  };

  const handleResendEmailCode = async (payload?: never): Promise<void> => {
    executeSafely(
      `Resent Email Code with Custom options: ${JSON.stringify(payload)}`,
      () => loginPasswordlessEmailCode.resendCode(payload)
    );
  };

  return {
    loginPasswordlessEmailCode,
    handleSubmitEmailCode,
    handleResendEmailCode,
    texts: (texts || {}) as ScreenMembersOnLoginPasswordlessEmailCode["texts"],
    isCaptchaAvailable: screen.isCaptchaAvailable === true,
    errors: transaction.errors || [],
    captchaImage,
    data,
    links,
  };
};
