import {
  usePasskeyEnrollmentLocal,
  useScreen,
} from "@auth0/auth0-acul-react/passkey-enrollment-local";
import {
  AbortEnrollmentOptions,
  CustomOptions,
  PasskeyEnrollmentLocalMembers,
  ScreenMembersOnPasskeyEnrollmentLocal,
} from "@auth0/auth0-acul-react/types";

import locales from "@/screens/passkey-enrollment-local/locales/en.json";
import { executeSafely } from "@/utils/helpers/executeSafely";

/**
 * Handles the passkey enrollment local process.
 */
export const usePasskeyEnrollmentLocalManager = () => {
  const screen: ScreenMembersOnPasskeyEnrollmentLocal = useScreen();
  const passkeyEnrollmentLocalInstance: PasskeyEnrollmentLocalMembers =
    usePasskeyEnrollmentLocal();

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
    locales,
    links,
    passkeyEnrollmentLocalInstance,
    continuePasskeyEnrollment,
    abortPasskeyEnrollment,
    texts: (texts || {}) as ScreenMembersOnPasskeyEnrollmentLocal["texts"],
    data: (data || {}) as ScreenMembersOnPasskeyEnrollmentLocal["data"],
  };
};
