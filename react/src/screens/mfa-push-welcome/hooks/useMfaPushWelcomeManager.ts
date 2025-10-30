import {
  useMfaPushWelcome,
  useScreen,
  useTransaction,
  useUser,
} from "@auth0/auth0-acul-react/mfa-push-welcome";
import {
  CustomOptions,
  MfaPushWelcomeMembers,
  ScreenMembersOnMfaPushWelcome,
  TransactionMembers,
  UserMembers,
} from "@auth0/auth0-acul-react/types";

import locales from "@/screens/mfa-push-welcome/locales/en.json";
import { executeSafely } from "@/utils/helpers/executeSafely";

export const useMfaPushWelcomeManager = () => {
  const screen: ScreenMembersOnMfaPushWelcome = useScreen();
  const transaction: TransactionMembers = useTransaction();
  const userInfo: UserMembers = useUser();
  const mfaPushWelcome: MfaPushWelcomeMembers = useMfaPushWelcome();

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
    data,
    links,
    locales,
    mfaPushWelcome,
    enrolledFactors,
    handleMfaPushWelcomeEnroll,
    handlePickAuthenticator,
    texts: (texts || {}) as ScreenMembersOnMfaPushWelcome["texts"],
    errors: transaction.errors || [],
  };
};
