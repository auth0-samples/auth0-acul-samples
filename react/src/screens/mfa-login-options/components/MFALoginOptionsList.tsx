import React from "react";

import type {
  ErrorItem,
  MfaLoginFactorType,
} from "@auth0/auth0-acul-react/types";
import { ChevronRight } from "lucide-react";

import {
  MFAGuardianIcon,
  MFAOTPIcon,
  MFAPhoneIcon,
  MFASmsIcon,
  MFAWebAuthnRoamingIcon,
} from "@/assets/icons";
import { MFADuoIcon } from "@/assets/icons/MFADuoIcon";
import { MFAEmailIcon } from "@/assets/icons/MFAEmailIcon";
import { MFARecoveryCodeIcon } from "@/assets/icons/MFARecoveryCodeIcon";
import { MFAWebAuthnPlatformIcon } from "@/assets/icons/MFAWebAuthnPlatformIcon";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeSeparator from "@/components/ULThemeSeparator";
import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";

import { useMfaLoginOptionsManager } from "../hooks/useMFALoginOptionsManager";

function MFALoginOptionsList() {
  // Extracting attributes from hook made out of MFALoginOptionsInstance class of Auth0 React SDK
  const { texts, handleEnroll, enrolledFactors, locales, useErrors } =
    useMfaLoginOptionsManager();
  const { errors, hasError, dismiss } = useErrors;

  // Extract general errors (not field-specific) from the SDK
  const generalErrors: ErrorItem[] =
    errors.byKind("auth0")?.filter((error) => {
      return !error.field || error.field === null;
    }) || [];
  const enrollOptions = enrolledFactors as MfaLoginFactorType[];

  const displayNameMap: Record<MfaLoginFactorType, string> = {
    sms: texts?.authenticatorNamesSMS ?? locales.MFALoginOptions.sms,
    voice: texts?.authenticatorNamesVoice ?? locales.MFALoginOptions.voice,
    phone: texts?.authenticatorNamesPhone ?? locales.MFALoginOptions.phone,
    "push-notification":
      texts?.authenticatorNamesPushNotification ??
      locales.MFALoginOptions.pushNotification,
    otp: texts?.authenticatorNamesOTP ?? locales.MFALoginOptions.otp,
    "webauthn-roaming":
      texts?.authenticatorNamesWebauthnRoaming ??
      locales.MFALoginOptions.webauthnRoaming,
    email: texts?.authenticatorNamesEmail ?? locales.MFALoginOptions.email,
    "recovery-code":
      texts?.authenticatorNamesRecoveryCode ??
      locales.MFALoginOptions.recoveryCode,
    "webauthn-platform":
      texts?.authenticatorNamesWebauthnPlatform ??
      locales.MFALoginOptions.webauthnPlatform,
    duo: texts?.authenticatorNamesDUO ?? locales.MFALoginOptions.duo,
  };

  const iconMap: Record<MfaLoginFactorType, React.ReactNode> = {
    sms: <MFASmsIcon />,
    voice: <MFAPhoneIcon />,
    phone: <MFAPhoneIcon />,
    "push-notification": <MFAGuardianIcon />,
    otp: <MFAOTPIcon />,
    "webauthn-roaming": <MFAWebAuthnRoamingIcon />,
    email: <MFAEmailIcon />,
    "recovery-code": <MFARecoveryCodeIcon />,
    "webauthn-platform": <MFAWebAuthnPlatformIcon />,
    duo: <MFADuoIcon />,
  };

  function getDisplayName(factor: MfaLoginFactorType) {
    return displayNameMap[factor] || factor;
  }

  function getIcon(factor: MfaLoginFactorType) {
    return iconMap[factor];
  }

  return (
    <>
      {/* General error messages */}
      {hasError && generalErrors.length > 0 && (
        <div className="space-y-3 mb-4">
          {generalErrors.map((error) => (
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
      <div className="space-y-0 px-10 pb-10">
        {enrollOptions.map((option) => {
          return (
            <React.Fragment key={option}>
              <ULThemeSocialProviderButton
                displayName={getDisplayName(option)}
                buttonText={getDisplayName(option)}
                iconEnd={
                  <ChevronRight className="w-4 h-4 theme-universal:text-input-labels" />
                }
                iconComponent={getIcon(option)}
                onClick={() => handleEnroll({ action: option })}
                className="flex items-center gap-2"
                variant="ghost"
              ></ULThemeSocialProviderButton>
              <ULThemeSeparator className="my-[2px]" />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}
export default MFALoginOptionsList;
