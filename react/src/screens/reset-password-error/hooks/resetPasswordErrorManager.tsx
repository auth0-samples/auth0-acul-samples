import {
  useResetPasswordError,
  useScreen,
} from "@auth0/auth0-acul-react/reset-password-error";
import { ScreenMembersOnResetPasswordError } from "@auth0/auth0-acul-react/types";

/**
 * Handles password reset error
 *
 */
export const useResetPasswordErrorManager = () => {
  const { texts } = useScreen();

  return {
    resetPasswordError: useResetPasswordError(),
    texts: texts as ScreenMembersOnResetPasswordError["texts"] | null,
  };
};
