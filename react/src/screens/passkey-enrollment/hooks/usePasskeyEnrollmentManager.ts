import {
  ScreenMembersOnPasskeyEnrollment,
  usePasskeyEnrollment,
} from "@auth0/auth0-acul-react";
import {
  CustomOptions,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/passkey-enrollment";

import { executeSafely } from "@/utils/helpers/executeSafely";

/**
 * Handles the passkey enrollment process.
 */
export const usePasskeyEnrollmentManager = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const passkeyEnrollmentInstance = usePasskeyEnrollment();

  const { texts, data, links } = screen;

  const continuePasskeyEnrollment = async (
    payload?: CustomOptions
  ): Promise<void> => {
    executeSafely(
      `Continue Passkey Enrollment: ${JSON.stringify(payload)}`,
      () => passkeyEnrollmentInstance.continuePasskeyEnrollment(payload)
    );
  };

  const abortPasskeyEnrollment = async (
    payload?: CustomOptions
  ): Promise<void> => {
    executeSafely(
      `Continue without Passkey Enrollment: ${JSON.stringify(payload)}`,
      () => passkeyEnrollmentInstance.abortPasskeyEnrollment(payload)
    );
  };

  return {
    passkeyEnrollmentInstance,
    continuePasskeyEnrollment,
    abortPasskeyEnrollment,
    texts: (texts || {}) as ScreenMembersOnPasskeyEnrollment["texts"],
    errors: transaction.errors || [],
    data,
    links,
  };
};
