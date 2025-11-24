import { useForm } from "react-hook-form";

import type {
  ErrorItem,
  PasswordValidationResult,
} from "@auth0/auth0-acul-react/types";

import { ULThemeFormMessage } from "@/components/form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import { ULThemePasswordField } from "@/components/ULThemePasswordField";
import { ULThemePasswordValidator } from "@/components/ULThemePasswordValidator";

import { useResetPasswordManager } from "../hooks/useResetPasswordManager";

interface resetPasswordFormData {
  new_password: string;
  confirm_password: string;
}

/**
 * ResetPasswordForm Component
 *
 * This component renders the form for the resetPassword screen.
 * It includes fields for new password, and confirm new password,
 * along with error handling.
 */
function ResetPasswordForm() {
  // Extract necessary methods and properties from the custom hook
  const {
    handleSubmitPassword,
    texts,
    locales,
    useErrors,
    usePasswordValidation,
  } = useResetPasswordManager();
  const { errors, hasError, dismiss } = useErrors;

  // Initialize the form using react-hook-form
  const form = useForm<resetPasswordFormData>({
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;

  // Get password validation rules from Auth0 SDK
  const passwordValue = watch("new_password");

  const {
    isValid: isPasswordValid,
    results: passwordResults,
  }: PasswordValidationResult = usePasswordValidation(passwordValue);

  // Handle text fallbacks for button and field labels
  const buttonText = texts?.buttonText || locales.form.buttonText;
  const passwordLabel =
    texts?.passwordPlaceholder || locales.form.fields.password.labelText;
  const confirmPasswordLabel =
    texts?.reEnterpasswordPlaceholder ||
    locales.form.fields.confirmPassword.labelText;
  const passwordSecurityText =
    texts?.passwordSecurityText || locales.form.passwordSecurity;

  // Extract general errors (not field-specific) from the SDK
  const generalErrors: ErrorItem[] =
    errors.byType("auth0")?.filter((error) => {
      return !error.field || error.field === null;
    }) || [];

  // Extract field-specific errors for password
  const passwordSDKError = errors.byField("password")[0]?.message;

  /**
   * Handles form submission.
   *
   * @param data - The form data containing password, and confirm password.
   */
  const onSubmit = async (data: resetPasswordFormData) => {
    await handleSubmitPassword(data.new_password, data.confirm_password);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* General error messages */}
        {hasError && generalErrors.length > 0 && (
          <div className="space-y-3 mb-4">
            {generalErrors.map((error: ErrorItem) => (
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

        {/* New Password input field */}
        <FormField
          control={form.control}
          name="new_password"
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
                label={`${passwordLabel}*`}
                autoComplete="new-password"
                error={!!fieldState.error || !!passwordSDKError}
              />
              <ULThemeFormMessage hasFormError={!!fieldState.error} />
            </FormItem>
          )}
        />

        {/* Re-Enter Password input field */}
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemePasswordField
                {...field}
                label={`${confirmPasswordLabel}*`}
                autoComplete="new-password"
                error={!!fieldState.error || !!passwordSDKError}
              />
              <ULThemeFormMessage
                sdkError={passwordSDKError}
                hasFormError={!!fieldState.error}
              />
            </FormItem>
          )}
        />

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

export default ResetPasswordForm;
