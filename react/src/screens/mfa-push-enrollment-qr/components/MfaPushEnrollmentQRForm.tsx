import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  useErrors,
  useMfaPolling,
} from "@auth0/auth0-acul-react/mfa-push-enrollment-qr";
import { type CustomOptions, ErrorItem } from "@auth0/auth0-acul-react/types";

import { Form } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";

import { useMfaPushEnrollmentQRManager } from "../hooks/useMfaPushEnrollmentQRManager";

function MfaPushEnrollmentQRForm() {
  const { data, texts, locales, enrolledFactors, handlePickAuthenticator } =
    useMfaPushEnrollmentQRManager();

  // Initialize the form using react-hook-form
  const form = useForm<CustomOptions>({});
  const { qrCode, qrUri, showCodeCopy } = data || {};

  // Use Locales as fallback to SDK texts
  const copyAsCodeLinkText =
    texts?.copyCodeLinkText || locales.form.copyCodeLinkText;
  const pickAuthenticatorText =
    texts?.pickAuthenticatorText || locales.form.pickAuthenticatorText;
  const shouldShowTryAnotherMethod = enrolledFactors?.length
    ? enrolledFactors.length > 1
    : false;

  const { errors, hasError, dismiss } = useErrors();

  // Get general errors (not field-specific)
  const generalErrors: ErrorItem[] = errors
    .byKind("auth0")
    .filter((err) => !err.field);

  // Automatically start polling when the page loads
  const { startPolling, stopPolling } = useMfaPolling({
    intervalMs: 3000,
    onError: (error: unknown) =>
      console.error("Push Enrollment Polling error:", error),
  });

  const handleCopyAsCode = (event: React.MouseEvent) => {
    event.preventDefault();
    if (qrUri) {
      navigator.clipboard.writeText(qrUri).then((err) => {
        console.error("Could not copy text: ", err);
      });
    }
  };

  useEffect(() => {
    startPolling();
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  return (
    <Form {...form}>
      <form>
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

        <div className="text-center">
          {/* QR Code Image */}
          <div className="flex justify-center">
            <img
              src={qrCode}
              className="border rounded-[3px] border-(--ul-theme-color-qrcode-border) w-41 h-41"
            />
          </div>
          {/* Copy QR As Code Button */}
          {showCodeCopy && (
            <ULThemeButton
              variant="outline"
              className="w-full mt-4.5"
              onClick={(event) => handleCopyAsCode(event)}
            >
              {copyAsCodeLinkText}
            </ULThemeButton>
          )}
        </div>
      </form>
      {/* Try another method link */}
      {shouldShowTryAnotherMethod && (
        <ULThemeButton
          onClick={() => handlePickAuthenticator()}
          variant="link"
          size="link"
          className="mt-4.5 text-center"
        >
          {pickAuthenticatorText}
        </ULThemeButton>
      )}
    </Form>
  );
}

export default MfaPushEnrollmentQRForm;
