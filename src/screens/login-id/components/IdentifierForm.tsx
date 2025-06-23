import React from "react";
import { useForm } from "react-hook-form";
import Button from "@/common/Button";
import Alert from "@/common/Alert";
import CaptchaBox from "@/common/CaptchaBox";
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

  const isCaptchaAvailable = !!captcha;
  const captchaImage = captcha?.image || "";

  // Handle text fallbacks in component
  const buttonText = texts?.buttonText || "Continue";
  const loadingText = "Processing..."; // Default fallback
  const captchaLabel = texts?.captchaCodePlaceholder?.concat("*") || "CAPTCHA*";
  const captchaImageAlt = "CAPTCHA challenge"; // Default fallback
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
    handleLoginId(data.identifier, data.captcha);
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

      {isCaptchaAvailable && captchaImage && (
        <CaptchaBox
          className="mb-4"
          id="captcha-input-login-id"
          name="captcha"
          label={captchaLabel}
          imageUrl={captchaImage}
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
