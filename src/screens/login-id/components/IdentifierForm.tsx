import React from "react";
import Button from "@/common/Button";
import CaptchaBox from "@/common/CaptchaBox";
import FormField from "@/common/FormField";
import { getFieldError } from "@/utils/errorUtils";
import { useLoginIdManager } from "../hooks/useLoginIdManager";
import { useLoginIdForm } from "../hooks/useLoginIdForm";
import type { SdkError } from "@/utils/errorUtils";

// No props needed as it uses hooks internally for data and actions
const IdentifierForm: React.FC = () => {
  const { handleLoginId, loginIdInstance } = useLoginIdManager();
  const { identifierRef, captchaRef, getFormValues } = useLoginIdForm();

  const sdkErrors: SdkError[] = (loginIdInstance?.transaction?.errors ||
    []) as SdkError[];
  const isCaptchaAvailable = !!loginIdInstance?.screen?.captcha;
  const captchaImage = loginIdInstance?.screen?.captcha?.image || "";
  const captchaLabelText = "Enter the code shown above" + "*";

  const onLoginIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { identifier, captcha } = getFormValues();
    handleLoginId(identifier, captcha);
  };

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
        }}
        error={
          getFieldError("identifier", sdkErrors) ||
          getFieldError("email", sdkErrors) ||
          getFieldError("phone", sdkErrors) ||
          getFieldError("username", sdkErrors)
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
          error={getFieldError("captcha", sdkErrors)}
        />
      )}
      <div className="text-left">
        {loginIdInstance?.screen?.links?.reset_password && (
          <a
            href={loginIdInstance?.screen?.links?.reset_password}
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
