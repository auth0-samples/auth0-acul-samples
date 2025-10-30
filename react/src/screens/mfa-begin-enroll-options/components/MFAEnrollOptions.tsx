import type {
  ErrorItem,
  MfaEnrollFactorType,
} from "@auth0/auth0-acul-react/types";
import { ChevronRight } from "lucide-react";

import {
  MFAGuardianIcon,
  MFAOTPIcon,
  MFAPhoneIcon,
  MFASmsIcon,
  MFAWebAuthnRoamingIcon,
} from "@/assets/icons";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";

import { useMfaBeginEnrollOptionsManager } from "../hooks/useMFABeginEnrollOptionsManager";

function MFAEnrollOptions() {
  // Extracting attributes from hook made out of MFABeginEnrollOptionsInstance class of Auth0 React SDK
  const { texts, handleEnroll, useErrors, enrollmentOptions, locales } =
    useMfaBeginEnrollOptionsManager();
  const { errors, hasError, dismiss } = useErrors;

  // Extract general errors (not field-specific) from the SDK
  const generalErrors: ErrorItem[] =
    errors.byKind("server")?.filter((error) => {
      return !error.field || error.field === null;
    }) || [];
  const enrollOptions = enrollmentOptions as MfaEnrollFactorType[];

  const displayNameMap: Record<MfaEnrollFactorType, string> = {
    sms: texts?.authenticatorNamesSMS ?? locales.MFAOptions.sms,
    voice: texts?.authenticatorNamesVoice ?? locales.MFAOptions.voice,
    phone: texts?.authenticatorNamesPhone ?? locales.MFAOptions.phone,
    "push-notification":
      texts?.authenticatorNamesPushNotification ??
      locales.MFAOptions.pushNotification,
    otp: texts?.authenticatorNamesOTP ?? locales.MFAOptions.otp,
    "webauthn-roaming":
      texts?.authenticatorNamesWebauthnRoaming ??
      locales.MFAOptions.webauthnRoaming,
  };

  const iconMap: Record<MfaEnrollFactorType, React.ReactNode> = {
    sms: <MFASmsIcon />,
    voice: <MFAPhoneIcon />,
    phone: <MFAPhoneIcon />,
    "push-notification": <MFAGuardianIcon />,
    otp: <MFAOTPIcon />,
    "webauthn-roaming": <MFAWebAuthnRoamingIcon />,
  };

  function getDisplayName(factor: MfaEnrollFactorType) {
    return displayNameMap[factor] || factor;
  }

  function getIcon(factor: MfaEnrollFactorType) {
    return iconMap[factor];
  }

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
              <ULThemeAlertTitle>{error.message}</ULThemeAlertTitle>
            </ULThemeAlert>
          ))}
        </div>
      )}

      {/* Render buttons for each enrollment option */}
      <div className="space-y-2">
        {enrollOptions.map((option) => {
          return (
            <ULThemeSocialProviderButton
              key={option}
              displayName={getDisplayName(option)}
              buttonText={getDisplayName(option)}
              iconEnd={
                <ChevronRight className="w-4 h-4 theme-universal:text-input-labels" />
              }
              iconComponent={getIcon(option)}
              onClick={() => handleEnroll({ action: option })}
              className="flex items-center gap-2 border-black"
            ></ULThemeSocialProviderButton>
          );
        })}
      </div>
    </>
  );
}
export default MFAEnrollOptions;
