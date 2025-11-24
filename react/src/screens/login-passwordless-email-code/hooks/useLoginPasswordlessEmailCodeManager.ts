import {
  useLoginPasswordlessEmailCode,
  useScreen,
} from "@auth0/auth0-acul-react/login-passwordless-email-code";
import {
  CustomOptions,
  LoginPasswordlessEmailCodeMembers,
  ScreenMembersOnLoginPasswordlessEmailCode,
  SubmitCodeOptions,
} from "@auth0/auth0-acul-react/types";

import locales from "@/screens/login-passwordless-email-code/locales/en.json";
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
  const screen: ScreenMembersOnLoginPasswordlessEmailCode = useScreen();
  const loginPasswordlessEmailCode: LoginPasswordlessEmailCodeMembers =
    useLoginPasswordlessEmailCode();

  const { texts, isCaptchaAvailable, captcha, data, links } = screen;

  const handleSubmitEmailCode = async (
    payload: SubmitCodeOptions
  ): Promise<void> => {
    const options: { code: string; captcha?: string } = {
      code:
        typeof payload?.code === "string"
          ? payload.code.trim()
          : String(payload?.code || ""),
    };
    if (screen.isCaptchaAvailable && payload?.captcha?.trim()) {
      options.captcha = payload?.captcha.trim();
    }
    executeSafely(
      `Submit Email Code with options: ${JSON.stringify(options)}`,
      () => loginPasswordlessEmailCode.submitCode(options)
    );
  };

  const handleResendEmailCode = async (
    payload?: CustomOptions
  ): Promise<void> => {
    executeSafely(
      `Resent Email Code with Custom options: ${JSON.stringify(payload)}`,
      () => loginPasswordlessEmailCode.resendCode(payload)
    );
  };

  return {
    locales,
    captcha,
    data,
    links,
    loginPasswordlessEmailCode,
    isCaptchaAvailable: isCaptchaAvailable,
    handleSubmitEmailCode,
    handleResendEmailCode,
    texts: (texts || {}) as ScreenMembersOnLoginPasswordlessEmailCode["texts"],
  };
};
