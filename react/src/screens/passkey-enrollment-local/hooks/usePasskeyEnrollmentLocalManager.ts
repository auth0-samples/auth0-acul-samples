import {
  usePasskeyEnrollmentLocal,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/passkey-enrollment-local";
import {
  AbortEnrollmentOptions,
  CustomOptions,
  ScreenMembersOnPasskeyEnrollmentLocal,
} from "@auth0/auth0-acul-react/passkey-enrollment-local";

import { executeSafely } from "@/utils/helpers/executeSafely";

/**
 * Handles the passkey enrollment local process.
 */
export const usePasskeyEnrollmentLocalManager = () => {
  const screen = useScreen();
  const passkeyEnrollmentLocalInstance = usePasskeyEnrollmentLocal();

  const { texts, data, links } = screen;

  const continuePasskeyEnrollment = async (
    payload?: CustomOptions
  ): Promise<void> => {
    executeSafely(
      `Continue Passkey Enrollment Local: ${JSON.stringify(payload)}`,
      () => passkeyEnrollmentLocalInstance.continuePasskeyEnrollment(payload)
    );
  };

  const abortPasskeyEnrollment = async (
    payload: AbortEnrollmentOptions
  ): Promise<void> => {
    executeSafely(
      `Continue without Passkey Local Enrollment: ${JSON.stringify(payload)}`,
      () => passkeyEnrollmentLocalInstance.abortPasskeyEnrollment(payload)
    );
  };

  return {
    passkeyEnrollmentLocalInstance,
    continuePasskeyEnrollment,
    abortPasskeyEnrollment,
    texts: (texts || {}) as ScreenMembersOnPasskeyEnrollmentLocal["texts"],
    errors: useTransaction().errors || [],
    data: (data || {}) as ScreenMembersOnPasskeyEnrollmentLocal["data"],
    links,
  };
};
