import {
  goBack,
  ScreenMembersOnMfaEmailList,
  selectMfaEmail,
  SelectMfaEmailOptions,
  useMfaEmailList,
  useScreen,
  useTransaction,
  useUser,
} from "@auth0/auth0-acul-react/mfa-email-list";

import { executeSafely } from "@/utils/helpers/executeSafely";

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
    executeSafely(`Enroll using the email`, () => selectMfaEmail(payload));
  };

  const handleBackAction = async (): Promise<void> => {
    executeSafely("Go Back", () => goBack());
  };

  return {
    mfaEmailList,
    handleSelectEmail,
    handleBackAction,
    texts: (texts || {}) as ScreenMembersOnMfaEmailList["texts"],
    errors: useTransaction().errors || [],
    enrolledEmails: enrolledEmails || [],
  };
};
