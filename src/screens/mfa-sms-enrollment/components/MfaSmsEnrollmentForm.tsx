import { useForm } from "react-hook-form";

import type {
  Error,
  TransactionMembers,
} from "@auth0/auth0-acul-react/mfa-sms-enrollment";

import {
  ULThemeFloatingLabelField,
  ULThemeFormMessage,
} from "@/components/form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import ULThemeCountryCodePicker from "@/components/ULThemeCountryCodePicker";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import { transformAuth0CountryCode } from "@/utils/helpers/countryUtils";
import { getFieldError } from "@/utils/helpers/errorUtils";

import { useMfaSmsEnrollmentManager } from "../hooks/useMfaSmsEnrollmentManager";

interface MfaSmsEnrollmentFormData {
  phone: string;
}

function MfaSmsEnrollmentForm() {
  const {
    handleContinueEnrollment,
    handlePickCountryCode,
    errors,
    texts,
    mfaSmsEnrollment,
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
  const buttonText = texts?.buttonText || "Continue";
  const phoneLabelText = texts?.placeholder || "Enter your phone number";

  // Extract general errors (not field-specific) from the SDK
  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

  const phoneSDKError = getFieldError("phone", errors);

  const onSubmit = async (formData: MfaSmsEnrollmentFormData) => {
    await handleContinueEnrollment(formData.phone);
  };
  const handleCountryCodeClick = async () => {
    await handlePickCountryCode();
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

        {/* Phone enrollment container with country picker and phone input */}
        <ULThemeCountryCodePicker
          selectedCountry={transformAuth0CountryCode(
            (mfaSmsEnrollment?.transaction as TransactionMembers)?.countryCode,
            (mfaSmsEnrollment?.transaction as TransactionMembers)?.countryPrefix
          )}
          onClick={handleCountryCodeClick}
          fullWidth
          placeholder="Select Country"
        />

        {/* Phone Number input field */}
        <FormField
          control={form.control}
          name="phone"
          rules={{
            required: "Please enter your phone number.",
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemeFloatingLabelField
                {...field}
                label={`${phoneLabelText}*`}
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
          {isSubmitting ? "Sending..." : buttonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default MfaSmsEnrollmentForm;
