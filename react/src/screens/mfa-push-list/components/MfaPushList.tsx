import { useErrors } from "@auth0/auth0-acul-react/mfa-push-list";
import { type EnrolledDevice, ErrorItem } from "@auth0/auth0-acul-react/types";
import { ChevronRight } from "lucide-react";

import { MFADeviceIcon } from "@/assets/icons";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeSeparator from "@/components/ULThemeSeparator";
import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";

import { useMfaPushListManager } from "../hooks/useMfaPushListManager";

function MfaPushList() {
  const { locales, user, handleSelectMFAPushDeviceAction } =
    useMfaPushListManager();

  const { errors, hasError, dismiss } = useErrors();

  // Get general errors (not field-specific)
  const generalErrors: ErrorItem[] = errors
    .byKind("auth0")
    .filter((err) => !err.field);

  // Get enrolled devices from user object
  const enrolledDevices: EnrolledDevice[] = user?.enrolledDevices || [];

  return (
    <>
      {/* General error messages */}
      {hasError && generalErrors.length > 0 && (
        <div className="space-y-3 mb-4">
          {generalErrors.map((error: ErrorItem) => (
            <ULThemeAlert
              key={error.id}
              variant="destructive"
              onDismiss={() => dismiss(error.id)}
            >
              <ULThemeAlertTitle>
                {error.message || locales.errors.errorOccurred}
              </ULThemeAlertTitle>
            </ULThemeAlert>
          ))}
        </div>
      )}

      {/* Render list of enrolled mfa devices */}
      <div className="space-y-0 px-10 pb-10">
        {enrolledDevices.map((device) => (
          <div key={device.id}>
            <ULThemeSocialProviderButton
              variant="ghost"
              displayName={device.device}
              buttonText={device.device}
              iconComponent={<MFADeviceIcon className="size-full" />}
              iconEnd={<ChevronRight size={24} color="#6f7780" />}
              onClick={() =>
                handleSelectMFAPushDeviceAction({
                  deviceIndex: device.id,
                })
              }
              className="w-full justify-between px-0 py-4 pr-4"
            />
            <ULThemeSeparator className="my-0" />
          </div>
        ))}
      </div>
    </>
  );
}

export default MfaPushList;
