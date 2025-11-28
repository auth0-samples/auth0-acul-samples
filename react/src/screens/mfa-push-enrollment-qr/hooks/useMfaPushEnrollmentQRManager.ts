import {
  useMfaPushEnrollmentQr,
  useScreen,
  useUser,
} from "@auth0/auth0-acul-react/mfa-push-enrollment-qr";
import {
  CustomOptions,
  MfaPushEnrollmentQrMembers,
  MfaPushEnrollmentQrWithRememberOptions,
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

  const handleContinueMfaPushEnrollmentQR = async (
    payload?: MfaPushEnrollmentQrWithRememberOptions
  ): Promise<void> => {
    await executeSafely(
      `Continue MFA Push Enrollment QR with options: ${JSON.stringify(payload)}`,
      () => mfaPushEnrollmentQR.continue(payload)
    );
  };

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
    handleContinueMfaPushEnrollmentQR,
    texts: (texts || {}) as ScreenMembersOnMfaPushEnrollmentQr["texts"],
  };
};
