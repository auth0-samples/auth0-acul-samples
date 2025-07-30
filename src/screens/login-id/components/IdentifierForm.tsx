import { useForm } from "react-hook-form";

import type { Error, TransactionMembersOnLoginId } from "@auth0/auth0-acul-js";

import Alert from "@/common/Alert";
import CaptchaBox from "@/common/CaptchaBox";
import CountryCodePicker from "@/common/CountryCodePicker";
import { ULThemeFloatingLabelField } from "@/components/form/ULThemeFloatingLabelField";
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemePrimaryButton } from "@/components/ULThemePrimaryButton";
import ULThemeLink from "@/components/ULThemeLink";
import {
  isPhoneNumberSupported,
  transformAuth0CountryCode,
} from "@/utils/helpers/countryUtils";
import { getFieldError } from "@/utils/helpers/errorUtils";
import { getIdentifierDetails } from "@/utils/helpers/identifierUtils";
import { rebaseLinkToCurrentOrigin } from "@/utils/helpers/urlUtils";

import { useLoginIdManager } from "../hooks/useLoginIdManager";

interface LoginIdFormData {
  identifier: string;
  captcha?: string;
}

function IdentifierForm() {
  const {
    handleLoginId,
    errors,
    isCaptchaAvailable,
    captchaImage,
    resetPasswordLink,
    isForgotPasswordEnabled,
    loginIdInstance,
    texts,
    handlePickCountryCode,
  } = useLoginIdManager();

  const form = useForm<LoginIdFormData>({
    defaultValues: {
      identifier: "",
      captcha: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Handle text fallbacks in component
  const buttonText = texts?.buttonText || "Continue";
  const captchaLabel = texts?.captchaCodePlaceholder?.concat("*") || "CAPTCHA*";
  const captchaImageAlt = "CAPTCHA challenge"; // Default fallback
  const forgotPasswordText = texts?.forgotPasswordText || "Forgot Password?";

  // Get general errors (not field-specific)
  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

  const identifierSDKError =
    getFieldError("identifier", errors) ||
    getFieldError("email", errors) ||
    getFieldError("phone", errors) ||
    getFieldError("username", errors);

  const captchaSDKError = getFieldError("captcha", errors);

  // Get allowed identifiers directly from SDK
  const allowedIdentifiers =
    loginIdInstance?.transaction?.allowedIdentifiers || [];

  const {
    label: identifierLabel,
    type: identifierType,
    autoComplete: identifierAutoComplete,
  } = getIdentifierDetails(allowedIdentifiers, texts);

  // Proper submit handler with form data
  const onSubmit = async (data: LoginIdFormData) => {
    await handleLoginId(data.identifier, data.captcha);
  };

  const localizedResetPasswordLink =
    resetPasswordLink && rebaseLinkToCurrentOrigin(resetPasswordLink);

  const shouldShowCountryPicker = isPhoneNumberSupported(allowedIdentifiers);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {/* General alerts at the top */}
        {generalErrors.length > 0 && (
          <div className="space-y-3 mb-4">
            {generalErrors.map((error: Error, index: number) => (
              <Alert key={index} type="error" message={error.message} />
            ))}
          </div>
        )}

        {/* Country Code Picker - only show if phone numbers are supported */}
        {shouldShowCountryPicker && (
          <div className="mb-4">
            <CountryCodePicker
              selectedCountry={transformAuth0CountryCode(
                (loginIdInstance?.transaction as TransactionMembersOnLoginId)
                  ?.countryCode,
                (loginIdInstance?.transaction as TransactionMembersOnLoginId)
                  ?.countryPrefix
              )}
              onClick={handlePickCountryCode}
              fullWidth
              placeholder="Select Country"
            />
          </div>
        )}

        {/* Identifier input field */}
        <FormField
          control={form.control}
          name="identifier"
          rules={{
            required: "This field is required",
            maxLength: {
              value: 100,
              message: "Maximum 100 characters allowed",
            },
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemeFloatingLabelField
                {...field}
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
        {isCaptchaAvailable && (
          <CaptchaBox
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

        {/* Forgot Password link */}
        <div className="text-left mb-4">
          {isForgotPasswordEnabled && localizedResetPasswordLink && (
            <ULThemeLink href={localizedResetPasswordLink}>
              {forgotPasswordText}
            </ULThemeLink>
          )}
        </div>

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

export default IdentifierForm;
