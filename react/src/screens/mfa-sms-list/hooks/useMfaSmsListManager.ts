import {
  useMfaSmsList,
  useScreen,
  useTransaction,
  useUser,
} from "@auth0/auth0-acul-react/mfa-sms-list";
import type { MfaSmsListOptions } from "@auth0/auth0-acul-react/types";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const useMfaSmsListManager = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const mfasmsList = useMfaSmsList();
  const user = useUser();

  const { texts } = screen;

  const handleBackAction = async (): Promise<void> => {
    await executeSafely("Navigate back", () => mfasmsList.backAction({}));
  };

  const handleSelectPhoneNumber = async (id: number): Promise<void> => {
    const options: MfaSmsListOptions = {
      index: id,
    };

    await executeSafely(`Select phone number with index: ${id}`, () =>
      mfasmsList.selectPhoneNumber(options)
    );
  };

  return {
    mfasmsList,
    handleBackAction,
    handleSelectPhoneNumber,
    texts: texts || {},
    errors: transaction.errors || [],
    user: user || {},
  };
};
