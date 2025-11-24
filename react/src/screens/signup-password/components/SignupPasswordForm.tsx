import { useForm } from "react-hook-form";

import {
  useErrors,
  usePasswordValidation,
} from "@auth0/auth0-acul-react/signup-password";
import type {
  ErrorItem,
  PasswordValidationResult,
  SignupPasswordOptions,
} from "@auth0/auth0-acul-react/types";

import Captcha from "@/components/Captcha/index";
import { ULThemeFloatingLabelField } from "@/components/form/ULThemeFloatingLabelField";
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import { ULThemePasswordField } from "@/components/ULThemePasswordField";
import { ULThemePasswordValidator } from "@/components/ULThemePasswordValidator";
import { useCaptcha } from "@/hooks/useCaptcha";

import { useSignupPasswordManager } from "../hooks/useSignupPasswordManager";

function SignupPasswordForm() {
  const {
    handleSignupPassword,
    isCaptchaAvailable,
    signupPassword,
    texts,
    captcha,
    locales,
  } = useSignupPasswordManager();

  const { errors, hasError, dismiss } = useErrors();

  const form = useForm<SignupPasswordOptions>({
    defaultValues: {
      email: "",
      username: "",
      phoneNumber: "",
      password: "",
      captcha: "",
    },
    reValidateMode: "onBlur",
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;

  // Get password validation rules from Auth0 SDK
  const passwordValue = watch("password");
  const {
    isValid: isPasswordValid,
    results: passwordResults,
  }: PasswordValidationResult = usePasswordValidation(passwordValue);

  // Get user data from screen data for readonly fields
  const screenData = signupPassword?.screen?.data;
  const userEmail = screenData?.email;
  const userPhone = screenData?.phoneNumber;
  const userUsername = screenData?.username;

  // Use locale strings with fallback to SDK texts
  const buttonText = texts?.buttonText || locales.form.button;
  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : `${locales.form.fields.captcha.label}*`;
  const passwordLabel = texts?.passwordPlaceholder
    ? `${texts.passwordPlaceholder}*`
    : `${locales.form.fields.password.label}*`;
  const passwordSecurityText =
    texts?.passwordSecurityText || locales.form.passwordSecurity;
  const emailLabel = texts?.emailPlaceholder || locales.form.fields.email.label;
  const phoneLabel = texts?.phonePlaceholder || locales.form.fields.phone.label;
  const usernameLabel =
    texts?.usernamePlaceholder || locales.form.fields.username.label;

  // Setup captcha with useCaptcha hook
  const { captchaConfig, captchaProps } = useCaptcha(
    captcha || undefined,
    captchaLabel
  );

  // Get general errors (not field-specific) and errors for hidden fields
  const visibleFields = ["password", "captcha"];
  if (userEmail) visibleFields.push("email");
  if (userPhone) visibleFields.push("phone", "phone_number");
  if (userUsername) visibleFields.push("username");

  const generalErrors: ErrorItem[] = errors.byType("auth0").filter((error) => {
    // Include errors with no field or null field
    if (!error.field || error.field === null) return true;

    // Include field errors for non-visible fields
    return !visibleFields.includes(error.field);
  });

  // Get field-specific errors
  const passwordError = errors.byField("password")[0]?.message;
  const captchaSDKError = errors.byField("captcha")[0]?.message;

  // Simplified submit handler
  const onSubmit = async (data: SignupPasswordOptions) => {
    const submitData: SignupPasswordOptions = {
      ...data,
      email: userEmail,
      username: userUsername,
      phoneNumber: userPhone,
    };
    await handleSignupPassword(submitData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* General alerts at the top */}
        {hasError && generalErrors.length > 0 && (
          <div className="space-y-3 mb-4">
            {generalErrors.map((error) => (
              <ULThemeAlert
                key={error.id}
                variant="destructive"
                onDismiss={() => dismiss(error.id)}
              >
                <ULThemeAlertTitle>{error.message}</ULThemeAlertTitle>
              </ULThemeAlert>
            ))}
          </div>
        )}

        {/* Readonly email field */}
        {userEmail && (
          <ULThemeFloatingLabelField
            id="signup-email-field"
            label={emailLabel}
            type="email"
            value={userEmail}
            readOnly
            disabled
          />
        )}

        {/* Readonly phone field */}
        {userPhone && (
          <ULThemeFloatingLabelField
            id="signup-phone-field"
            label={phoneLabel}
            type="tel"
            value={userPhone}
            readOnly
            disabled
          />
        )}

        {/* Readonly username field */}
        {userUsername && (
          <ULThemeFloatingLabelField
            id="signup-username-field"
            label={usernameLabel}
            type="text"
            value={userUsername}
            readOnly
            disabled
          />
        )}

        {/* Password field */}
        <FormField
          control={form.control}
          name="password"
          rules={{
            required: locales.form.fields.password.required,
            validate: (value) => {
              if (!value) return locales.form.fields.password.required;
              if (!isPasswordValid)
                return locales.form.fields.password.doesNotMeetRequirements;
              return true;
            },
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemePasswordField
                {...field}
                label={passwordLabel}
                error={!!fieldState.error || !!passwordError}
                autoFocus={true}
              />
              <ULThemeFormMessage
                sdkError={passwordError}
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
              required: locales.form.fields.captcha.required,
            }}
          />
        )}

        {/* Password Validation Rules */}
        <ULThemePasswordValidator
          validationRules={passwordResults}
          passwordSecurityText={passwordSecurityText}
          show={!!passwordValue}
          className="mb-4"
        />

        {/* Submit button */}
        <ULThemeButton type="submit" className="w-full" disabled={isSubmitting}>
          {buttonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default SignupPasswordForm;
