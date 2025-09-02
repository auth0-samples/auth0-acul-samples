import {
  ScreenMembersOnResetPasswordEmail,
  useResetPasswordEmail,
} from "@auth0/auth0-acul-react";

import { executeSafely } from "@/utils/helpers/executeSafely";

/**
 * Handles successfully sent email screen for password reset process
 * along with resend option
 *
 * @returns A promise that resolves when the email resend process is complete.
 */
export const useResetPasswordEmailManager = () => {
  const resetPasswordEmail = useResetPasswordEmail();
  const { screen, transaction } = resetPasswordEmail;

  const { texts, data } = screen;

  const handleResendEmail = async (): Promise<void> => {
    executeSafely(`Resend email for password reset`, () =>
      resetPasswordEmail.resendEmail()
    );
  };

  return {
    resetPasswordEmail,
    handleResendEmail,
    texts: (texts || {}) as ScreenMembersOnResetPasswordEmail["texts"],
    errors: transaction.errors || [],
    data: data || {},
  };
};
