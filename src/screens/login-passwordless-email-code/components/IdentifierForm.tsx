import { useForm } from "react-hook-form";

import type { Error } from "@auth0/auth0-acul-react";
import { SubmitCodeOptions } from "@auth0/auth0-acul-react/login-passwordless-email-code";

import Captcha from "@/components/Captcha";
import {
  ULThemeFloatingLabelField,
  ULThemeFormMessage,
} from "@/components/form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeLink from "@/components/ULThemeLink";
import { getFieldError } from "@/utils/helpers/errorUtils";

import { useLoginPasswordlessEmailCodeManager } from "../hooks/useLoginPasswordlessEmailCodeManager";

/**
 * IdentifierForm Component
 *
 * This component renders the login form for the LoginPassword screen.
 * It includes fields for username, password, and CAPTCHA (if required),
 * along with error handling and support for editing identifiers.
 */
function IdentifierForm() {
  // Extract necessary methods and properties from the custom hook
  const {
    handleSubmitEmailCode,
    data,
    errors,
    isCaptchaAvailable,
    captchaImage,
    texts,
    links,
  } = useLoginPasswordlessEmailCodeManager();

  // Initialize the form using react-hook-form
  const form = useForm<SubmitCodeOptions>({
    defaultValues: {
      email: data?.username || "",
      code: "",
      captcha: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Handle text fallbacks for button and field labels
  const buttonText = texts?.buttonText || "Continue";
  const codeLabelText = texts?.placeholder || "Enter the code";
  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : "CAPTCHA*";
  const captchaImageAlt = "CAPTCHA challenge"; // Default fallback

  // Extract general errors (not field-specific) from the SDK
  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

  // Extract field-specific errors for email, code, and CAPTCHA
  const emailSDKError = getFieldError("email", errors);
  const codeSDKError = getFieldError("code", errors);
  const captchaSDKError = getFieldError("captcha", errors);

  /**
   * Handles form submission.
   *
   * @param data - The form data containing email, code, and optional CAPTCHA.
   */
  const onSubmit = async (data: SubmitCodeOptions) => {
    await handleSubmitEmailCode(String(data.code), data.captcha);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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

        {/* Email input field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemeFloatingLabelField
                {...field}
                label=""
                value={data?.username || ""}
                error={!!fieldState.error || !!emailSDKError}
                readOnly={true}
                endAdornment={
                  <ULThemeLink
                    href={links?.edit_identifier}
                    aria-label={
                      texts?.editLinkScreenReadableText || "Edit email address"
                    }
                  >
                    {texts?.editText || "Edit"}
                  </ULThemeLink>
                }
                className="pr-[16px]"
              />
              <ULThemeFormMessage
                sdkError={emailSDKError}
                hasFormError={!!fieldState.error}
              />
            </FormItem>
          )}
        />

        {/* Code input field */}
        <FormField
          control={form.control}
          name="code"
          rules={{
            required: "Please fill out this field.",
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

        {/* CAPTCHA Box */}
        {isCaptchaAvailable &&
          (codeSDKError || captchaSDKError || generalErrors.length > 0) && (
            <Captcha
              control={form.control}
              name="captcha"
              label={captchaLabel}
              imageUrl={captchaImage || ""}
              imageAltText={captchaImageAlt}
              className="mb-4"
              sdkError={captchaSDKError}
              rules={{
                required: "Please complete the CAPTCHA",
                maxLength: {
                  value: 15,
                  message: "CAPTCHA too long",
                },
              }}
            />
          )}

        {/* Submit button */}
        <ULThemeButton type="submit" className="w-full" disabled={isSubmitting}>
          {buttonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default IdentifierForm;
