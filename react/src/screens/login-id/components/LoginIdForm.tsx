import { useForm } from "react-hook-form";

import type {
  Error,
  IdentifierType,
  LoginOptions,
} from "@auth0/auth0-acul-react/types";

import Captcha from "@/components/Captcha";
import { ULThemeFloatingLabelField } from "@/components/form/ULThemeFloatingLabelField";
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import ULThemeCountryCodePicker from "@/components/ULThemeCountryCodePicker";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeLink from "@/components/ULThemeLink";
import {
  isPhoneNumberSupported,
  transformAuth0CountryCode,
} from "@/utils/helpers/countryUtils";
import { getFieldError } from "@/utils/helpers/errorUtils";
import { getIdentifierDetails } from "@/utils/helpers/identifierUtils";

import { useLoginIdManager } from "../hooks/useLoginIdManager";

function LoginIdForm() {
  const {
    texts,
    errors,
    isCaptchaAvailable,
    captchaImage,
    activeIdentifiers,
    resetPasswordLink,
    countryCode,
    countryPrefix,
    handlePickCountryCode,
    handleLoginId,
  } = useLoginIdManager();

  const form = useForm<LoginOptions>({
    defaultValues: {
      username: "",
      captcha: "",
    },
    reValidateMode: "onBlur",
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Proper submit handler with form data
  const onSubmit = async (data: LoginOptions) => {
    await handleLoginId({
      username: data.username,
      ...(isCaptchaAvailable && data.captcha && { captcha: data.captcha }),
    });
  };

  // Use helper to determine placeholder based on active identifiers
  const identifierDetails = getIdentifierDetails(
    (activeIdentifiers || undefined) as IdentifierType[] | undefined,
    texts
  );

  const shouldShowCountryPicker = isPhoneNumberSupported(
    activeIdentifiers || []
  );

  // Get SDK errors for specific fields
  const usernameSDKError = getFieldError("username", errors || []);
  const captchaSDKError = getFieldError("captcha", errors || []);

  // Get general errors (not field-specific)
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
                  {error.message || "An error occurred"}
                </ULThemeAlertTitle>
              </ULThemeAlert>
            ))}
          </div>
        )}

        {/* Country Code Picker - only show if phone numbers are supported */}
        {shouldShowCountryPicker && (
          <div className="mb-4">
            <ULThemeCountryCodePicker
              selectedCountry={transformAuth0CountryCode(
                countryCode,
                countryPrefix
              )}
              onClick={handlePickCountryCode}
              fullWidth
              placeholder="Select Country"
            />
          </div>
        )}

        {/* Username Identifier input field */}
        <FormField
          control={form.control}
          name="username"
          rules={{
            required: "Identifier is required",
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

        {/* CAPTCHA Box */}
        {isCaptchaAvailable && captchaImage && (
          <Captcha
            name="captcha"
            control={form.control}
            label={
              texts?.captchaCodePlaceholder
                ? `${texts.captchaCodePlaceholder}*`
                : "Enter the code shown above*"
            }
            imageUrl={captchaImage}
            imageAltText="CAPTCHA challenge"
            sdkError={captchaSDKError}
            rules={{
              required: "Please complete the CAPTCHA",
            }}
          />
        )}

        {resetPasswordLink && (
          <div className="mb-4 mt-2 text-left">
            <ULThemeLink href={resetPasswordLink}>
              {texts?.forgotPasswordText || "Forgot password?"}
            </ULThemeLink>
          </div>
        )}

        <ULThemeButton type="submit" className="w-full" disabled={isSubmitting}>
          {texts?.buttonText || "Continue"}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default LoginIdForm;
