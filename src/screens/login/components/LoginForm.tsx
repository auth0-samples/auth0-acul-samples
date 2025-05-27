import React from "react";
import Button from "@/common/Button";
import CaptchaBox from "@/common/CaptchaBox";
import FormField from "@/common/FormField";
import PasswordInput from "@/common/PasswordInput";
import { getFieldError } from "@/utils/errorUtils";
import { rebaseLinkToCurrentOrigin } from "@/utils/urlUtils";
import { useLoginManager } from "../hooks/useLoginManager";
import { useLoginForm } from "../hooks/useLoginForm";

const LoginForm: React.FC = () => {
  const { handleLogin, errors, captcha, links } = useLoginManager();
  const { usernameRef, passwordRef, captchaRef, getFormValues } =
    useLoginForm();

  const isCaptchaAvailable = !!captcha;
  const captchaImage = captcha?.image || "";
  const captchaLabelText = "Enter the code shown above" + "*";

  const onLoginClick = (e: React.FormEvent) => {
    e.preventDefault();
    const { username, password, captcha } = getFormValues();
    handleLogin(username, password, captcha);
  };

  const originalResetPasswordLink = links?.reset_password;
  const localizedResetPasswordLink = rebaseLinkToCurrentOrigin(
    originalResetPasswordLink,
  );

  return (
    <form onSubmit={onLoginClick} className="space-y-4">
      <FormField
        className="mb-4"
        labelProps={{
          children: `Username or Email address*`,
          htmlFor: "email-login",
        }}
        inputProps={{
          id: "email-login",
          name: "email",
          type: "email",
          ref: usernameRef,
          placeholder: "\u00A0",
          autoComplete: "email",
          required: true,
        }}
        error={
          getFieldError("username", errors) || getFieldError("email", errors)
        }
      />

      <PasswordInput
        className="mb-4"
        label={`Password*`}
        name="password"
        inputProps={{
          ref: passwordRef,
          autoComplete: "current-password",
          required: true,
        }}
        error={getFieldError("password", errors)}
      />

      {isCaptchaAvailable && captchaImage && (
        <CaptchaBox
          className="mb-4"
          id="captcha-input-login"
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
      <div className="mt-6 text-left flex items-center justify-between">
        {localizedResetPasswordLink && (
          <a
            href={localizedResetPasswordLink}
            className="text-sm text-link font-bold hover:text-link/80 focus:bg-link/15 focus:rounded p-1"
            data-testid="forgot-password"
          >
            Forgot password?
          </a>
        )}
      </div>

      <Button type="submit" fullWidth>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
