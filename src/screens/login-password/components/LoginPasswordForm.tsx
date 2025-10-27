import { useForm } from "react-hook-form";

import type {
  Error,
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
import { getFieldError } from "@/utils/helpers/errorUtils";

import { useLoginPasswordManager } from "../hooks/useLoginPasswordManager";

function LoginPasswordForm() {
  const {
    texts,
    locales,
    data,
    errors,
    isCaptchaAvailable,
    captcha,
    editIdentifierLink,
    resetPasswordLink,
    passwordPolicy,
    handleLoginPassword,
  } = useLoginPasswordManager();

  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : locales?.loginPasswordForm?.captchaLabel;

  const { captchaConfig, captchaProps, captchaValue } = useCaptcha(
    captcha || undefined,
    captchaLabel
  );

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

  // Proper submit handler with form data
  const onSubmit = async (data: LoginPasswordOptions) => {
    await handleLoginPassword({
      username: data.username,
      password: data.password,
      captcha: isCaptchaAvailable && captchaValue ? captchaValue : undefined,
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
                label={
                  texts?.passwordPlaceholder ||
                  locales?.loginPasswordForm?.passwordLabel
                }
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
              {texts?.forgotPasswordText ||
                locales?.loginPasswordForm?.forgotPasswordLinkText}
            </ULThemeLink>
          </div>
        )}

        <ULThemeButton type="submit" className="w-full" disabled={isSubmitting}>
          {texts?.buttonText || locales?.loginPasswordForm?.continueButtonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default LoginPasswordForm;
