import React from "react";
import Button from "@/common/Button";
import PasswordInput from "@/common/PasswordInput";
import { getFieldError } from "@/utils/errorUtils";
import { rebaseLinkToCurrentOrigin } from "@/utils/urlUtils";
import { useLoginPasswordManager } from "../hooks/useLoginPasswordManager";
import { useLoginPasswordForm } from "../hooks/useLoginPasswordForm";
import FormField from "@/common/FormField";
import CaptchaBox from "@/common/CaptchaBox";

const LoginForm: React.FC = () => {
  const { username, editIdentifierLink, handleLogin, errors, captcha, links } =
    useLoginPasswordManager();
  const { passwordRef, captchaRef, getFormValues } = useLoginPasswordForm();

  const captchaImage = captcha?.image;
  const isCaptchaAvailable = !!captcha;

  const onLoginClick = (e: React.FormEvent) => {
    e.preventDefault();
    const { password, captcha } = getFormValues();
    handleLogin({
      username: username || "",
      password,
      captcha: isCaptchaAvailable ? captcha : undefined,
    });
  };

  const localizedEditIdentifierLink =
    rebaseLinkToCurrentOrigin(editIdentifierLink);
  const originalResetPasswordLink = links?.reset_password;
  const localizedResetPasswordLink = rebaseLinkToCurrentOrigin(
    originalResetPasswordLink,
  );

  return (
    <form onSubmit={onLoginClick} className="space-y-4">
      <FormField
        className="mb-4 w-full"
        labelProps={{
          children: `Username or Email address*`,
          htmlFor: "email-login-lp",
        }}
        inputProps={{
          id: "email-login-lp",
          name: "email",
          type: "email",
          value: username,
          placeholder: "\u00A0",
          autoComplete: "email",
          disabled: true,
        }}
        inputIcon={
          localizedEditIdentifierLink && (
            <a
              href={localizedEditIdentifierLink}
              className="text-sm text-link font-bold hover:text-link/80 focus:bg-link/15 focus:rounded p-1 px-3"
              data-testid="edit-identifier"
            >
              Edit
            </a>
          )
        }
      />

      <PasswordInput
        ref={passwordRef}
        className="mb-4 w-full"
        label={`Password*`}
        name="password"
        inputProps={{
          autoComplete: "current-password",
          required: true,
          autoFocus: true,
          maxLength: 25,
        }}
        error={getFieldError("password", errors)}
      />

      {isCaptchaAvailable && captchaImage && (
        <CaptchaBox
          ref={captchaRef}
          className="mb-4"
          id="captcha-input-login-password"
          label="Enter the code shown above"
          imageUrl={captchaImage}
          inputProps={{
            required: isCaptchaAvailable,
            maxLength: 15,
          }}
          error={getFieldError("captcha", errors)}
        />
      )}

      <div className="mt-6 text-left">
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
