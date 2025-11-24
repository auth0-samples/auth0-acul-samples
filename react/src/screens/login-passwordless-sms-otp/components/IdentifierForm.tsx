import { useForm } from "react-hook-form";

import { useErrors } from "@auth0/auth0-acul-react/login-passwordless-sms-otp";
import type {
  ErrorItem,
  SubmitOTPOptions,
} from "@auth0/auth0-acul-react/types";

import Captcha from "@/components/Captcha/index";
import {
  ULThemeFloatingLabelField,
  ULThemeFormMessage,
} from "@/components/form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeLink from "@/components/ULThemeLink";
import { useCaptcha } from "@/hooks/useCaptcha";

import { useLoginPasswordlessSmsOtpManager } from "../hooks/useLoginPasswordlessSmsOtpManager";

/**
 * IdentifierForm Component
 *
 * This component renders the login form for the LoginPassword screen.
 * It includes fields for username(phonenumber), password, and CAPTCHA (if required),
 * along with error handling and support for editing identifiers.
 */
function IdentifierForm() {
  // Extract necessary methods and properties from the custom hook
  const {
    texts,
    locales,
    data,
    links,
    captcha,
    isCaptchaAvailable,
    handleSubmitOTP,
  } = useLoginPasswordlessSmsOtpManager();

  // Initialize the form using react-hook-form
  const form = useForm<SubmitOTPOptions>({
    defaultValues: {
      username: data?.phone_number || "",
      code: "",
      captcha: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Use locales as fallback to SDK texts
  const buttonText = texts?.buttonText || locales.form.continueButtonText;
  const codeLabelText = texts?.placeholder || locales.form.codeLabelText;
  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : locales.form.captchaLabel;
  const editText = texts?.editText || locales.form.editText;
  const editAriaLabel =
    texts?.editLinkScreenReadableText || locales.form.editIdentifierLinkText;
  const codeRequiredErrorMessage = locales.errors.codeIsRequired;

  const { captchaConfig, captchaProps, captchaValue } = useCaptcha(
    captcha || undefined,
    captchaLabel
  );

  const { errors, hasError, dismiss } = useErrors();

  // Get field-specific SDK errors
  const phoneSDKError = errors.byField("username")[0]?.message;
  const codeSDKError = errors.byField("code")[0]?.message;
  const captchaSDKError = errors.byField("captcha")[0]?.message;

  // Get general errors (not field-specific)
  const generalErrors: ErrorItem[] = errors
    .byType("auth0")
    .filter((err) => !err.field);

  /**
   * Handles form submission.
   *
   * @param data - The form data containing username(phonenumber), password, and optional CAPTCHA.
   */
  const onSubmit = async (data: SubmitOTPOptions) => {
    await handleSubmitOTP({
      username: data.username || "",
      code: data.code,
      captcha: isCaptchaAvailable && captchaValue ? captchaValue : undefined,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* General error messages */}
        {hasError && generalErrors.length > 0 && (
          <div className="space-y-3 mb-4">
            {generalErrors.map((error) => (
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

        {/* Prefilled Phonenumber(Username) input field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemeFloatingLabelField
                {...field}
                label=""
                value={data?.phone_number || ""}
                error={!!fieldState.error || !!phoneSDKError}
                readOnly={true}
                endAdornment={
                  <ULThemeLink
                    href={links?.edit_identifier}
                    aria-label={editAriaLabel}
                  >
                    {editText}
                  </ULThemeLink>
                }
                className="pr-4"
              />
              <ULThemeFormMessage
                sdkError={phoneSDKError}
                hasFormError={!!fieldState.error}
              />
            </FormItem>
          )}
        />

        {/* SMS OTP input field */}
        <FormField
          control={form.control}
          name="code"
          rules={{
            required: codeRequiredErrorMessage,
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemeFloatingLabelField
                {...field}
                label={codeLabelText}
                autoFocus={true}
                error={!!fieldState.error || !!codeSDKError}
              />
              <ULThemeFormMessage
                sdkError={codeSDKError}
                hasFormError={!!fieldState.error}
              />
            </FormItem>
          )}
        />

        {/* Captcha Field */}
        {isCaptchaAvailable && captchaConfig && (
          <Captcha
            control={form.control}
            name="captcha"
            captcha={captchaConfig}
            {...captchaProps}
            className="mt-4"
            sdkError={captchaSDKError}
            rules={{
              required: locales.errors.captchaCompletionRequired,
              maxLength: {
                value: 15,
                message: locales.errors.captchaTooLong,
              },
            }}
          />
        )}

        {/* Submit button */}
        <ULThemeButton
          type="submit"
          className="w-full mt-4"
          disabled={isSubmitting}
        >
          {buttonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default IdentifierForm;
