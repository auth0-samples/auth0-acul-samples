import type {
  Error,
  MfaLoginFactorType,
} from "@auth0/auth0-acul-react/mfa-login-options";
import { ChevronRight } from "lucide-react";

import {
  MFAGuardianIcon,
  MFAOTPIcon,
  MFAPhoneIcon,
  MFASmsIcon,
  MFAWebAuthnRoamingIcon,
} from "@/assets/icons";
import { MFAEDuoIcon } from "@/assets/icons/MFADuoIcon";
import { MFAEmailIcon } from "@/assets/icons/MFAEmailIcon";
import { MFARecoveryCodeIcon } from "@/assets/icons/MFARecoveryCodeIcon";
import { MFAWebAuthnPlatformIcon } from "@/assets/icons/MFAWebAuthnPlatformIcon";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeSeparator from "@/components/ULThemeSeparator";
import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";

import { useMfaLoginOptionsManager } from "../hooks/useMFALoginOptionsManager";

function MFALoginOptionsList() {
  // Extracting attributes from hook made out of MFALoginOptionsInstance class of Auth0 React SDK
  const { texts, handleEnroll, errors, enrolledFactors } =
    useMfaLoginOptionsManager();

  // Extract general errors (not field-specific) from the SDK
  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];
  const enrollOptions = enrolledFactors as MfaLoginFactorType[];

  const displayNameMap: Record<MfaLoginFactorType, string> = {
    sms: texts?.authenticatorNamesSMS ?? "SMS",
    voice: texts?.authenticatorNamesVoice ?? "Phone",
    phone: texts?.authenticatorNamesPhone ?? "Phone",
    "push-notification":
      texts?.authenticatorNamesPushNotification ??
      "Notification via Auth0 Guardian app",
    otp: texts?.authenticatorNamesOTP ?? "Google Authenticator or similar",
    "webauthn-roaming":
      texts?.authenticatorNamesWebauthnRoaming ?? "Security Key",
    email: texts?.authenticatorNamesEmail ?? "Email",
    "recovery-code": texts?.authenticatorNamesRecoveryCode ?? "Recovery code",
    "webauthn-platform":
      texts?.authenticatorNamesWebauthnRoaming ?? "Security Key",
    duo: texts?.authenticatorNamesDUO ?? "Notification via DUO app",
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
    duo: <MFAEDuoIcon />,
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
            <>
              <ULThemeSocialProviderButton
                key={option}
                displayName={getDisplayName(option)}
                buttonText={getDisplayName(option)}
                iconEnd={<ChevronRight size={18} color="#6f7780" />}
                iconComponent={getIcon(option)}
                onClick={() => handleEnroll({ action: option })}
                className="flex items-center gap-2"
                variant="ghost"
              ></ULThemeSocialProviderButton>
              <ULThemeSeparator className="my-[2px]" />
            </>
          );
        })}
      </div>
    </>
  );
}
export default MFALoginOptionsList;
