import React from "react";
import Button from "@/common/Button";
import PasswordInput from "@/common/PasswordInput";
import type { SdkError } from "@/utils/errorUtils";
import { getFieldError } from "@/utils/errorUtils";
import { useLoginPasswordManager } from "../hooks/userLoginPasswordManager";
import { useLoginPasswordForm } from "../hooks/useLoginPasswordForm";
import FormField from "@/common/FormField";

const LoginForm: React.FC = () => {
  const { loginPasswordInstance, username, editIdentifierLink, handleLogin } =
    useLoginPasswordManager();
  const { passwordRef, getFormValues } = useLoginPasswordForm();

  const sdkErrors: SdkError[] = (loginPasswordInstance?.transaction?.errors ||
    []) as SdkError[];

  const onLoginClick = (e: React.FormEvent) => {
    e.preventDefault();
    const { password } = getFormValues();
    handleLogin({ username: username || "", password });
  };

  return (
    <form onSubmit={onLoginClick} className="space-y-4">
      <FormField
        className="mb-4 w-full"
        labelProps={{
          children: `Username or Email address*`,
          htmlFor: "email-login",
        }}
        inputProps={{
          id: "email-login",
          name: "email",
          type: "email",
          value: username,
          placeholder: "\u00A0",
          autoComplete: "email",
          disabled: true,
        }}
        inputIcon={
          <a
            href={editIdentifierLink}
            className="text-sm text-link font-bold hover:text-link/80 focus:bg-link/15 focus:rounded p-1 px-3"
          >
            Edit
          </a>
        }
      />

      <PasswordInput
        className="mb-4 w-full"
        label={`Password*`}
        name="password"
        inputProps={{
          ref: passwordRef,
          autoComplete: "current-password",
          required: true,
          autoFocus: true,
          maxLength: 25,
        }}
        error={getFieldError("password", sdkErrors)}
      />

      <div className="mt-6 text-left">
        {loginPasswordInstance?.screen?.links?.reset_password && (
          <a
            href={loginPasswordInstance.screen.links.reset_password}
            className="text-sm text-link font-bold hover:text-link/80 focus:bg-link/15 focus:rounded p-1"
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
