import {
  useMfaSmsList,
  useScreen,
  useUser,
} from "@auth0/auth0-acul-react/mfa-sms-list";
import type { MfaSmsListOptions } from "@auth0/auth0-acul-react/types";

import locales from "@/screens/mfa-sms-list/locales/en.json";
import { executeSafely } from "@/utils/helpers/executeSafely";

export const useMfaSmsListManager = () => {
  const screen = useScreen();
  const mfasmsList = useMfaSmsList();
  const user = useUser();

  const { texts } = screen;

  const handleBackAction = async (): Promise<void> => {
    await executeSafely("Navigate back", () => mfasmsList.backAction({}));
  };

  const handleSelectPhoneNumber = async (index: number): Promise<void> => {
    const options: MfaSmsListOptions = {
      index,
    };

    await executeSafely(`Select phone number with index: ${index}`, () =>
      mfasmsList.selectPhoneNumber(options)
    );
  };

  return {
    mfasmsList,
    handleBackAction,
    handleSelectPhoneNumber,
    texts: texts || {},
    locales,
    user: user || {},
  };
};
