import { useForm } from "react-hook-form";

import {
  type Error,
  type SignupPasswordOptions,
  usePasswordValidation,
} from "@auth0/auth0-acul-react/types";

import Captcha from "@/components/Captcha";
import { ULThemeFloatingLabelField } from "@/components/form/ULThemeFloatingLabelField";
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import { ULThemePasswordField } from "@/components/ULThemePasswordField";
import { ULThemePasswordValidator } from "@/components/ULThemePasswordValidator";
import { getFieldError } from "@/utils/helpers/errorUtils";
import {
  createPasswordValidator,
  shouldShowValidation,
} from "@/utils/validations";

import { useSignupPasswordManager } from "../hooks/useSignupPasswordManager";

function SignupPasswordForm() {
  const {
    handleSignupPassword,
    isCaptchaAvailable,
    signupPassword,
    texts,
    captchaImage,
    errors,
  } = useSignupPasswordManager();

  const form = useForm<SignupPasswordOptions>({
    defaultValues: {
      email: "",
      username: "",
      phone: "",
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
  const validationRules = usePasswordValidation(passwordValue);

  // Show validation when user has typed something
  const showPasswordValidation = shouldShowValidation(passwordValue);

  // Custom validation function for React Hook Form
  const validatePasswordRule = createPasswordValidator(
    validationRules,
    showPasswordValidation
  );

  // Get user data from screen data for readonly fields
  const screenData = signupPassword?.screen?.data;
  const userEmail = screenData?.email;
  const userPhone = screenData?.phone;
  const userUsername = screenData?.username;

  // Handle text fallbacks
  const buttonText = texts?.buttonText || "Continue";
  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : "CAPTCHA*";
  const passwordLabel = texts?.passwordPlaceholder
    ? `${texts.passwordPlaceholder}*`
    : "Password*";
  const captchaImageAlt = "CAPTCHA challenge";

  // Get general errors (not field-specific) and errors for hidden fields
  const visibleFields = ["password", "captcha"];
  if (userEmail) visibleFields.push("email");
  if (userPhone) visibleFields.push("phone", "phone_number");
  if (userUsername) visibleFields.push("username");

  const generalErrors =
    errors?.filter((error: Error) => {
      // Include errors with no field or null field
      if (!error.field || error.field === null) return true;

      // Include field errors for non-visible fields
      return !visibleFields.includes(error.field);
    }) || [];

  // Get field-specific errors
  const passwordError = getFieldError("password", errors || []);
  const captchaSDKError = getFieldError("captcha", errors || []);

  // Simplified submit handler
  const onSubmit = async (data: SignupPasswordOptions) => {
    const submitData: SignupPasswordOptions = {
      ...data,
      email: userEmail,
      username: userUsername,
      phone: userPhone,
    };
    await handleSignupPassword(submitData);
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

        {/* Readonly email field */}
        {userEmail && (
          <ULThemeFloatingLabelField
            id="signup-email-field"
            label={texts?.emailPlaceholder || "Email"}
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
            label={texts?.phonePlaceholder || "Phone"}
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
            label={texts?.usernamePlaceholder || "Username"}
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
            validate: validatePasswordRule,
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

        {/* CAPTCHA Box */}
        {isCaptchaAvailable && (
          <Captcha
            control={form.control}
            name="captcha"
            label={captchaLabel}
            imageUrl={captchaImage || ""}
            imageAltText={captchaImageAlt}
            sdkError={captchaSDKError}
            rules={{
              required: "Please complete the CAPTCHA",
            }}
          />
        )}

        {/* Password Validation Rules */}
        <ULThemePasswordValidator
          validationRules={validationRules}
          passwordSecurityText={
            texts?.passwordSecurityText || "Your password must contain:"
          }
          show={showPasswordValidation}
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
