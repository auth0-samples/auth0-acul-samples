import React from "react";
import Button from "@/common/Button";
import CaptchaBox from "@/common/CaptchaBox";
import FormField from "@/common/FormField";
import { getFieldError } from "@/utils/errorUtils";
import { rebaseLinkToCurrentOrigin } from "@/utils/urlUtils";
import { useLoginIdManager } from "../hooks/useLoginIdManager";
import { useLoginIdForm } from "../hooks/useLoginIdForm";

// No props needed as it uses hooks internally for data and actions
const IdentifierForm: React.FC = () => {
  const { handleLoginId, errors, captcha, links } = useLoginIdManager();
  const { identifierRef, captchaRef, getFormValues } = useLoginIdForm();

  const isCaptchaAvailable = !!captcha;
  const captchaImage = captcha?.image || "";
  const captchaLabelText = "Enter the code shown above" + "*";

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
        className="mb-4"
        labelProps={{
          children: "Username or Email Address*",
          htmlFor: "identifier-login-id",
        }}
        inputProps={{
          id: "identifier-login-id",
          name: "identifier",
          type: "text",
          ref: identifierRef,
          autoComplete: "username",
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
          className="mb-4"
          id="captcha-input-login-id"
          label={captchaLabelText}
          imageUrl={captchaImage}
          inputProps={{
            ref: captchaRef,
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
            Forgot Password?
          </a>
        )}
      </div>

      <Button type="submit" fullWidth>
        Continue
      </Button>
    </form>
  );
};

export default IdentifierForm;
