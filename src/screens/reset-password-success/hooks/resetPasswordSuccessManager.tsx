import {
  useResetPasswordSuccess,
  useScreen,
} from "@auth0/auth0-acul-react/reset-password-success";
import { ScreenMembersOnResetPasswordSuccess } from "@auth0/auth0-acul-react/types";

import locales from "../locales/en.json";

/**
 * Handles successful password reset process
 *
 */
export const useResetPasswordSuccessManager = () => {
  const { texts, data } = useScreen();

  return {
    resetPasswordSuccess: useResetPasswordSuccess(),
    texts: (texts || {}) as ScreenMembersOnResetPasswordSuccess["texts"],
    data: data || {},
    locales,
  };
};
