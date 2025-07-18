import React from "react";
import { useForm } from "react-hook-form";
import { ULThemePrimaryButton } from "@/components/ULThemePrimaryButton";
import { Alert } from "@/components/ui/alert";
import CaptchaBox from "@/common/CaptchaBox";
import FormField from "@/common/FormField";
import CountryCodePicker from "@/common/CountryCodePicker";
import { getFieldError } from "@/utils/helpers/errorUtils";
import { rebaseLinkToCurrentOrigin } from "@/utils/helpers/urlUtils";
import { getIdentifierDetails } from "@/utils/helpers/identifierUtils";
import {
  transformAuth0CountryCode,
  isPhoneNumberSupported,
} from "@/utils/helpers/countryUtils";
import { useLoginIdManager } from "../hooks/useLoginIdManager";
import type { Error, TransactionMembersOnLoginId } from "@auth0/auth0-acul-js";

interface LoginIdFormData {
  identifier: string;
  captcha?: string;
}

const IdentifierForm: React.FC = () => {
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

  // Handle text fallbacks in component
  const buttonText = texts?.buttonText || "Continue";

  const captchaLabel = texts?.captchaCodePlaceholder?.concat("*") || "CAPTCHA*";
  const captchaImageAlt = "CAPTCHA challenge"; // Default fallback
  const forgotPasswordText = texts?.forgotPasswordText || "Forgot Password?";

  // Get general errors (not field-specific)
  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

  // Get allowed identifiers directly from SDK
  const allowedIdentifiers =
    loginIdInstance?.transaction?.allowedIdentifiers || [];

  const {
    label: identifierLabel,
    type: identifierType,
    autoComplete: identifierAutoComplete,
  } = getIdentifierDetails(allowedIdentifiers, texts);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<LoginIdFormData>();

  // Proper submit handler with form data
  const onSubmit = async (data: LoginIdFormData) => {
    await handleLoginId(data.identifier, data.captcha);
  };

  const localizedResetPasswordLink =
    resetPasswordLink && rebaseLinkToCurrentOrigin(resetPasswordLink);

  const shouldShowCountryPicker = isPhoneNumberSupported(allowedIdentifiers);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* General alerts at the top */}
      {generalErrors.length > 0 && (
        <div className="space-y-3 mb-4">
          {generalErrors.map((error: Error, index: number) => (
            <Alert key={index} variant="destructive">
              {error.message}
            </Alert>
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
                ?.countryPrefix,
            )}
            onClick={handlePickCountryCode}
            fullWidth
            placeholder="Select Country"
          />
        </div>
      )}

      <FormField
        className="mb-4"
        labelProps={{
          children: identifierLabel,
          htmlFor: "identifier-login-id",
        }}
        inputProps={{
          ...register("identifier", {
            required: "This field is required",
            maxLength: {
              value: 100,
              message: "Maximum 100 characters allowed",
            },
          }),
          id: "identifier-login-id",
          type: identifierType,
          autoComplete: identifierAutoComplete,
          autoFocus: true,
        }}
        error={
          formErrors.identifier?.message ||
          getFieldError("identifier", errors) ||
          getFieldError("email", errors) ||
          getFieldError("phone", errors) ||
          getFieldError("username", errors)
        }
      />

      {isCaptchaAvailable && (
        <CaptchaBox
          className="mb-4"
          id="captcha-input-login-id"
          name="captcha"
          label={captchaLabel}
          imageUrl={captchaImage || ""}
          imageAltText={captchaImageAlt}
          inputProps={{
            ...register("captcha", {
              required: "Please complete the CAPTCHA",
              maxLength: {
                value: 15,
                message: "CAPTCHA too long",
              },
            }),
          }}
          error={
            formErrors.captcha?.message || getFieldError("captcha", errors)
          }
        />
      )}
      <div className="text-left">
        {isForgotPasswordEnabled && localizedResetPasswordLink && (
          <a
            href={localizedResetPasswordLink}
            className="text-sm text-link font-bold hover:text-link/80 focus:bg-link/15 focus:rounded"
          >
            {forgotPasswordText}
          </a>
        )}
      </div>

      <ULThemePrimaryButton
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {buttonText}
      </ULThemePrimaryButton>
    </form>
  );
};

export default IdentifierForm;
