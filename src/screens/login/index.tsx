import React from "react";

import Button from "@/common/Button";
import CaptchaBox from "@/common/CaptchaBox";
import Card from "@/common/Card";
import FormField from "@/common/FormField";
import Logo from "@/common/Logo";
import PasswordInput from "@/common/PasswordInput";
import Separator from "@/common/Separator";
import SocialProviderButton from "@/common/SocialProviderButton";

import { BrandingProvider } from "@/context/BrandingProvider";
import { getIcon } from "@/utils/iconUtils";
import { getSdkErrorForField } from "@/utils/errorUtils";
import { useLoginForm } from "./hooks/useLoginForm";
import { useLoginManager } from "./hooks/useLoginManager";
import type { SdkError } from "@/utils/errorUtils";

const LoginScreen: React.FC = () => {
  const { handleLogin, handleSocialLogin, loginInstance } = useLoginManager();
  const { usernameRef, passwordRef, captchaRef, getFormValues } =
    useLoginForm();

  const texts = loginInstance?.screen?.texts || {};
  // IMP: This is a to set the page title dynamically
  const pageTitle = texts?.pageTitle || "Login";
  document.title = pageTitle;

  const sdkErrors: SdkError[] = (loginInstance?.transaction?.errors ||
    []) as SdkError[];
  const isCaptchaAvailable = !!loginInstance?.screen?.captcha;
  const captchaImage = loginInstance?.screen?.captcha?.image || "";
  const captchaLabelText =
    (texts.captchaCodePlaceholder || "Enter the code shown above") + "*";

  const onLoginClick = (e: React.FormEvent) => {
    e.preventDefault();
    const { username, password, captcha } = getFormValues();
    handleLogin(username, password, captcha);
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return getSdkErrorForField(fieldName, sdkErrors);
  };

  return (
    <BrandingProvider screenInstance={loginInstance}>
      <div className="min-h-screen flex items-center justify-center px-10 py-20">
        {/* Parent Card */}
        <Card className="w-full max-w-[400px]">
          {/* Header section */}
          <Logo imageClassName="h-13" />
          <h1 className="text-2xl font-normal text-center text-text-default mt-6 mb-4">
            {loginInstance?.screen?.texts?.title}
          </h1>
          <p className="text-center text-text-default text-sm mb-4">
            {loginInstance?.screen?.texts?.description}
          </p>

          {/* Login form */}
          <form onSubmit={onLoginClick} className="space-y-4">
            <FormField
              className="mb-4"
              labelProps={{
                children: `${loginInstance?.screen?.texts?.usernameOrEmailPlaceholder}*`,
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
              error={getFieldError("username") || getFieldError("email")}
            />

            <PasswordInput
              className="mb-4"
              label={`${texts.passwordPlaceholder || "Password"}*`}
              name="password"
              inputProps={{
                ref: passwordRef,
                autoComplete: "current-password",
                required: true,
              }}
              error={getFieldError("password")}
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
                imageClassName="h-16"
                error={getFieldError("captcha")}
              />
            )}
            <div className="mt-6 text-left">
              {loginInstance?.screen?.links?.reset_password &&
                loginInstance?.screen?.texts?.forgotPasswordText && (
                  <a
                    href={loginInstance.screen.links.reset_password}
                    className="text-sm text-link hover:text-link-hover active:text-link-pressed font-bold p-1"
                  >
                    {loginInstance.screen.texts.forgotPasswordText}
                  </a>
                )}
            </div>

            {/* Login button */}
            <Button type="submit" fullWidth>
              {loginInstance?.screen?.texts?.buttonText}
            </Button>
          </form>

          {/* Footer text */}
          <div className="mt-4 text-left">
            <span className="text-sm">
              {loginInstance?.screen?.texts?.dontHaveAccountText ||
                "Don't have an account?"}
            </span>{" "}
            {loginInstance?.screen?.links?.signup && (
              <a
                href={loginInstance.screen.links.signup}
                className="text-sm font-bold text-link hover:text-link-hover active:text-link-pressed px-1"
              >
                {loginInstance.screen.texts?.signUpText || "Sign up"}
              </a>
            )}
          </div>

          <Separator text="OR" />

          {/* Social login buttons */}
          <div className="space-y-3">
            {loginInstance?.transaction?.alternateConnections?.map(
              (connection) => (
                <SocialProviderButton
                  key={connection.name}
                  providerName={
                    connection?.strategy?.charAt(0)?.toUpperCase() +
                    connection?.strategy?.slice(1)
                  } /* Capitalize the first letter of the strategy */
                  icon={getIcon(connection.name)}
                  onClick={() => handleSocialLogin(connection.name)}
                />
              ),
            )}
          </div>
        </Card>
      </div>
    </BrandingProvider>
  );
};

export default LoginScreen;
