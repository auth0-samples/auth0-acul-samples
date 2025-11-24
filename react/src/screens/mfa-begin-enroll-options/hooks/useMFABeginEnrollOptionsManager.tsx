import {
  enroll,
  useErrors,
  useMfaBeginEnrollOptions,
  useScreen,
} from "@auth0/auth0-acul-react/mfa-begin-enroll-options";
import { MfaEnrollOptions, ScreenMembers } from "@auth0/auth0-acul-react/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

import locales from "../locales/en.json";

/**
 * Handles the MFA enrollment process
 *
 * @returns A promise that resolves when the MFA enrollment process is complete.
 */
export const useMfaBeginEnrollOptionsManager = () => {
  const { texts } = useScreen();

  const handleEnroll = async (payload: MfaEnrollOptions): Promise<void> => {
    await executeSafely(
      `Enroll into the MFA factor: ${JSON.stringify(payload)}`,
      () => enroll(payload)
    );
  };

  return {
    mfaBeginEnrollOptions: useMfaBeginEnrollOptions(),
    handleEnroll,
    texts: (texts || {}) as ScreenMembers["texts"],
    enrollmentOptions: useMfaBeginEnrollOptions().user?.enrolledFactors || [],
    useErrors: useErrors(),
    locales,
  };
};
