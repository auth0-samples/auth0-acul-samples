import {
  resetPassword,
  useResetPassword,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/reset-password";
import { ScreenMembersOnResetPassword } from "@auth0/auth0-acul-react/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

/**
 * Handles the password reset process
 *
 *
 * @param new_password - New password string.
 * @param confirm_password - New password string.
 * @returns A promise that resolves when the password reset process is complete.
 */
export const useResetPasswordManager = () => {
  const { texts } = useScreen();

  const handleSubmitPassword = async (
    new_password: string,
    confirm_password: string
  ): Promise<void> => {
    const options: { "password-reset": string; "re-enter-password": string } = {
      "password-reset": new_password?.trim() || "",
      "re-enter-password": confirm_password?.trim() || "",
    };
    executeSafely(
      `Submit password reset with options: ${JSON.stringify(options)}`,
      () => resetPassword(options)
    );
  };

  return {
    resetPassword: useResetPassword(),
    handleSubmitPassword,
    texts: (texts || {}) as ScreenMembersOnResetPassword["texts"],
    errors: useTransaction().errors || [],
  };
};
