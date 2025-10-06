import {
  enroll,
  LoginEnrollOptions,
  ScreenMembersOnMfaLoginOptions,
  useMfaLoginOptions,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/mfa-login-options";

import { executeSafely } from "@/utils/helpers/executeSafely";

/**
 * Handles the user login via MFA
 */
export const useMfaLoginOptionsManager = () => {
  const { texts } = useScreen();

  const handleEnroll = async (payload: LoginEnrollOptions): Promise<void> => {
    executeSafely(
      `Enroll into the MFA factor: ${JSON.stringify(payload)}`,
      () => enroll(payload)
    );
  };

  return {
    mfaLoginOptions: useMfaLoginOptions(),
    handleEnroll,
    texts: (texts || {}) as ScreenMembersOnMfaLoginOptions["texts"],
    errors: useTransaction().errors || [],
    enrolledFactors: useMfaLoginOptions().user?.enrolledFactors || [],
  };
};
