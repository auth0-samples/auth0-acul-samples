import React from "react";
import { useForm } from "react-hook-form";
import Button from "@/common/Button";
import Alert from "@/common/Alert";
import FormField from "@/common/FormField";
import { getFieldError } from "@/utils/helpers/errorUtils";
import { rebaseLinkToCurrentOrigin } from "@/utils/helpers/urlUtils";
import { getIdentifierDetails } from "@/utils/helpers/identifierUtils";
import { useLoginIdManager } from "../hooks/useLoginIdManager";
import { useCaptcha } from "@/hooks/useCaptcha";

interface LoginIdFormData {
  identifier: string;
  captcha?: string;
}

// No props needed as it uses hooks internally for data and actions
const IdentifierForm: React.FC = () => {
  const { handleLoginId, errors, captcha, links, loginIdInstance, texts } =
    useLoginIdManager();

  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : "CAPTCHA*";
  const captchaErrorText = "Please complete the captcha verification";

  const {
    Captcha,
    value: captchaValue,
    error: captchaError,
    validate: validateCaptcha,
  } = useCaptcha(captcha, captchaLabel, captchaErrorText);

  const isCaptchaAvailable = !!captcha;

  const buttonText = texts?.buttonText || "Continue";
  const loadingText = "Processing...";
  const forgotPasswordText = texts?.forgotPasswordText || "Forgot Password?";

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

  const onSubmit = (data: LoginIdFormData) => {
    if (isCaptchaAvailable && !validateCaptcha()) {
      return;
    }

    const finalCaptchaValue =
      captcha?.provider === "auth0" ? captchaValue : data.captcha;

    handleLoginId(data.identifier, finalCaptchaValue);
  };

  const originalResetPasswordLink = links?.reset_password;
  const localizedResetPasswordLink = rebaseLinkToCurrentOrigin(
    originalResetPasswordLink,
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* General alerts at the top */}
      {(generalErrors.length > 0 || captchaError) && (
        <div className="space-y-3 mb-4">
          {generalErrors.map((error: any, index: number) => (
            <Alert key={index} type="error" message={error.message} />
          ))}
          {captchaError && <Alert type="error" message={captchaError} />}
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

      {Captcha}

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
        disabled={isSubmitting}
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default IdentifierForm;
