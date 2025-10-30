import { useForm } from "react-hook-form";

import { useErrors } from "@auth0/auth0-acul-react/mfa-sms-challenge";
import type {
  ErrorItem,
  MfaSmsChallengeOptions,
} from "@auth0/auth0-acul-react/types";

import {
  ULThemeFloatingLabelField,
  ULThemeFormMessage,
} from "@/components/form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeCheckbox } from "@/components/ULThemeCheckbox";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";

import { useMfaSmsChallengeManager } from "../hooks/useMfaSmsChallengeManager";

function MfaSmsChallengeForm() {
  const { handleContinueMfaSmsChallenge, data, texts, locales } =
    useMfaSmsChallengeManager();

  const { errors, hasError, dismiss } = useErrors();

  // Initialize the form using react-hook-form
  const form = useForm<MfaSmsChallengeOptions>({
    defaultValues: {
      code: "",
      rememberDevice: false,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const buttonText = texts?.buttonText || locales.form.button;
  const codeLabelText = texts?.placeholder || locales.form.fields.code.label;
  const rememberDeviceText =
    texts?.rememberMeText || locales.form.rememberDevice;

  // Get field-specific errors using SDK's errors helper
  const codeSDKError = errors.byField("code")[0]?.message;

  // Get general errors (errors without a specific field)
  const generalErrors: ErrorItem[] = errors
    .byKind("server")
    .filter((err) => !err.field);

  const maskedPhoneNumber =
    data?.phoneNumber || locales.form.fields.phoneNumber.fallback;
  const phoneNumberLabel = locales.form.fields.phoneNumber.label;

  const onSubmit = async (formData: MfaSmsChallengeOptions) => {
    await handleContinueMfaSmsChallenge(formData.code, formData.rememberDevice);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* General error messages */}
        {hasError && generalErrors.length > 0 && (
          <div className="space-y-3 mb-4">
            {generalErrors.map((error: ErrorItem) => (
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

        {/* Disabled phone number display */}
        <ULThemeFloatingLabelField
          name="phoneNumber"
          label={phoneNumberLabel}
          value={maskedPhoneNumber}
          disabled
        />

        {/* SMS Code input field */}
        <FormField
          control={form.control}
          name="code"
          rules={{
            required: locales.form.fields.code.required,
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemeFloatingLabelField
                {...field}
                label={`${codeLabelText}*`}
                type="text"
                inputMode="numeric"
                placeholder=""
                autoComplete="one-time-code"
                autoFocus
                error={!!fieldState.error || !!codeSDKError}
              />
              <ULThemeFormMessage
                sdkError={codeSDKError}
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
          {isSubmitting ? locales.form.buttonSubmitting : buttonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default MfaSmsChallengeForm;
