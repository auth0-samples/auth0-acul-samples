import React from "react";
import Button from "@/common/Button";
import CaptchaBox from "@/common/CaptchaBox";
import FormField from "@/common/FormField";
import { getFieldError } from "@/utils/helpers/errorUtils";
import { rebaseLinkToCurrentOrigin } from "@/utils/helpers/urlUtils";
import { getIdentifierDetails } from "@/utils/helpers/identifierUtils";
import { useLoginIdManager } from "../hooks/useLoginIdManager";
import { useLoginIdForm } from "../hooks/useLoginIdForm";

// No props needed as it uses hooks internally for data and actions
const IdentifierForm: React.FC = () => {
  const { handleLoginId, errors, captcha, links, loginIdInstance, texts } =
    useLoginIdManager();
  const { identifierRef, captchaRef, getFormValues } = useLoginIdForm();

  const isCaptchaAvailable = !!captcha;
  const captchaImage = captcha?.image || "";

  // Handle text fallbacks in component
  const buttonText = texts?.buttonText || "Continue";
  const loadingText = "Processing..."; // Default fallback
  const captchaLabel = texts?.captchaCodePlaceholder || "CAPTCHA";
  const captchaImageAlt = "CAPTCHA challenge"; // Default fallback
  const forgotPasswordText = texts?.forgotPasswordText || "Forgot Password?";

  // Get dynamic identifier details based on connection attributes
  const connectionAttributes = (loginIdInstance?.transaction as any)?.connection
    ?.options?.attributes;
  const identifierRequiredTypes = connectionAttributes
    ? Object.keys(connectionAttributes).filter(
        (key) => connectionAttributes[key]?.identifier_active === true,
      )
    : [];

  const {
    label: identifierLabel,
    type: identifierType,
    autoComplete: identifierAutoComplete,
  } = getIdentifierDetails(identifierRequiredTypes as any, texts);

  const onLoginIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { identifier, captcha } = getFormValues();
    handleLoginId(identifier, captcha);
  };

  const originalResetPasswordLink = links?.reset_password;
  const localizedResetPasswordLink = rebaseLinkToCurrentOrigin(
    originalResetPasswordLink,
  );

  return (
    <form onSubmit={onLoginIdSubmit} className="space-y-4">
      <FormField
        ref={identifierRef}
        className="mb-4"
        labelProps={{
          children: identifierLabel,
          htmlFor: "identifier-login-id",
        }}
        inputProps={{
          id: "identifier-login-id",
          name: "identifier",
          type: identifierType,
          autoComplete: identifierAutoComplete,
          required: true,
          maxLength: 100,
          autoFocus: true,
        }}
        error={
          getFieldError("identifier", errors) ||
          getFieldError("email", errors) ||
          getFieldError("phone", errors) ||
          getFieldError("username", errors)
        }
      />

      {isCaptchaAvailable && captchaImage && (
        <CaptchaBox
          ref={captchaRef}
          className="mb-4"
          id="captcha-input-login-id"
          label={captchaLabel}
          imageUrl={captchaImage}
          imageAltText={captchaImageAlt}
          inputProps={{
            required: isCaptchaAvailable,
            maxLength: 15,
          }}
          error={getFieldError("captcha", errors)}
        />
      )}
      <div className="text-left">
        {localizedResetPasswordLink && (
          <a
            href={localizedResetPasswordLink}
            className="text-sm text-link font-bold hover:text-link/80 focus:bg-link/15 focus:rounded p-1"
          >
            {forgotPasswordText}
          </a>
        )}
      </div>

      <Button type="submit" fullWidth loadingText={loadingText}>
        {buttonText}
      </Button>
    </form>
  );
};

export default IdentifierForm;
