import { useForm } from "react-hook-form";
import type { Error } from "@auth0/auth0-acul-js";

import CaptchaBox from "@/common/CaptchaBox";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import { ULThemePrimaryButton } from "@/components/ULThemePrimaryButton";
import {
  ULThemeFloatingLabelField,
  ULThemeFormMessage,
} from "@/components/form";
import { ULThemePasswordField } from "@/components/ULThemePasswordField";
import { Form, FormField, FormItem } from "@/components/ui/form";

import { getFieldError } from "@/utils/helpers/errorUtils";
import { getIdentifierDetails } from "@/utils/helpers/identifierUtils";
import { rebaseLinkToCurrentOrigin } from "@/utils/helpers/urlUtils";
import { useLoginPasswordManager } from "../hooks/useLoginPasswordManager";

interface LoginPasswordFormData {
  username: string;
  password: string;
  captcha?: string;
}

/**
 * IdentifierForm Component
 *
 * This component renders the login form for the LoginPassword screen.
 * It includes fields for username, password, and CAPTCHA (if required),
 * along with error handling and support for editing identifiers.
 */
function IdentifierForm() {
  // Extract necessary methods and properties from the custom hook
  const {
    links,
    data,
    handleLoginPassword,
    errors,
    isCaptchaAvailable,
    captchaImage,
    resetPasswordLink,
    isForgotPasswordEnabled,
    loginPasswordInstance,
    texts,
  } = useLoginPasswordManager();

  // Initialize the form using react-hook-form
  const form = useForm<LoginPasswordFormData>({
    defaultValues: {
      username: data?.username || "",
      password: "",
      captcha: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Handle text fallbacks for button and field labels
  const buttonText = texts?.buttonText || "Continue";
  const passwordLabelText = texts?.passwordPlaceholder || "Password";
  const captchaLabel = texts?.captchaCodePlaceholder?.concat("*") || "CAPTCHA*";
  const captchaImageAlt = "CAPTCHA challenge"; // Default fallback
  const forgotPasswordText = texts?.forgotPasswordText || "Forgot Password?";

  // Extract general errors (not field-specific) from the SDK
  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

  // Extract field-specific errors for username, password, and CAPTCHA
  const usernameSDKError =
    getFieldError("username", errors) || getFieldError("email", errors);
  const passwordSDKError = getFieldError("password", errors);
  const captchaSDKError = getFieldError("captcha", errors);

  // Get allowed identifiers (e.g., email, username, phone) from the SDK
  const allowedIdentifiers =
    loginPasswordInstance?.transaction?.getAllowedIdentifiers() || [];

  // Get password policy (e.g., minimum length) from the SDK
  const passwordPolicy =
    loginPasswordInstance?.transaction?.getPasswordPolicy();

  // Determine the label and type for the username field based on allowed identifiers
  const { label: usernameLabel, type: usernameType } = getIdentifierDetails(
    allowedIdentifiers,
    texts
  );

  /**
   * Handles form submission.
   *
   * @param data - The form data containing username, password, and optional CAPTCHA.
   */
  const onSubmit = async (data: LoginPasswordFormData) => {
    await handleLoginPassword(data.username, data.password, data.captcha);
  };

  // Rebase the reset password link to the current origin
  const localizedResetPasswordLink =
    resetPasswordLink && rebaseLinkToCurrentOrigin(resetPasswordLink);

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

        {/* Username input field */}
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
                  <ULThemePrimaryButton
                    variant="link"
                    onClick={() => {
                      // Redirect to edit identifier link
                      const editIdentifierLink = links?.edit_identifier;
                      if (editIdentifierLink) {
                        const rebasedLink =
                          rebaseLinkToCurrentOrigin(editIdentifierLink);
                        if (rebasedLink) {
                          window.location.href = rebasedLink;
                        }
                      }
                    }}
                  >
                    {texts?.editEmailText || "Edit"}
                  </ULThemePrimaryButton>
                }
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
        {isCaptchaAvailable &&
          (passwordSDKError || generalErrors.length > 0) && (
            <CaptchaBox
              control={form.control}
              name="captcha"
              label={captchaLabel}
              imageUrl={captchaImage || ""}
              imageAltText={captchaImageAlt}
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

        {/* Forgot Password link */}
        <div className="text-left">
          {isForgotPasswordEnabled && localizedResetPasswordLink && (
            <a
              href={localizedResetPasswordLink}
              className="text-sm text-link font-bold hover:text-link/80 focus:bg-link/15 focus:rounded"
            >
              {forgotPasswordText}
            </a>
          )}
        </div>

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

export default IdentifierForm;
