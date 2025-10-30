import {
  useMfaPushChallengePush,
  useScreen,
  useUser,
} from "@auth0/auth0-acul-react/mfa-push-challenge-push";
import {
  CustomOptions,
  MfaPushChallengePushMembers,
  ScreenMembersOnMfaPushChallengePush,
  UserMembers,
  WithRememberOptions,
} from "@auth0/auth0-acul-react/types";

import locales from "@/screens/mfa-push-challenge-push/locales/en.json";
import { executeSafely } from "@/utils/helpers/executeSafely";

export const useMfaPushChallengeManager = () => {
  const screen: ScreenMembersOnMfaPushChallengePush = useScreen();
  const userInfo: UserMembers = useUser();
  const mfaPushChallengePush: MfaPushChallengePushMembers =
    useMfaPushChallengePush();

  const { texts, data, links } = screen;
  const { enrolledFactors } = userInfo || {};

  const handleContinueMfaPushChallenge = async (
    payload?: WithRememberOptions
  ): Promise<void> => {
    await executeSafely(
      `Continue MFA Push Challenge with options: ${JSON.stringify(payload)}`,
      () => mfaPushChallengePush.continue(payload)
    );
  };

  const handleResendPushNotification = async (
    payload?: WithRememberOptions
  ): Promise<void> => {
    await executeSafely(
      `Resend MFA Push Notification with options: ${JSON.stringify(payload)}`,
      () => mfaPushChallengePush.resendPushNotification(payload)
    );
  };

  const handleEnterCodeManually = async (
    payload?: CustomOptions
  ): Promise<void> => {
    await executeSafely(
      "Switch to manual code entry for MFA Push Challenge",
      () => mfaPushChallengePush.enterCodeManually(payload)
    );
  };

  const handleTryAnotherMethod = async (
    payload?: CustomOptions
  ): Promise<void> => {
    await executeSafely(
      "Request MFA Push Notification via another method",
      () => mfaPushChallengePush.tryAnotherMethod(payload)
    );
  };

  return {
    data,
    links,
    locales,
    enrolledFactors,
    mfaPushChallengePush,
    handleContinueMfaPushChallenge,
    handleResendPushNotification,
    handleEnterCodeManually,
    handleTryAnotherMethod,
    texts: (texts || {}) as ScreenMembersOnMfaPushChallengePush["texts"],
  };
};
