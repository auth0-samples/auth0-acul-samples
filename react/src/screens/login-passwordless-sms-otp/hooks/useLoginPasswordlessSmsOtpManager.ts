import {
  ScreenMembersOnLoginPasswordlessSmsOtp,
  useLoginPasswordlessSmsOtp,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/login-passwordless-sms-otp";

import { executeSafely } from "@/utils/helpers/executeSafely";

/**
 * Handles the login process using a username or phone number and a One time password.
 * Optionally includes a CAPTCHA value if required.
 *
 * @param captcha - (Optional) The CAPTCHA value if required.
 * @param code - One time password (OTP) sent to the user's phone.
 * @param username - Username or phone number of the user.
 * @returns A promise that resolves when the login process is complete.
 */
export const useLoginPasswordlessSmsOtpManager = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const loginPasswordlessSmsOtp = useLoginPasswordlessSmsOtp();

  const { texts, captchaImage, data, links } = screen;

  const handleSubmitOTP = async (
    username: string,
    code: string,
    captcha?: string
  ): Promise<void> => {
    const options: { username: string; code: string; captcha?: string } = {
      username: username?.trim() || "",
      code: code?.trim() || "",
    };
    if (screen.isCaptchaAvailable && captcha?.trim()) {
      options.captcha = captcha.trim();
    }
    executeSafely(`Submit OTP with options: ${JSON.stringify(options)}`, () =>
      loginPasswordlessSmsOtp.submitOTP(options)
    );
  };

  const handleResendOTP = async (payload?: never): Promise<void> => {
    executeSafely(
      `Resent OTP with Custom options: ${JSON.stringify(payload)}`,
      () => loginPasswordlessSmsOtp.resendOTP(payload)
    );
  };

  return {
    loginPasswordlessSmsOtp,
    handleSubmitOTP,
    handleResendOTP,
    texts: (texts || {}) as ScreenMembersOnLoginPasswordlessSmsOtp["texts"],
    isCaptchaAvailable: screen.isCaptchaAvailable === true,
    errors: transaction.errors || [],
    captchaImage,
    data,
    links,
  };
};
