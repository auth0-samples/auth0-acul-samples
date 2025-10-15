import {
  CustomOptions,
  ScreenMembersOnMfaPushWelcome,
  useMfaPushWelcome,
  useScreen,
  useTransaction,
  useUser,
} from "@auth0/auth0-acul-react/mfa-push-welcome";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const useMfaPushWelcomeManager = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const userInfo = useUser();
  const mfaPushWelcome = useMfaPushWelcome();

  const { texts, data, links } = screen;
  const { enrolledFactors } = userInfo || {};

  const handleMfaPushWelcomeEnroll = async (
    payload?: CustomOptions
  ): Promise<void> => {
    await executeSafely(
      `Continue MFA Push Welcome with options: ${JSON.stringify(payload)}`,
      () => mfaPushWelcome.enroll(payload)
    );
  };

  const handlePickAuthenticator = async (
    payload?: CustomOptions
  ): Promise<void> => {
    await executeSafely(
      `Try Another Method on MFA Push Welcome with options: ${JSON.stringify(payload)}`,
      () => mfaPushWelcome.pickAuthenticator(payload)
    );
  };

  return {
    mfaPushWelcome,
    handleMfaPushWelcomeEnroll,
    handlePickAuthenticator,
    texts: (texts || {}) as ScreenMembersOnMfaPushWelcome["texts"],
    errors: transaction.errors || [],
    data,
    links,
    enrolledFactors,
  };
};
