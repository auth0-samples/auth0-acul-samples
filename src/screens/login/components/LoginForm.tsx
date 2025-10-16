import { useForm } from "react-hook-form";

import type { IdentifierType } from "@auth0/auth0-acul-react";
import type { LoginOptions } from "@auth0/auth0-acul-react/login";

import Captcha from "@/components/Captcha";
import { ULThemeFloatingLabelField } from "@/components/form/ULThemeFloatingLabelField";
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeLink from "@/components/ULThemeLink";
import { ULThemePasswordField } from "@/components/ULThemePasswordField";
import { getFieldError } from "@/utils/helpers/errorUtils";
import { getIdentifierDetails } from "@/utils/helpers/identifierUtils";

import { useLoginManager } from "../hooks/useLoginManager";

function LoginForm() {
  const {
    handleLogin,
    texts,
    isCaptchaAvailable,
    captchaImage,
    activeIdentifiers,
    resetPasswordLink,
    errors,
  } = useLoginManager();

  const form = useForm<LoginOptions>({
    defaultValues: {
      username: "",
      password: "",
      captcha: "",
    },
    reValidateMode: "onBlur",
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: LoginOptions) => {
    await handleLogin({
      username: data.username,
      password: data.password,
      ...(isCaptchaAvailable && data.captcha && { captcha: data.captcha }),
    });
  };

  // Use helper to determine placeholder based on active identifiers
  const identifierDetails = getIdentifierDetails(
    (activeIdentifiers || undefined) as IdentifierType[] | undefined,
    texts
  );

  // Get SDK errors for specific fields
  const usernameSDKError = getFieldError("username", errors || []);
  const passwordSDKError = getFieldError("password", errors || []);
  const captchaSDKError = getFieldError("captcha", errors || []);

  // Get general errors (not field-specific)
  const generalErrors =
    errors?.filter((error) => !error.field || error.field === null) || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Display general errors */}
        {generalErrors.length > 0 && (
          <div className="space-y-3 mb-4">
            {generalErrors.map((error, index) => (
              <ULThemeAlert key={index} variant="destructive">
                <ULThemeAlertTitle>
                  {error.message || "An error occurred"}
                </ULThemeAlertTitle>
              </ULThemeAlert>
            ))}
          </div>
        )}

        <FormField
          control={form.control}
          name="username"
          rules={{
            required: "Identifier is required",
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemeFloatingLabelField
                {...field}
                label={identifierDetails.label}
                type={identifierDetails.type}
                autoComplete={identifierDetails.autoComplete}
                autoFocus
                error={!!fieldState.error || !!usernameSDKError}
              />
              <ULThemeFormMessage
                sdkError={usernameSDKError}
                hasFormError={!!fieldState.error}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          rules={{
            required: "Password is required",
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemePasswordField
                {...field}
                label={
                  texts?.passwordPlaceholder
                    ? `${texts.passwordPlaceholder}*`
                    : "Password*"
                }
                autoComplete="current-password"
                error={!!fieldState.error || !!passwordSDKError}
              />
              <ULThemeFormMessage
                sdkError={passwordSDKError}
                hasFormError={!!fieldState.error}
              />
            </FormItem>
          )}
        />

        {isCaptchaAvailable && captchaImage && (
          <Captcha
            name="captcha"
            control={form.control}
            label={
              texts?.captchaCodePlaceholder
                ? `${texts.captchaCodePlaceholder}*`
                : "Enter the code shown above*"
            }
            imageUrl={captchaImage}
            imageAltText="CAPTCHA challenge"
            sdkError={captchaSDKError}
            rules={{
              required: "Please complete the CAPTCHA",
            }}
          />
        )}

        {resetPasswordLink && (
          <div className="mb-4 mt-2 text-left">
            <ULThemeLink href={resetPasswordLink}>
              {texts?.forgotPasswordText || "Forgot password?"}
            </ULThemeLink>
          </div>
        )}

        <ULThemeButton type="submit" className="w-full" disabled={isSubmitting}>
          {texts?.buttonText || "Continue"}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default LoginForm;
