import {
  resendEmail,
  useErrors,
  useResetPasswordEmail,
  useScreen,
} from "@auth0/auth0-acul-react/reset-password-email";
import { ScreenMembersOnResetPasswordEmail } from "@auth0/auth0-acul-react/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

import locales from "../locales/en.json";

/**
 * Handles successfully sent email screen for password reset process
 * along with resend option
 *
 * @returns A promise that resolves when the email resend process is complete.
 */
export const useResetPasswordEmailManager = () => {
  const { texts, data } = useScreen();

  const handleResendEmail = async (): Promise<void> => {
    executeSafely(`Resend email for password reset`, () => resendEmail);
  };

  return {
    resetPasswordEmail: useResetPasswordEmail(),
    handleResendEmail,
    texts: (texts || {}) as ScreenMembersOnResetPasswordEmail["texts"],
    useErrors: useErrors(),
    data: data || {},
    locales,
  };
};
