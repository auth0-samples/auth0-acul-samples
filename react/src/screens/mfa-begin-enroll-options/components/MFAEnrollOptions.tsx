import type { Error } from "@auth0/auth0-acul-react/mfa-begin-enroll-options";
import { MfaEnrollFactorType } from "@auth0/auth0-acul-react/mfa-begin-enroll-options";
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
import { cn } from "@/lib/utils";

import { useMfaBeginEnrollOptionsManager } from "../hooks/useMFABeginEnrollOptionsManager";

function MFAEnrollOptions() {
  // Extracting attributes from hook made out of MFABeginEnrollOptionsInstance class of Auth0 React SDK
  const { texts, handleEnroll, errors, enrollmentOptions } =
    useMfaBeginEnrollOptionsManager();

  // Extract general errors (not field-specific) from the SDK
  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];
  const enrollOptions = enrollmentOptions as MfaEnrollFactorType[];

  const displayNameMap: Record<MfaEnrollFactorType, string> = {
    sms: texts?.authenticatorNamesSMS ?? "SMS",
    voice: texts?.authenticatorNamesVoice ?? "Phone",
    phone: texts?.authenticatorNamesPhone ?? "Phone",
    "push-notification":
      texts?.authenticatorNamesPushNotification ??
      "Notification via Auth0 Guardian app",
    otp: texts?.authenticatorNamesOTP ?? "Google Authenticator or similar",
    "webauthn-roaming":
      texts?.authenticatorNamesWebauthnRoaming ?? "Security Key",
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
      {generalErrors.length > 0 && (
        <div className="space-y-3 mb-4">
          {generalErrors.map((error: Error, index: number) => (
            <ULThemeAlert key={index}>
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
                <ChevronRight
                  className={cn("w-4 h-4 theme-universal:text-input-labels")}
                />
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
