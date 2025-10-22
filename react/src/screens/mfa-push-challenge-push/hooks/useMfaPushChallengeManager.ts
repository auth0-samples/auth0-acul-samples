import {
  // useMfaPolling,
  // useMfaPushChallengePush,
  useScreen,
  useTransaction,
  useUser,
} from "@auth0/auth0-acul-react/mfa-push-challenge-push";
import {
  CustomOptions,
  ScreenMembersOnMfaPushChallengePush,
  WithRememberOptions,
} from "@auth0/auth0-acul-react/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

const mockUseMfaPushChallengePush = () => ({
  continue: (_payload?: WithRememberOptions) =>
    console.log("Mocked continue method called"),
  resendPushNotification: (_payload?: WithRememberOptions) =>
    console.log("Mocked resendPushNotification method called"),
  enterCodeManually: (_payload?: CustomOptions) =>
    console.log("Mocked enterCodeManually method called"),
  tryAnotherMethod: (_payload?: CustomOptions) =>
    console.log("Mocked tryAnotherMethod method called"),
});

export const useMfaPushChallengePush = mockUseMfaPushChallengePush;

export const useMfaPushChallengeManager = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const userInfo = useUser();
  const mfaPushChallenge = useMfaPushChallengePush();

  const { texts, data, links } = screen;
  const { enrolledFactors } = userInfo || {};

  const handleContinueMfaPushChallenge = async (
    payload?: WithRememberOptions
  ): Promise<void> => {
    await executeSafely(
      `Continue MFA Push Challenge with options: ${JSON.stringify(payload)}`,
      () => mfaPushChallenge.continue(payload)
    );
  };

  const handleResendPushNotification = async (
    payload?: WithRememberOptions
  ): Promise<void> => {
    await executeSafely(
      `Resend MFA Push Notification with options: ${JSON.stringify(payload)}`,
      () => mfaPushChallenge.resendPushNotification(payload)
    );
  };

  const handleEnterCodeManually = async (
    payload?: CustomOptions
  ): Promise<void> => {
    await executeSafely(
      "Switch to manual code entry for MFA Push Challenge",
      () => mfaPushChallenge.enterCodeManually(payload)
    );
  };

  const handleTryAnotherMethod = async (
    payload?: CustomOptions
  ): Promise<void> => {
    await executeSafely(
      "Request MFA Push Notification via another method",
      () => mfaPushChallenge.tryAnotherMethod(payload)
    );
  };

  return {
    mfaPushChallenge,
    handleContinueMfaPushChallenge,
    handleResendPushNotification,
    handleEnterCodeManually,
    handleTryAnotherMethod,
    useMfaPolling: (payload: unknown) => {
      console.log("useMfaPolling called with payload:", payload);
      return {
        isRunning: true,
        startPolling: () => console.log("Mocked startPolling method called"),
        stopPolling: () => console.log("Mocked stopPolling method called"),
      };
    },
    texts: (texts || {}) as ScreenMembersOnMfaPushChallengePush["texts"],
    errors: transaction.errors || [],
    data,
    links,
    enrolledFactors,
  };
};
