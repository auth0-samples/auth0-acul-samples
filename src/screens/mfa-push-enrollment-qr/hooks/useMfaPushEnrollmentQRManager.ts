import {
  CustomOptions,
  ScreenMembersOnMfaPushEnrollmentQr,
} from "@auth0/auth0-acul-react";
import {
  useMfaPushEnrollmentQr,
  useScreen,
  useTransaction,
  useUser,
} from "@auth0/auth0-acul-react/mfa-push-enrollment-qr";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const useMfaPushEnrollmentQRManager = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const userInfo = useUser();
  const mfaPushEnrollmentQR = useMfaPushEnrollmentQr();

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
    errors: transaction.errors || [],
    data,
    enrolledFactors,
  };
};
