import {
  usePasskeyEnrollment,
  useScreen,
} from "@auth0/auth0-acul-react/passkey-enrollment";
import {
  CustomOptions,
  PasskeyEnrollmentMembers,
  ScreenMembersOnPasskeyEnrollment,
} from "@auth0/auth0-acul-react/types";

import locales from "@/screens/passkey-enrollment/locales/en.json";
import { executeSafely } from "@/utils/helpers/executeSafely";

/**
 * Handles the passkey enrollment process.
 */
export const usePasskeyEnrollmentManager = () => {
  const screen: ScreenMembersOnPasskeyEnrollment = useScreen();
  const passkeyEnrollmentInstance: PasskeyEnrollmentMembers =
    usePasskeyEnrollment();

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
    data,
    links,
    locales,
    passkeyEnrollmentInstance,
    continuePasskeyEnrollment,
    abortPasskeyEnrollment,
    texts: (texts || {}) as ScreenMembersOnPasskeyEnrollment["texts"],
  };
};
