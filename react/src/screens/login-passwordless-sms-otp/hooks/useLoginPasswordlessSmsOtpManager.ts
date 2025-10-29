import {
  useLoginPasswordlessSmsOtp,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/login-passwordless-sms-otp";
import {
  CustomOptions,
  LoginPasswordlessSmsOtpMembers,
  ScreenMembersOnLoginPasswordlessSmsOtp,
  SubmitOTPOptions,
  TransactionMembersOnLoginPasswordlessSmsOtp,
} from "@auth0/auth0-acul-react/types";

import locales from "@/screens/login-passwordless-sms-otp/locales/en.json";
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
  const screen: ScreenMembersOnLoginPasswordlessSmsOtp = useScreen();
  const transaction: TransactionMembersOnLoginPasswordlessSmsOtp =
    useTransaction();
  const loginPasswordlessSmsOtp: LoginPasswordlessSmsOtpMembers =
    useLoginPasswordlessSmsOtp();

  const { texts, captcha, data, links } = screen;

  const handleSubmitOTP = async (payload: SubmitOTPOptions): Promise<void> => {
    const options: { username: string; code: string; captcha?: string } = {
      username: payload?.username?.trim() || "",
      code: payload?.code?.trim() || "",
    };
    if (screen.isCaptchaAvailable && payload?.captcha?.trim()) {
      options.captcha = payload?.captcha.trim();
    }
    executeSafely(
      `Perform Submit OTP operation with options: ${JSON.stringify(options)}`,
      () => loginPasswordlessSmsOtp.submitOTP(options)
    );
  };

  const handleResendOTP = async (payload?: CustomOptions): Promise<void> => {
    executeSafely(
      `Perform Resent OTP operation with Custom options: ${JSON.stringify(payload)}`,
      () => loginPasswordlessSmsOtp.resendOTP(payload)
    );
  };

  return {
    data,
    links,
    locales,
    captcha,
    loginPasswordlessSmsOtp,
    isCaptchaAvailable: screen.isCaptchaAvailable === true,
    errors: transaction.errors || [],
    texts: (texts || {}) as ScreenMembersOnLoginPasswordlessSmsOtp["texts"],
    handleSubmitOTP,
    handleResendOTP,
  };
};
