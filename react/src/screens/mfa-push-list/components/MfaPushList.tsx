import type { Error } from "@auth0/auth0-acul-react/mfa-push-list";
import { ChevronRight } from "lucide-react";

import { MFADeviceIcon } from "@/assets/icons";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeSeparator from "@/components/ULThemeSeparator";
import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";

import { useMfaPushListManager } from "../hooks/useMfaPushListManager";

interface EnrolledDevices {
  id: number;
  device: string;
}

function MfaPushList() {
  const { errors, user, handleSelectMFAPushDeviceAction } =
    useMfaPushListManager();

  // Extract general errors (not field-specific) from the SDK
  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

  // Get enrolled devices from user object
  const enrolledDevices: EnrolledDevices[] = user?.enrolledDevices || [];

  return (
    <>
      {/* General error messages */}
      {generalErrors.length > 0 && (
        <div className="space-y-3 mb-4">
          {generalErrors.map((error: Error, index: number) => (
            <ULThemeAlert key={index}>
              <ULThemeAlertTitle>{error.message}</ULThemeAlertTitle>
            </ULThemeAlert>
          ))}
        </div>
      )}

      {/* Render list of enrolled mfa devices */}
      <div className="space-y-0">
        {enrolledDevices.map((device, index) => (
          <div key={device.id}>
            <ULThemeSocialProviderButton
              variant="ghost"
              displayName={device.device}
              buttonText={device.device}
              iconComponent={<MFADeviceIcon />}
              iconEnd={<ChevronRight size={24} color="#6f7780" />}
              onClick={() =>
                handleSelectMFAPushDeviceAction({
                  deviceIndex: device.id,
                })
              }
              className="w-full justify-between px-0 [&>span:nth-child(2)]:font-semibold"
            />
            {index < enrolledDevices.length - 1 && (
              <ULThemeSeparator className="my-2" />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default MfaPushList;
