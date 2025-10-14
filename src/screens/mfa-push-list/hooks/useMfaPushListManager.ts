import type {
  CustomOptions,
  SelectMfaPushDeviceOptions,
} from "@auth0/auth0-acul-react/mfa-push-list";
import {
  useMfaPushList,
  useScreen,
  useTransaction,
  useUser,
} from "@auth0/auth0-acul-react/mfa-push-list";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const useMfaPushListManager = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const mfaPushListInstance = useMfaPushList();
  const user = useUser();

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
      deviceIndex: Number(payload?.deviceIndex) || 0,
    };

    await executeSafely(
      `Select device with index: ${payload?.deviceIndex}`,
      () => mfaPushListInstance.selectMfaPushDevice(options)
    );
  };

  return {
    mfaPushListInstance,
    handleBackAction,
    handleSelectMFAPushDeviceAction,
    texts: texts || {},
    errors: transaction.errors || [],
    user: user || {},
  };
};
