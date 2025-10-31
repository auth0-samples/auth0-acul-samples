import {
  useMfaPushList,
  useScreen,
  useTransaction,
  useUser,
} from "@auth0/auth0-acul-react/mfa-push-list";
import type {
  CustomOptions,
  MfaPushListMembers,
  ScreenMembers,
  SelectMfaPushDeviceOptions,
  TransactionMembers,
  UserMembers,
} from "@auth0/auth0-acul-react/types";

import locales from "@/screens/mfa-push-list/locales/en.json";
import { executeSafely } from "@/utils/helpers/executeSafely";

export const useMfaPushListManager = () => {
  const screen: ScreenMembers = useScreen();
  const transaction: TransactionMembers = useTransaction();
  const mfaPushListInstance: MfaPushListMembers = useMfaPushList();
  const user: UserMembers = useUser();

  const { texts } = screen;

  const handleBackAction = async (payload?: CustomOptions): Promise<void> => {
    await executeSafely("Navigate back", () =>
      mfaPushListInstance.goBack(payload)
    );
  };

  const handleSelectMFAPushDeviceAction = async (
    payload?: SelectMfaPushDeviceOptions
  ): Promise<void> => {
    const options: SelectMfaPushDeviceOptions = {
      deviceIndex: payload?.deviceIndex ?? 0,
    };

    await executeSafely(
      `Select device with index: ${payload?.deviceIndex}`,
      () => mfaPushListInstance.selectMfaPushDevice(options)
    );
  };

  return {
    texts: texts || {},
    locales,
    errors: transaction.errors || [],
    user: user || {},
    mfaPushListInstance,
    handleBackAction,
    handleSelectMFAPushDeviceAction,
  };
};
