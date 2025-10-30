import {
  goBack,
  selectMfaEmail,
  useErrors,
  useMfaEmailList,
  useScreen,
  useUser,
} from "@auth0/auth0-acul-react/mfa-email-list";
import {
  ScreenMembersOnMfaEmailList,
  SelectMfaEmailOptions,
} from "@auth0/auth0-acul-react/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

import locales from "../locales/en.json";

/**
 * Handles the user login via lists of Email associated with a user
 */
export const useMfaEmailListManager = () => {
  const { texts } = useScreen();
  const { enrolledEmails } = useUser();
  const mfaEmailList = useMfaEmailList();

  const handleSelectEmail = async (
    payload: SelectMfaEmailOptions
  ): Promise<void> => {
    await executeSafely(`Enroll using the email`, () =>
      selectMfaEmail(payload)
    );
  };

  const handleBackAction = async (): Promise<void> => {
    await executeSafely("Go Back", () => goBack());
  };

  return {
    mfaEmailList,
    handleSelectEmail,
    handleBackAction,
    texts: (texts || {}) as ScreenMembersOnMfaEmailList["texts"],
    useErrors: useErrors(),
    enrolledEmails: enrolledEmails || [],
    locales,
  };
};
