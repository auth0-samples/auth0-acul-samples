import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { CustomOptions, Error } from "@auth0/auth0-acul-react/types";

import { Form } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";

import { useMfaPushEnrollmentQRManager } from "../hooks/useMfaPushEnrollmentQRManager";

function MfaPushEnrollmentQRForm() {
  const {
    data,
    errors,
    texts,
    enrolledFactors,
    handlePickAuthenticator,
    useMfaPolling,
  } = useMfaPushEnrollmentQRManager();

  // Initialize the form using react-hook-form
  const form = useForm<CustomOptions>({});
  const { qrCode, qrUri, showCodeCopy } = data || {};

  const copyAsCodeLinkText = texts?.copyCodeLinkText || "Copy as code";
  const pickAuthenticatorText =
    texts?.pickAuthenticatorText || "Try another method";
  const shouldShowTryAnotherMethod = enrolledFactors?.length
    ? enrolledFactors.length > 1
    : false;

  // Extract general errors (not field-specific) from the SDK
  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

  // Automatically start polling when the page loads
  const { startPolling, stopPolling } = useMfaPolling({
    intervalMs: 3000,
    onCompleted: () => {
      console.log("Push Enrollment accepted | declined");
    },
    onError: (error: unknown) => {
      console.error("Push Enrollment Polling error:", error);
    },
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
        {generalErrors.length > 0 && (
          <div className="space-y-3 mb-4">
            {generalErrors.map((error: Error, index: number) => (
              <ULThemeAlert key={index}>
                <ULThemeAlertTitle>{error.message}</ULThemeAlertTitle>
              </ULThemeAlert>
            ))}
          </div>
        )}

        <div className="text-center">
          {/* QR Code Image */}
          <div className="flex justify-center">
            <img
              src={qrCode}
              className="border-1 rounded-[3px] border-(--ul-theme-color-qrcode-border) w-41 h-41"
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
