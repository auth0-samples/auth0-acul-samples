import { useForm } from "react-hook-form";

import type { Error } from "@auth0/auth0-acul-react";

import { ULThemeFormMessage } from "@/components/form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import { ULThemePasswordField } from "@/components/ULThemePasswordField";
import { getFieldError } from "@/utils/helpers/errorUtils";

import { useResetPasswordManager } from "../hooks/useResetPasswordManager";

interface resetPasswordFormData {
  new_password: string;
  confirm_password: string;
}

/**
 * IdentifierForm Component
 *
 * This component renders the login form for the resetPassword screen.
 * It includes fields for new password, and confirm new password,
 * along with error handling and support for editing identifiers.
 */
function IdentifierForm() {
  // Extract necessary methods and properties from the custom hook
  const { handleSubmitPassword, errors, texts } = useResetPasswordManager();

  // Initialize the form using react-hook-form
  const form = useForm<resetPasswordFormData>({
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Handle text fallbacks for button and field labels
  const buttonText = texts?.buttonText || "Reset Password";

  // Extract general errors (not field-specific) from the SDK
  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

  // Extract field-specific errors for password
  const passwordSDKError = getFieldError("password", errors);

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {/* General error messages */}
        {generalErrors.length > 0 && (
          <div className="space-y-3 mb-4">
            {generalErrors.map((error: Error, index: number) => (
              <ULThemeAlert key={index}>
                <ULThemeAlertTitle>{error.message}</ULThemeAlertTitle>
              </ULThemeAlert>
            ))}
          </div>
        )}

        {/* New Password input field */}
        <FormField
          control={form.control}
          name="new_password"
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemePasswordField
                isRequired={true}
                {...field}
                label={texts?.passwordPlaceholder || "New Password"}
                autoComplete="current-password"
                error={!!fieldState.error || !!passwordSDKError}
              />
              <ULThemeFormMessage hasFormError={!!fieldState.error} />
            </FormItem>
          )}
        />

        {/* New Password input field */}
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemePasswordField
                isRequired={true}
                {...field}
                label={
                  texts?.reEnterpasswordPlaceholder || "Re-enter new password"
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

        {/* Submit button */}
        <ULThemeButton type="submit" className="w-full" disabled={isSubmitting}>
          {buttonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default IdentifierForm;
