import { useForm } from "react-hook-form";

import type { Error, LoginPayloadOptions } from "@auth0/auth0-acul-js/types";

import Captcha from "@/components/Captcha/index";
import { ULThemeFloatingLabelField } from "@/components/form/ULThemeFloatingLabelField";
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeLink from "@/components/ULThemeLink";
import { ULThemePasswordField } from "@/components/ULThemePasswordField";
import { ULThemePrimaryButton } from "@/components/ULThemePrimaryButton";
import { useCaptcha } from "@/hooks/useCaptcha";
import { getFieldError } from "@/utils/helpers/errorUtils";
import { getIdentifierDetails } from "@/utils/helpers/identifierUtils";

import { useLoginManager } from "../hooks/useLoginManager";

function LoginForm() {
  const { handleLogin, screen, transaction, loginInstance, locales } =
    useLoginManager();

  const form = useForm<LoginPayloadOptions>({
    defaultValues: {
      username: "",
      password: "",
      captcha: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Destructure from screen and transaction
  const { texts, isCaptchaAvailable, captcha, resetPasswordLink } = screen;
  const { isForgotPasswordEnabled, passwordPolicy } = transaction;

  // Get computed values from SDK instance
  const errors = loginInstance.getErrors();
  const loginIdentifiers = loginInstance.getLoginIdentifiers() || [];

  // Handle text fallbacks using locales
  const buttonText = texts?.buttonText || locales.form.button;
  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : `${locales.form.fields.captcha.label}*`;
  const forgotPasswordText =
    texts?.forgotPasswordText || locales.form.forgotPassword;

  // Use getIdentifierDetails pattern for username label
  const {
    label: usernameLabel,
    type: usernameType,
    autoComplete: usernameAutoComplete,
  } = getIdentifierDetails(loginIdentifiers, texts);

  const passwordLabel = texts?.passwordPlaceholder
    ? `${texts.passwordPlaceholder}*`
    : `${locales.form.fields.password.label}*`;

  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

  const usernameSDKError =
    getFieldError("username", errors) || getFieldError("email", errors);

  const passwordSDKError = getFieldError("password", errors);
  const captchaSDKError = getFieldError("captcha", errors);

  // Setup captcha with useCaptcha hook
  const { captchaConfig, captchaProps } = useCaptcha(
    captcha || undefined,
    captchaLabel
  );

  // Proper submit handler with form data
  const onSubmit = async (data: LoginPayloadOptions): Promise<void> => {
    await handleLogin(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* General alerts at the top */}
        {generalErrors.length > 0 && (
          <div className="space-y-3 mb-4">
            {generalErrors.map((error: Error, index: number) => (
              <ULThemeAlert key={index} variant="destructive">
                <ULThemeAlertTitle>{error.message}</ULThemeAlertTitle>
              </ULThemeAlert>
            ))}
          </div>
        )}

        {/* Username/Email input field */}
        <FormField
          control={form.control}
          name="username"
          rules={{
            required: locales.form.fields.username.required,
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemeFloatingLabelField
                {...field}
                label={usernameLabel}
                type={usernameType}
                autoFocus={true}
                autoComplete={usernameAutoComplete}
                error={!!fieldState.error || !!usernameSDKError}
              />
              <ULThemeFormMessage
                sdkError={usernameSDKError}
                hasFormError={!!fieldState.error}
              />
            </FormItem>
          )}
        />

        {/* Password input field */}
        <FormField
          control={form.control}
          name="password"
          rules={{
            required: locales.form.fields.password.required,
            minLength: passwordPolicy?.minLength
              ? {
                  value: passwordPolicy.minLength,
                  message: locales.form.fields.password.minLength.replace(
                    "{minLength}",
                    String(passwordPolicy.minLength)
                  ),
                }
              : undefined,
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemePasswordField
                {...field}
                label={passwordLabel}
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
        {isCaptchaAvailable && captchaConfig && (
          <Captcha
            control={form.control}
            name="captcha"
            captcha={captchaConfig}
            {...captchaProps}
            sdkError={captchaSDKError}
            rules={{
              required: locales.form.fields.captcha.required,
            }}
          />
        )}

        {/* Forgot Password link */}
        {isForgotPasswordEnabled && resetPasswordLink && (
          <div className="mb-4 mt-2 text-left">
            <ULThemeLink href={resetPasswordLink}>
              {forgotPasswordText}
            </ULThemeLink>
          </div>
        )}

        {/* Submit button */}
        <ULThemePrimaryButton
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {buttonText}
        </ULThemePrimaryButton>
      </form>
    </Form>
  );
}

export default LoginForm;
