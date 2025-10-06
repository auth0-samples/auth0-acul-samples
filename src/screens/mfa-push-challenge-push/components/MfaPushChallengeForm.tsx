import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { Error } from "@auth0/auth0-acul-react/types";
import { WithRememberOptions } from "@auth0/auth0-acul-react/types";

import {
  ULThemeFloatingLabelField,
  ULThemeFormMessage,
} from "@/components/form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeCheckbox } from "@/components/ULThemeCheckbox";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import { getFieldError } from "@/utils/helpers/errorUtils";

import { useMfaPushChallengeManager } from "../hooks/useMfaPushChallengeManager";

function MfaSmsChallengeForm() {
  const {
    data,
    errors,
    texts,
    useMfaPolling,
    handleContinueMfaPushChallenge,
    handleResendPushNotification,
  } = useMfaPushChallengeManager();

  const { startPolling } = useMfaPolling();

  // Initialize the form using react-hook-form
  const form = useForm<WithRememberOptions>({
    defaultValues: {
      rememberDevice: false,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const buttonText = texts?.buttonText || "I've responded on my device";
  const rememberDeviceText =
    texts?.rememberMeText || "Remember this device for 30 days";
  const resendText = texts?.resendText || "Didn't receive a code?";
  const resendLinkText = texts?.resendActionText || "Resend";
  const deviceName = data?.deviceName || "";

  // Extract general errors (not field-specific) from the SDK
  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

  // Extract field-specific errors for email, code, and CAPTCHA
  const deviceSDKError = getFieldError("email", errors);

  const onContinueClick = async (formData: WithRememberOptions) => {
    await handleContinueMfaPushChallenge(
      formData?.rememberDevice ? { rememberDevice: true } : {}
    );
  };

  const onResendActionClick = async (formData: WithRememberOptions) => {
    await handleResendPushNotification(
      formData?.rememberDevice ? { rememberDevice: true } : {}
    );
  };

  useEffect(() => {
    startPolling();
  }, [startPolling]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onContinueClick)}>
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

        {/* Disabled Device Name Field */}
        <FormField
          control={form.control}
          name="device"
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemeFloatingLabelField
                {...field}
                label=""
                value={deviceName}
                error={!!fieldState.error || !!deviceSDKError}
                readOnly={true}
              />
              <ULThemeFormMessage
                sdkError={deviceSDKError}
                hasFormError={!!fieldState.error}
              />
            </FormItem>
          )}
        />

        {/* Remember device checkbox */}
        {data?.showRememberDevice && (
          <FormField
            control={form.control}
            name="rememberDevice"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2 my-4">
                  <ULThemeCheckbox
                    id="rememberDevice"
                    checked={field.value}
                    onCheckedChange={field.onChange}
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

        {/* Submit button */}
        <ULThemeButton
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Verifying..." : buttonText}
        </ULThemeButton>

        <div className="text-center space-y-2 mt-4">
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
        </div>
      </form>
    </Form>
  );
}

export default MfaSmsChallengeForm;
