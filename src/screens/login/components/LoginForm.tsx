import React from "react";
import Button from "@/common/Button";
import CaptchaBox from "@/common/CaptchaBox";
import FormField from "@/common/FormField";
import PasswordInput from "@/common/PasswordInput";
import type { SdkError } from "@/utils/errorUtils";
import { getFieldError } from "@/utils/errorUtils";
import { useLoginManager } from "../hooks/useLoginManager";
import { useLoginForm } from "../hooks/useLoginForm";

const LoginForm: React.FC = () => {
  const { loginInstance, handleLogin } = useLoginManager();
  const { usernameRef, passwordRef, captchaRef, getFormValues } =
    useLoginForm();

  const sdkErrors: SdkError[] = (loginInstance?.transaction?.errors ||
    []) as SdkError[];
  const isCaptchaAvailable = !!loginInstance?.screen?.captcha;
  const captchaImage = loginInstance?.screen?.captcha?.image || "";
  const captchaLabelText = "Enter the code shown above" + "*";

  const onLoginClick = (e: React.FormEvent) => {
    e.preventDefault();
    const { username, password, captcha } = getFormValues();
    handleLogin(username, password, captcha);
  };

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
          getFieldError("username", sdkErrors) ||
          getFieldError("email", sdkErrors)
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
        error={getFieldError("password", sdkErrors)}
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
          }}
          error={getFieldError("captcha", sdkErrors)}
        />
      )}
      <div className="mt-6 text-left">
        {loginInstance?.screen?.links?.reset_password && (
          <a
            href={loginInstance.screen.links.reset_password}
            className="text-sm text-link font-bold hover:text-link/60 focus:bg-link/15 focus:rounded p-1"
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
