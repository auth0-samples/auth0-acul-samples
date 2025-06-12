import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/common/Button";
import Alert from "@/common/Alert";
import UniversalCaptchaWidget, {
  createCaptchaConfig,
} from "@/common/CaptchaWidget";
import type { CaptchaResponse } from "@/common/CaptchaWidget";
import FormField from "@/common/FormField";
import { getFieldError } from "@/utils/helpers/errorUtils";
import { rebaseLinkToCurrentOrigin } from "@/utils/helpers/urlUtils";
import { getIdentifierDetails } from "@/utils/helpers/identifierUtils";
import { useLoginIdManager } from "../hooks/useLoginIdManager";

interface LoginIdFormData {
  identifier: string;
  captcha?: string;
}

// No props needed as it uses hooks internally for data and actions
const IdentifierForm: React.FC = () => {
  const { handleLoginId, errors, captcha, links, loginIdInstance, texts } =
    useLoginIdManager();

  // State for CAPTCHA response
  const [captchaResponse, setCaptchaResponse] =
    useState<CaptchaResponse | null>(null);

  const isCaptchaAvailable = !!captcha;
  const captchaConfig = createCaptchaConfig(captcha);

  // Handle text fallbacks in component
  const buttonText = texts?.buttonText || "Continue";
  const loadingText = "Processing..."; // Default fallback
  const captchaLabel = texts?.captchaCodePlaceholder?.concat("*") || "CAPTCHA*";
  const forgotPasswordText = texts?.forgotPasswordText || "Forgot Password?";

  // Get general errors (not field-specific)
  const generalErrors =
    errors?.filter((error: any) => !error.field || error.field === null) || [];

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
  const onSubmit = (data: LoginIdFormData) => {
    // Use the captcha response from the widget if available
    const captchaValue = captchaResponse
      ? captchaResponse.token ||
        captchaResponse.answer ||
        captchaResponse.arkoseToken
      : data.captcha;

    handleLoginId(data.identifier, captchaValue);
  };

  // Handle CAPTCHA response from the universal widget
  const handleCaptchaResponse = (response: CaptchaResponse | null) => {
    setCaptchaResponse(response);
  };

  // Handle CAPTCHA errors
  const handleCaptchaError = (error: string) => {
    console.error("CAPTCHA Error:", error);
  };

  const originalResetPasswordLink = links?.reset_password;
  const localizedResetPasswordLink = rebaseLinkToCurrentOrigin(
    originalResetPasswordLink,
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* General alerts at the top */}
      {generalErrors.length > 0 && (
        <div className="space-y-3 mb-4">
          {generalErrors.map((error: any, index: number) => (
            <Alert key={index} type="error" message={error.message} />
          ))}
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

      {isCaptchaAvailable && captchaConfig && (
        <UniversalCaptchaWidget
          className="mb-4"
          config={captchaConfig}
          onCaptchaResponse={handleCaptchaResponse}
          onError={handleCaptchaError}
          label={captchaLabel}
          error={
            formErrors.captcha?.message || getFieldError("captcha", errors)
          }
        />
      )}
      <div className="text-left">
        {localizedResetPasswordLink && (
          <a
            href={localizedResetPasswordLink}
            className="text-sm text-link font-bold hover:text-link/80 focus:bg-link/15 focus:rounded"
          >
            {forgotPasswordText}
          </a>
        )}
      </div>

      <Button
        type="submit"
        fullWidth
        loadingText={loadingText}
        isLoading={isSubmitting}
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default IdentifierForm;
