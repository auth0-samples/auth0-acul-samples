import { useForm } from "react-hook-form";

import { useErrors } from "@auth0/auth0-acul-react/mfa-sms-enrollment";
import type { ErrorItem } from "@auth0/auth0-acul-react/types";

import {
  ULThemeFloatingLabelField,
  ULThemeFormMessage,
} from "@/components/form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import ULThemeCountryCodePicker from "@/components/ULThemeCountryCodePicker";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import { transformAuth0CountryCode } from "@/utils/helpers/countryUtils";

import { useMfaSmsEnrollmentManager } from "../hooks/useMfaSmsEnrollmentManager";

interface MfaSmsEnrollmentFormData {
  phone: string;
}

function MfaSmsEnrollmentForm() {
  const {
    handleContinueEnrollment,
    handlePickCountryCode,
    texts,
    locales,
    countryCode,
    countryPrefix,
  } = useMfaSmsEnrollmentManager();

  // Initialize the form using react-hook-form
  const form = useForm<MfaSmsEnrollmentFormData>({
    defaultValues: {
      phone: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Use locales as fallback to SDK texts
  const buttonText = texts?.buttonText || locales?.form?.continueButtonText;
  const phoneLabelText = texts?.placeholder || locales?.form?.phoneLabel;
  const sendingText = locales?.form?.sendingText;
  const selectCountryPlaceholder = locales?.form?.selectCountryPlaceholder;

  const { errors, hasError, dismiss } = useErrors();

  // Get field-specific SDK errors
  const phoneSDKError = errors.byField("phone")[0]?.message;

  // Get general errors (not field-specific)
  const generalErrors: ErrorItem[] = errors
    .byType("auth0")
    .filter((err) => !err.field);

  const onSubmit = async (formData: MfaSmsEnrollmentFormData) => {
    await handleContinueEnrollment(formData.phone);
  };
  const handleCountryCodeClick = async () => {
    await handlePickCountryCode();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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

        {/* Country Code Picker */}
        <ULThemeCountryCodePicker
          selectedCountry={transformAuth0CountryCode(
            countryCode,
            countryPrefix
          )}
          onClick={handleCountryCodeClick}
          fullWidth
          placeholder={selectCountryPlaceholder}
        />

        {/* Phone Number input field */}
        <FormField
          control={form.control}
          name="phone"
          rules={{
            required: locales?.errors?.phoneRequired,
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemeFloatingLabelField
                {...field}
                label={phoneLabelText}
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                autoFocus
                error={!!fieldState.error || !!phoneSDKError}
              />
              <ULThemeFormMessage
                sdkError={phoneSDKError}
                hasFormError={!!fieldState.error}
              />
            </FormItem>
          )}
        />

        {/* Submit button */}
        <ULThemeButton
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? sendingText : buttonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default MfaSmsEnrollmentForm;
