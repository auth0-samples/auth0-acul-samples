import { useErrors } from "@auth0/auth0-acul-react/mfa-sms-list";
import type {
  EnrolledPhoneNumber,
  ErrorItem,
} from "@auth0/auth0-acul-react/types";
import { ChevronRight } from "lucide-react";

import { MFAPhoneIcon } from "@/assets/icons";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeSeparator from "@/components/ULThemeSeparator";
import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";

import { useMfaSmsListManager } from "../hooks/useMfaSmsListManager";

function MfaSmsList() {
  const { user, locales, handleSelectPhoneNumber } = useMfaSmsListManager();

  const { errors, hasError, dismiss } = useErrors();

  // Get general errors (not field-specific)
  const generalErrors: ErrorItem[] = errors
    .byKind("auth0")
    .filter((err) => !err.field);

  // Get enrolled phone numbers from user object
  const enrolledPhoneNumbers: EnrolledPhoneNumber[] =
    user?.enrolledPhoneNumbers || [];

  return (
    <>
      {/* Display general errors */}
      {hasError && generalErrors.length > 0 && (
        <div className="space-y-3 mb-4">
          {generalErrors.map((error) => (
            <ULThemeAlert
              key={error.id}
              variant="destructive"
              onDismiss={() => dismiss(error.id)}
            >
              <ULThemeAlertTitle>
                {error.message || locales?.errors?.errorOccurred}
              </ULThemeAlertTitle>
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
