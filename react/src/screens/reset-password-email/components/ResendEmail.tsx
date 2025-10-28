import type { Error } from "@auth0/auth0-acul-react/types";

import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";

import { useResetPasswordEmailManager } from "../hooks/useResetPasswordEmailManager";

function ResendEmail() {
  // Extracting attributes from hook made out of ResetPasswordEmailInstance class of Auth0 React SDK
  const { texts, handleResendEmail, errors } = useResetPasswordEmailManager();
  const buttonText = texts?.resendLinkText || "Resend email";

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
