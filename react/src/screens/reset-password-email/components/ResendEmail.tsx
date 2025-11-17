import type { ErrorItem } from "@auth0/auth0-acul-react/types";

import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";

import { useResetPasswordEmailManager } from "../hooks/useResetPasswordEmailManager";

function ResendEmail() {
  // Extracting attributes from hook made out of ResetPasswordEmailInstance class of Auth0 React SDK
  const { texts, handleResendEmail, useErrors, locales } =
    useResetPasswordEmailManager();
  const { errors, hasError, dismiss } = useErrors;
  const buttonText = texts?.resendLinkText || locales.button.resendText;

  // Extract general errors (not field-specific) from the SDK
  const generalErrors: ErrorItem[] =
    errors.byKind("auth0")?.filter((error) => {
      return !error.field || error.field === null;
    }) || [];

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
      <ULThemeButton
        variant="outline"
        type="button"
        className="w-full"
        onClick={handleResendEmail}
      >
        {buttonText}
      </ULThemeButton>
    </>
  );
}
export default ResendEmail;
