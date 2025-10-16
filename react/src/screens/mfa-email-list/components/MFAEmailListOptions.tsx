import React from "react";

import type { Error } from "@auth0/auth0-acul-react/mfa-email-list";
import { ChevronRight } from "lucide-react";

import { MFAEmailIcon } from "@/assets/icons/MFAEmailIcon";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeSeparator from "@/components/ULThemeSeparator";
import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";

import { useMfaEmailListManager } from "../hooks/useMFAEmailListManager";

function MFAEmailList() {
  // Extracting attributes from hook made out of MFAEmailListInstance class of Auth0 React SDK
  const { handleSelectEmail, errors, enrolledEmails } =
    useMfaEmailListManager();

  // Extract general errors (not field-specific) from the SDK
  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

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
      {/* Render buttons for each email option */}
      <div className="space-y-0 px-10 pb-10">
        {enrolledEmails.map((option) => {
          return (
            <React.Fragment key={option.id}>
              <ULThemeSocialProviderButton
                displayName={option.email}
                buttonText={option.email}
                iconEnd={
                  <ChevronRight className="w-4 h-4 theme-universal:text-input-labels" />
                }
                iconComponent={<MFAEmailIcon />}
                onClick={() => handleSelectEmail({ index: option.id })}
                className="w-full justify-between px-0 py-4 pr-4"
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
export default MFAEmailList;
