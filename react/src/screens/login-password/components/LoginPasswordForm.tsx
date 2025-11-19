import { useForm } from "react-hook-form";

import { useErrors } from "@auth0/auth0-acul-react/login-password";
import type {
  ErrorItem,
  LoginPasswordOptions,
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

import { useLoginPasswordManager } from "../hooks/useLoginPasswordManager";

function LoginPasswordForm() {
  const {
    texts,
    locales,
    data,
    captcha,
    editIdentifierLink,
    resetPasswordLink,
    passwordPolicy,
    isCaptchaAvailable,
    handleLoginPassword,
  } = useLoginPasswordManager();

  const form = useForm<LoginPasswordOptions>({
    defaultValues: {
      username: data?.username || "",
      password: "",
      captcha: "",
    },
    reValidateMode: "onBlur",
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Use locales as fallback to SDK texts
  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : locales?.loginPasswordForm?.captchaLabel;
  const passwordLabel =
    texts?.passwordPlaceholder || locales?.loginPasswordForm?.passwordLabel;
  const forgotPasswordLinkText =
    texts?.forgotPasswordText ||
    locales?.loginPasswordForm?.forgotPasswordLinkText;
  const continueButtonText =
    texts?.buttonText || locales?.loginPasswordForm?.continueButtonText;

  const { captchaConfig, captchaProps, captchaValue } = useCaptcha(
    captcha || undefined,
    captchaLabel
  );

  const { errors, hasError, dismiss } = useErrors();

  // Get field-specific SDK errors
  const passwordSDKError = errors.byField("password")[0]?.message;
  const captchaSDKError = errors.byField("captcha")[0]?.message;

  // Get general errors (not field-specific)
  const generalErrors: ErrorItem[] = errors
    .byKind("auth0")
    .filter((err) => !err.field);

  // Proper submit handler with form data
  const onSubmit = async (data: LoginPasswordOptions) => {
    await handleLoginPassword({
      username: data.username,
      password: data.password,
      captcha: isCaptchaAvailable && captchaValue ? captchaValue : undefined,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Display general errors */}
        {hasError && generalErrors.length > 0 && (
          <div className="space-y-3 mb-4">
            {generalErrors.map((error) => (
              <ULThemeAlert
                key={error.id}
                variant="destructive"
                onDismiss={() => dismiss(error.id)}
              >
                <ULThemeAlertTitle>
                  {error.message || locales?.errors?.errorOccurred}
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
                    {texts?.editEmailText ||
                      locales?.loginPasswordForm?.editText}
                  </ULThemeLink>
                }
                className="pr-4"
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
            required: locales?.errors?.passwordRequired,
            maxLength: {
              value: 200,
              message: locales?.errors?.max200CharsAllowed,
            },
            minLength: passwordPolicy?.minLength
              ? {
                  value: passwordPolicy.minLength,
                  message: `${locales?.errors?.passwordMinLength} ${passwordPolicy.minLength} ${locales?.errors?.charactersText}`,
                }
              : undefined,
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemePasswordField
                {...field}
                label={passwordLabel}
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

        {/* Captcha Field */}
        {isCaptchaAvailable && captchaConfig && (
          <Captcha
            control={form.control}
            name="captcha"
            captcha={captchaConfig}
            {...captchaProps}
            sdkError={captchaSDKError}
            rules={{
              required: locales?.errors?.captchaCompletionRequired,
              maxLength: {
                value: 15,
                message: locales?.errors?.captchaTooLong,
              },
            }}
          />
        )}

        {resetPasswordLink && (
          <div className="mb-4 mt-2 text-left">
            <ULThemeLink href={resetPasswordLink}>
              {forgotPasswordLinkText}
            </ULThemeLink>
          </div>
        )}

        <ULThemeButton type="submit" className="w-full" disabled={isSubmitting}>
          {continueButtonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default LoginPasswordForm;
