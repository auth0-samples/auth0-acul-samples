import {
  ScreenMembersOnResetPasswordError,
  useResetPasswordError,
  useScreen,
} from "@auth0/auth0-acul-react/reset-password-error";

/**
 * Handles password reset error
 *
 */
export const useResetPasswordErrorManager = () => {
  const { texts } = useScreen();

  return {
    resetPasswordError: useResetPasswordError(),
    texts: (texts || {}) as ScreenMembersOnResetPasswordError["texts"],
  };
};
