import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import type { Error, LoginOptions } from "@auth0/auth0-acul-js/types";

import Captcha from "@/components/Captcha/index";
import { ULThemeFloatingLabelField } from "@/components/form/ULThemeFloatingLabelField";
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import { Form, FormField, FormItem } from "@/components/ui/form";
import ULThemeCountryCodePicker from "@/components/ULThemeCountryCodePicker";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeLink from "@/components/ULThemeLink";
import { ULThemePrimaryButton } from "@/components/ULThemePrimaryButton";
import { useCaptcha } from "@/hooks/useCaptcha";
import {
  isPhoneNumberSupported,
  transformAuth0CountryCode,
} from "@/utils/helpers/countryUtils";
import { getFieldError } from "@/utils/helpers/errorUtils";
import { getIdentifierDetails } from "@/utils/helpers/identifierUtils";

import { useLoginIdManager } from "../hooks/useLoginIdManager";

function LoginIdForm() {
  const {
    handleLoginId,
    loginIdInstance,
    screen,
    transaction,
    handlePickCountryCode,
    locales,
  } = useLoginIdManager();

  const form = useForm<LoginOptions>({
    defaultValues: {
      username: "",
      captcha: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Destructure from screen and transaction
  const { texts, isCaptchaAvailable, captcha, resetPasswordLink } = screen;
  const { isForgotPasswordEnabled, countryCode, countryPrefix } = transaction;

  // Get computed values from SDK instance
  const errors = loginIdInstance.getErrors();
  const loginIdentifiers = loginIdInstance.getLoginIdentifiers() || [];

  // Handle text fallbacks using locales
  const buttonText = texts?.buttonText || locales.form.button;
  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : `${locales.form.fields.captcha.label}*`;
  const forgotPasswordText =
    texts?.forgotPasswordText || locales.form.forgotPassword;

  const {
    label: identifierLabel,
    type: identifierType,
    autoComplete: identifierAutoComplete,
  } = getIdentifierDetails(loginIdentifiers, texts);

  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

  const identifierSDKError =
    getFieldError("identifier", errors) ||
    getFieldError("email", errors) ||
    getFieldError("phone", errors) ||
    getFieldError("username", errors);

  const captchaSDKError = getFieldError("captcha", errors);

  const { captchaConfig, captchaProps } = useCaptcha(
    captcha || undefined,
    captchaLabel
  );

  const shouldShowCountryPicker = isPhoneNumberSupported(loginIdentifiers);
  const selectedCountry = transformAuth0CountryCode(countryCode, countryPrefix);

  // Track if passkey autofill has been registered to prevent duplicate calls
  const passkeyRegistered = useRef(false);

  // Enable passkey autofill for identifier field if supported (run once on mount)
  useEffect(() => {
    if (
      transaction?.isPasskeyEnabled &&
      transaction?.showPasskeyAutofill &&
      !passkeyRegistered.current
    ) {
      passkeyRegistered.current = true;
      loginIdInstance.registerPasskeyAutofill("username");
    }
  }, [
    transaction?.isPasskeyEnabled,
    transaction?.showPasskeyAutofill,
    loginIdInstance,
  ]);

  // Proper submit handler with form data
  const onSubmit = async (data: LoginOptions): Promise<void> => {
    await handleLoginId(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* General alerts at the top */}
        {generalErrors.length > 0 && (
          <div className="space-y-3 mb-4">
            {generalErrors.map((error: Error, index: number) => (
              <ULThemeAlert key={index} variant="destructive">
                <ULThemeAlertTitle>{error.message}</ULThemeAlertTitle>
              </ULThemeAlert>
            ))}
          </div>
        )}

        {/* Country Code Picker - only show if phone numbers are supported */}
        {shouldShowCountryPicker && (
          <div className="mb-4">
            <ULThemeCountryCodePicker
              selectedCountry={selectedCountry}
              onClick={handlePickCountryCode}
              fullWidth
              placeholder={locales.form.countryPicker.placeholder}
            />
          </div>
        )}

        {/* Identifier input field */}
        <FormField
          control={form.control}
          name="username"
          rules={{
            required: locales.form.fields.identifier.required,
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemeFloatingLabelField
                {...field}
                id="username"
                value={String(field.value || "")}
                label={identifierLabel}
                type={identifierType}
                autoFocus={true}
                autoComplete={identifierAutoComplete}
                error={!!fieldState.error || !!identifierSDKError}
              />
              <ULThemeFormMessage
                sdkError={identifierSDKError}
                hasFormError={!!fieldState.error}
              />
            </FormItem>
          )}
        />

        {/* CAPTCHA Box */}
        {isCaptchaAvailable && captchaConfig && (
          <Captcha
            control={form.control}
            name="captcha"
            captcha={captchaConfig}
            {...captchaProps}
            sdkError={captchaSDKError}
            rules={{
              required: locales.form.fields.captcha.required,
            }}
          />
        )}

        {/* Forgot Password link */}
        {isForgotPasswordEnabled && resetPasswordLink && (
          <div className="mb-4 mt-2 text-left">
            <ULThemeLink href={resetPasswordLink}>
              {forgotPasswordText}
            </ULThemeLink>
          </div>
        )}

        {/* Submit button */}
        <ULThemePrimaryButton
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {buttonText}
        </ULThemePrimaryButton>
      </form>
    </Form>
  );
}

export default LoginIdForm;
