import { useForm } from "react-hook-form";

import type { Error, LoginPasswordOptions } from "@auth0/auth0-acul-js/types";

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

import { useLoginPasswordManager } from "../hooks/useLoginPasswordManager";

function LoginPasswordForm() {
  const {
    loginPasswordInstance,
    handleLoginPassword,
    screen,
    transaction,
    locales,
  } = useLoginPasswordManager();

  const { texts, data, links, isCaptchaAvailable, captcha, resetPasswordLink } =
    screen;
  const { isForgotPasswordEnabled } = transaction;

  const form = useForm<LoginPasswordOptions>({
    defaultValues: {
      username: data?.username || "",
      password: "",
      captcha: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const errors = loginPasswordInstance.getErrors();
  const passwordPolicy = transaction.passwordPolicy;
  const allowedIdentifiers = transaction.allowedIdentifiers || [];

  const buttonText = texts?.buttonText || locales.form.button;
  const passwordLabelText =
    texts?.passwordPlaceholder || locales.form.fields.password.label;
  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : `${locales.form.fields.captcha.label}*`;
  const forgotPasswordText =
    texts?.forgotPasswordText || locales.form.forgotPassword;
  const editText = texts?.editEmailText || locales.form.fields.username.edit;

  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

  const usernameSDKError =
    getFieldError("username", errors) || getFieldError("email", errors);
  const passwordSDKError = getFieldError("password", errors);
  const captchaSDKError = getFieldError("captcha", errors);

  const { label: usernameLabel, type: usernameType } = getIdentifierDetails(
    allowedIdentifiers,
    texts
  );

  const { captchaConfig, captchaProps } = useCaptcha(
    captcha || undefined,
    captchaLabel
  );

  const onSubmit = async (data: LoginPasswordOptions): Promise<void> => {
    await handleLoginPassword(data);
  };

  const editIdentifierLink = links?.edit_identifier || "";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {generalErrors.length > 0 && (
          <div className="space-y-3 mb-4">
            {generalErrors.map((error: Error, index: number) => (
              <ULThemeAlert key={index} variant="destructive">
                <ULThemeAlertTitle>{error.message}</ULThemeAlertTitle>
              </ULThemeAlert>
            ))}
          </div>
        )}

        <FormField
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemeFloatingLabelField
                {...field}
                label={usernameLabel}
                type={usernameType}
                value={data?.username || ""}
                error={!!fieldState.error || !!usernameSDKError}
                readOnly={true}
                endAdornment={
                  editIdentifierLink ? (
                    <ULThemeLink href={editIdentifierLink}>
                      {editText}
                    </ULThemeLink>
                  ) : undefined
                }
                className="pr-4"
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
                label={passwordLabelText}
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

export default LoginPasswordForm;
