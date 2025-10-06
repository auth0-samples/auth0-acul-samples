import {
  useMfaPolling,
  useMfaPushChallengePush,
  useScreen,
  useTransaction,
} from "@auth0/auth0-acul-react/mfa-push-challenge-push";
import {
  CustomOptions,
  ScreenMembersOnMfaPushChallengePush,
  WithRememberOptions,
} from "@auth0/auth0-acul-react/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const useMfaPushChallengeManager = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const mfaPushChallenge = useMfaPushChallengePush();

  const { texts, data, links } = screen;

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
    useMfaPolling,
    texts: (texts || {}) as ScreenMembersOnMfaPushChallengePush["texts"],
    errors: transaction.errors || [],
    data,
    links,
  };
};
