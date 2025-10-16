import type { Error } from "@auth0/auth0-acul-react/mfa-sms-list";
import { ChevronRight } from "lucide-react";

import { MFAPhoneIcon } from "@/assets/icons";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeSeparator from "@/components/ULThemeSeparator";
import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";

import { useMfaSmsListManager } from "../hooks/useMfaSmsListManager";

interface EnrolledPhoneNumber {
  id: number;
  phoneNumber: string;
}

function MfaSmsList() {
  const { errors, user, handleSelectPhoneNumber } = useMfaSmsListManager();

  // Extract general errors (not field-specific) from the SDK
  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

  // Get enrolled phone numbers from user object
  const enrolledPhoneNumbers: EnrolledPhoneNumber[] =
    user?.enrolledPhoneNumbers || [];

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

      {/* Render list of enrolled phone numbers */}
      <div className="space-y-0">
        {enrolledPhoneNumbers.map((phone, index) => (
          <div key={phone.id}>
            <ULThemeSocialProviderButton
              variant="ghost"
              displayName={phone.phoneNumber}
              buttonText={phone.phoneNumber}
              iconComponent={<MFAPhoneIcon />}
              iconEnd={
                <ChevronRight className="w-4 h-4 theme-universal:text-input-labels" />
              }
              onClick={() => handleSelectPhoneNumber(phone.id)}
              className="w-full justify-between px-0 [&>span:nth-child(2)]:font-semibold"
            />
            {index < enrolledPhoneNumbers.length - 1 && (
              <ULThemeSeparator className="my-2" />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default MfaSmsList;
