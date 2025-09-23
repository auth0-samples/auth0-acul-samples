import {
  enroll,
  MfaEnrollOptions,
  ScreenMembers,
  useMfaBeginEnrollOptions,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/mfa-begin-enroll-options";

import { executeSafely } from "@/utils/helpers/executeSafely";

/**
 * Handles the MFA enrollment process
 *
 * @returns A promise that resolves when the MFA enrollment process is complete.
 */
export const useMfaBeginEnrollOptionsManager = () => {
  const { texts } = useScreen();

  const handleEnroll = async (payload: MfaEnrollOptions): Promise<void> => {
    executeSafely(
      `Enroll into the MFA factor: ${JSON.stringify(payload)}`,
      () => () => enroll(payload)
    );
  };

  return {
    mfaBeginEnrollOptions: useMfaBeginEnrollOptions(),
    handleEnroll,
    texts: (texts || {}) as ScreenMembers["texts"],
    errors: useTransaction().errors || [],
    enrollmentOptions: useMfaBeginEnrollOptions().user?.enrolledFactors || [],
  };
};
