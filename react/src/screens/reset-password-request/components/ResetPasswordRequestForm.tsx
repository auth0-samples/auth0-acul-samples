import { useForm } from "react-hook-form";

import type {
  ErrorItem,
  ResetPasswordRequestOptions,
} from "@auth0/auth0-acul-react/types";

import Captcha from "@/components/Captcha/index";
import {
  ULThemeFloatingLabelField,
  ULThemeFormMessage,
} from "@/components/form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import { useCaptcha } from "@/hooks/useCaptcha";
import { getIdentifierDetails } from "@/utils/helpers/identifierUtils";

import { useResetPasswordRequestManager } from "../hooks/resetPasswordRequestManager";
function ResetPasswordRequestForm() {
  const {
    handleResetPasswordRequest,
    texts,
    isCaptchaAvailable,
    captcha,
    activeIdentifiers,
    useErrors,
    locales,
    inputfield,
  } = useResetPasswordRequestManager();
  const { errors, hasError, dismiss } = useErrors;

  // Initialize the form using react-hook-form
  const form = useForm<ResetPasswordRequestOptions>({
    defaultValues: {
      username: String(inputfield),
      captcha: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const buttonText = texts?.buttonText || locales.form.button;
  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : `${locales.form.fields.captcha.label}*`;
  const identifierDetails = getIdentifierDetails(activeIdentifiers, texts);

  // Extract general errors (not field-specific) from the SDK
  const generalErrors: ErrorItem[] =
    errors.byKind("server")?.filter((error) => {
      return !error.field || error.field === null;
    }) || [];

  const usernameSDKError = errors.byField("username")[0]?.message;
  const captchaSDKError = errors.byField("captcha")[0]?.message;

  const { captchaConfig, captchaProps, captchaValue } = useCaptcha(
    captcha || undefined,
    captchaLabel
  );

  const onSubmit = async (formData: ResetPasswordRequestOptions) => {
    await handleResetPasswordRequest(formData.username, captchaValue);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* General error messages */}
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

        {/* TODO: Implement after pickCountryCode method is available */}
        {/* Country Code Picker - only show if phone numbers are supported */}
        {/* {shouldShowCountryPicker && (
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
        )} */}

        {/* Username or Email or Phone pre-filled input field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemeFloatingLabelField
                {...field}
                label={identifierDetails.label}
                type={identifierDetails.type}
                inputMode="text"
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
            className="mt-2 mb-4"
          />
        )}

        {/* Submit button */}
        <ULThemeButton
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? `${locales.form.submittingState}...` : buttonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default ResetPasswordRequestForm;
