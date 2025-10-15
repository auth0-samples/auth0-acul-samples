import { useForm } from "react-hook-form";

import type { Error } from "@auth0/auth0-acul-react";
import type { LoginPasswordOptions } from "@auth0/auth0-acul-react/login-password";

import Captcha from "@/components/Captcha";
import { ULThemeFloatingLabelField } from "@/components/form/ULThemeFloatingLabelField";
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeLink from "@/components/ULThemeLink";
import { ULThemePasswordField } from "@/components/ULThemePasswordField";
import { getFieldError } from "@/utils/helpers/errorUtils";

import { useLoginPasswordManager } from "../hooks/useLoginPasswordManager";

function LoginPasswordForm() {
  const {
    texts,
    data,
    errors,
    isCaptchaAvailable,
    captchaImage,
    editIdentifierLink,
    resetPasswordLink,
    passwordPolicy,
    handleLoginPassword,
  } = useLoginPasswordManager();

  const form = useForm<LoginPasswordOptions>({
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

  // Proper submit handler with form data
  const onSubmit = async (data: LoginPasswordOptions) => {
    await handleLoginPassword({
      username: data.username,
      password: data.password,
      ...(isCaptchaAvailable && data.captcha && { captcha: data.captcha }),
    });
  };

  // Extract field-specific errors for password, and CAPTCHA
  const passwordSDKError = getFieldError("password", errors || []);
  const captchaSDKError = getFieldError("captcha", errors || []);

  // Extract general errors (not field-specific) from the SDK
  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Display general errors */}
        {generalErrors.length > 0 && (
          <div className="space-y-3 mb-4">
            {generalErrors.map((error: Error, index: number) => (
              <ULThemeAlert key={index} variant="destructive">
                <ULThemeAlertTitle>
                  {error.message || "An error occurred"}
                </ULThemeAlertTitle>
              </ULThemeAlert>
            ))}
          </div>
        )}

        {/* Username Identifier input field with pre-filled value */}
        <FormField
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemeFloatingLabelField
                {...field}
                label={""}
                value={data?.username || ""}
                error={!!fieldState.error}
                readOnly={true}
                endAdornment={
                  <ULThemeLink href={editIdentifierLink || ""}>
                    {texts?.editEmailText || "Edit"}
                  </ULThemeLink>
                }
                className="pr-[16px]"
              />
              <ULThemeFormMessage hasFormError={!!fieldState.error} />
            </FormItem>
          )}
        />

        {/* Password input field */}
        <FormField
          control={form.control}
          name="password"
          rules={{
            required: "Password is required",
            maxLength: {
              value: 200,
              message: "Maximum 200 characters allowed",
            },
            minLength: passwordPolicy?.minLength
              ? {
                  value: passwordPolicy.minLength,
                  message: `Password must be at least ${passwordPolicy.minLength} characters`,
                }
              : undefined,
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemePasswordField
                {...field}
                label={texts?.passwordPlaceholder || "Password"}
                autoFocus={true}
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

        {/* CAPTCHA Box */}
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
            imageAltText={"CAPTCHA challenge"}
            className="mb-4"
            sdkError={captchaSDKError}
            rules={{
              required: "Please complete the CAPTCHA",
              maxLength: {
                value: 15,
                message: "CAPTCHA too long",
              },
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

export default LoginPasswordForm;
