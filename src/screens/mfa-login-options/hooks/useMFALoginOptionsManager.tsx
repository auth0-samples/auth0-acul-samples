import {
  enroll,
  useErrors,
  useMfaLoginOptions,
  useScreen,
} from "@auth0/auth0-acul-react/mfa-login-options";
import {
  LoginEnrollOptions,
  ScreenMembersOnMfaLoginOptions,
} from "@auth0/auth0-acul-react/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

import locales from "../locales/en.json";

/**
 * Handles the user login via MFA
 */
export const useMfaLoginOptionsManager = () => {
  const { texts } = useScreen();
  const mfaLoginOptions = useMfaLoginOptions();

  const handleEnroll = async (payload: LoginEnrollOptions): Promise<void> => {
    executeSafely(
      `Enroll into the MFA factor: ${JSON.stringify(payload)}`,
      () => enroll(payload)
    );
  };

  return {
    mfaLoginOptions,
    handleEnroll,
    texts: (texts || {}) as ScreenMembersOnMfaLoginOptions["texts"],
    enrolledFactors: mfaLoginOptions.user?.enrolledFactors || [],
    locales,
    useErrors: useErrors(),
  };
};
