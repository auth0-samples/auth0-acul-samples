import {
  useMfaPushEnrollmentQr,
  useScreen,
  useUser,
} from "@auth0/auth0-acul-react/mfa-push-enrollment-qr";
import {
  CustomOptions,
  MfaPushEnrollmentQrMembers,
  ScreenMembersOnMfaPushEnrollmentQr,
  UserMembers,
} from "@auth0/auth0-acul-react/types";

import locales from "@/screens/mfa-push-enrollment-qr/locales/en.json";
import { executeSafely } from "@/utils/helpers/executeSafely";

export const useMfaPushEnrollmentQRManager = () => {
  const screen: ScreenMembersOnMfaPushEnrollmentQr = useScreen();
  const userInfo: UserMembers = useUser();
  const mfaPushEnrollmentQR: MfaPushEnrollmentQrMembers =
    useMfaPushEnrollmentQr();

  const { texts, data } = screen;
  const { enrolledFactors } = userInfo || {};

  const handlePickAuthenticator = async (
    payload?: CustomOptions
  ): Promise<void> => {
    await executeSafely(
      `Try Another Method on MFA Push Enrollment QR with options: ${JSON.stringify(payload)}`,
      () => mfaPushEnrollmentQR.pickAuthenticator(payload)
    );
  };

  return {
    locales,
    data,
    enrolledFactors,
    mfaPushEnrollmentQR,
    handlePickAuthenticator,
    useMfaPolling: (payload: unknown) => {
      console.log("useMfaPolling called with payload:", payload);
      return {
        isRunning: true,
        startPolling: () => console.log("Mocked startPolling method called"),
        stopPolling: () => console.log("Mocked stopPolling method called"),
      };
    },
    texts: (texts || {}) as ScreenMembersOnMfaPushEnrollmentQr["texts"],
  };
};
