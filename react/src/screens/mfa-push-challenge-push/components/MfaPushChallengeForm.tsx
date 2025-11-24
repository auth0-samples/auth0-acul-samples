import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  useErrors,
  useMfaPolling,
} from "@auth0/auth0-acul-react/mfa-push-challenge-push";
import type {
  ErrorItem,
  WithRememberOptions,
} from "@auth0/auth0-acul-react/types";

import { Form, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeCheckbox } from "@/components/ULThemeCheckbox";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeSeparator from "@/components/ULThemeSeparator";
import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";
import ULThemeSpinner from "@/components/ULThemeSpinner";

import { useMfaPushChallengeManager } from "../hooks/useMfaPushChallengeManager";

function MfaSmsChallengeForm() {
  const {
    data,
    texts,
    locales,
    enrolledFactors,
    handleEnterCodeManually,
    handleTryAnotherMethod,
    handleContinueMfaPushChallenge,
    handleResendPushNotification,
  } = useMfaPushChallengeManager();

  // Initialize the form using react-hook-form
  const form = useForm<WithRememberOptions>({
    defaultValues: {
      rememberDevice: false,
    },
  });

  // Use Locales as fallback to SDK texts
  const rememberDeviceText =
    texts?.rememberMeText || locales.form.rememberDeviceText;
  const enterOtpCodeText = texts?.enterOtpCode || locales.form.enterOtpCodeText;
  const resendText = texts?.resendText || locales.form.resendText;
  const resendLinkText =
    texts?.resendActionText || locales.form.resendActionText;
  const tryAnotherMethodText =
    texts?.pickAuthenticatorText || locales.form.tryAnotherMethodText;
  const { deviceName, showRememberDevice } = data || {};
  const separatorText = texts?.separatorText || locales.form.separatorText;
  const shouldShowTryAnotherMethod = enrolledFactors?.length
    ? enrolledFactors.length > 1
    : false;

  const { errors, hasError, dismiss } = useErrors();

  // Get general errors (not field-specific)
  const generalErrors: ErrorItem[] = errors
    .byType("auth0")
    .filter((err) => !err.field);

  // Automatically start polling when the page loads
  const { isRunning, startPolling, stopPolling } = useMfaPolling({
    intervalMs: 3000,
    onCompleted: () => {
      handleContinueMfaPushChallenge({
        rememberDevice: form.getValues().rememberDevice,
      });
    },
    onError: (error: unknown) => {
      console.error("Polling error:", error);
    },
  });

  const onResendActionClick = async (formData: WithRememberOptions) => {
    await handleResendPushNotification(
      formData?.rememberDevice ? { rememberDevice: true } : {}
    );
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

        {/* Disabled Device Name Field */}
        <FormField
          control={form.control}
          name="device"
          render={({ field }) => (
            <FormItem>
              <ULThemeSocialProviderButton
                displayName={""}
                key={deviceName}
                buttonText={deviceName || locales.form.yourDeviceText}
                iconComponent={isRunning && <ULThemeSpinner />}
                disabled
                name={field.name}
                value={field.value as string | undefined}
                className="theme-universal:border-input-border theme-universal:bg-disabled theme-universal:opacity-100"
              />
            </FormItem>
          )}
        />

        {/* Remember device checkbox */}
        {showRememberDevice && (
          <FormField
            control={form.control}
            name="rememberDevice"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2 my-4 gap-1">
                  <ULThemeCheckbox
                    id="rememberDevice"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="w-5 h-5 border-input-border border-radius-[1]"
                  />
                  <Label
                    htmlFor="rememberDevice"
                    className="text-(length:--ul-theme-font-body-text-size) cursor-pointer"
                  >
                    {rememberDeviceText}
                  </Label>
                </div>
              </FormItem>
            )}
          />
        )}

        <ULThemeSeparator text={separatorText} className="my-1" />

        <div className="text-center space-y-2 mt-6">
          {/* Enter manual code button */}
          <ULThemeButton
            onClick={() => handleEnterCodeManually()}
            variant="outline"
            className="w-full mb-4"
          >
            {enterOtpCodeText}
          </ULThemeButton>

          {/* Resend code link with optional get a call */}
          <span className="text-(length:--ul-theme-font-body-text-size) font-body">
            {resendText}{" "}
          </span>
          <ULThemeButton
            onClick={() =>
              onResendActionClick({
                rememberDevice: Boolean(form.getValues().rememberDevice),
              })
            }
            variant="link"
            size="link"
          >
            {resendLinkText}
          </ULThemeButton>

          {/* Try another method link */}
          {shouldShowTryAnotherMethod && (
            <ULThemeButton
              onClick={() => handleTryAnotherMethod()}
              variant="link"
              size="link"
            >
              {tryAnotherMethodText}
            </ULThemeButton>
          )}
        </div>
      </form>
    </Form>
  );
}

export default MfaSmsChallengeForm;
