import { useForm } from "react-hook-form";

import type {
  Error,
  IdentifierType,
  LoginPayloadOptions,
} from "@auth0/auth0-acul-react/types";

import Captcha from "@/components/Captcha/index";
import { ULThemeFloatingLabelField } from "@/components/form/ULThemeFloatingLabelField";
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeLink from "@/components/ULThemeLink";
import { ULThemePasswordField } from "@/components/ULThemePasswordField";
import { useCaptcha } from "@/hooks/useCaptcha";
import { getFieldError } from "@/utils/helpers/errorUtils";
import { getIdentifierDetails } from "@/utils/helpers/identifierUtils";

import { useLoginManager } from "../hooks/useLoginManager";

function LoginForm() {
  const {
    handleLogin,
    texts,
    locales,
    isCaptchaAvailable,
    captcha,
    activeIdentifiers,
    resetPasswordLink,
    errors,
  } = useLoginManager();

  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : locales?.loginForm?.captchaLabel;

  const { captchaConfig, captchaProps, captchaValue } = useCaptcha(
    captcha || undefined,
    captchaLabel
  );

  const form = useForm<LoginPayloadOptions>({
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

  const onSubmit = async (data: LoginPayloadOptions) => {
    await handleLogin({
      username: data.username,
      password: data.password,
      captcha: isCaptchaAvailable && captchaValue ? captchaValue : undefined,
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
            {generalErrors.map((error: Error, index: number) => (
              <ULThemeAlert key={index} variant="destructive">
                <ULThemeAlertTitle>
                  {error.message || locales?.errors?.errorOccurred}
                </ULThemeAlertTitle>
              </ULThemeAlert>
            ))}
          </div>
        )}

        <FormField
          control={form.control}
          name="username"
          rules={{
            required: locales?.errors?.identifierRequired,
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
            required: locales?.errors?.passwordRequired,
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemePasswordField
                {...field}
                label={
                  texts?.passwordPlaceholder
                    ? `${texts.passwordPlaceholder}*`
                    : locales?.loginForm?.passwordLabel
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

        {isCaptchaAvailable && captchaConfig && (
          <Captcha
            control={form.control}
            name="captcha"
            captcha={captchaConfig}
            onValidationChange={captchaProps.onValidationChange}
            label={captchaLabel}
            theme={captchaProps.theme}
            sdkError={captchaSDKError}
            rules={{
              required: locales?.errors?.captchaCompletionRequired,
            }}
          />
        )}

        {resetPasswordLink && (
          <div className="mb-4 mt-2 text-left">
            <ULThemeLink href={resetPasswordLink}>
              {texts?.forgotPasswordText ||
                locales?.loginForm?.forgotPasswordLinkText}
            </ULThemeLink>
          </div>
        )}

        <ULThemeButton type="submit" className="w-full" disabled={isSubmitting}>
          {texts?.buttonText || locales?.loginForm?.continueButtonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default LoginForm;
