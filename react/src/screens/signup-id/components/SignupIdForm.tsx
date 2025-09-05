import { useForm } from "react-hook-form";

import type {
  Error,
  IdentifierType,
  SignupOptions,
  TransactionMembersOnSignupId,
} from "@auth0/auth0-acul-react/signup-id";

import Captcha from "@/components/Captcha";
import { ULThemeFloatingLabelField } from "@/components/form/ULThemeFloatingLabelField";
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import { Form, FormField, FormItem } from "@/components/ui/form";
import ULThemeCountryCodePicker from "@/components/ULThemeCountryCodePicker";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import { ULThemePrimaryButton } from "@/components/ULThemePrimaryButton";
import { transformAuth0CountryCode } from "@/utils/helpers/countryUtils";
import { getFieldError } from "@/utils/helpers/errorUtils";
import { getIndividualIdentifierDetails } from "@/utils/helpers/identifierUtils";

import { useSignupIdManager } from "../hooks/useSignupIdManager";

function SignupIdForm() {
  const {
    handleSignup,
    handlePickCountryCode,
    isCaptchaAvailable,
    signupId,
    texts,
    captchaImage,
    errors,
  } = useSignupIdManager();

  const form = useForm<SignupOptions>({
    defaultValues: {
      email: "",
      phone: "",
      username: "",
      captcha: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Get identifiers from transaction
  const requiredIdentifiers = signupId?.transaction?.requiredIdentifiers || [];
  const optionalIdentifiers = signupId?.transaction?.optionalIdentifiers || [];

  // Handle text fallbacks
  const buttonText = texts?.buttonText || "Continue";
  const captchaLabel = texts?.captchaCodePlaceholder?.concat("*") || "CAPTCHA*";
  const captchaImageAlt = "CAPTCHA challenge";

  // Get general errors (not field-specific)
  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

  // Get field-specific errors
  const getIdentifierError = (identifierType: IdentifierType) =>
    getFieldError(identifierType, errors || []);

  const captchaSDKError = getFieldError("captcha", errors || []);

  // Submit handler
  const onSubmit = async (data: SignupOptions) => {
    const cleanedData: SignupOptions = {};

    if (data.email?.trim()) cleanedData.email = data.email.trim();
    if (data.phone?.trim()) cleanedData.phone = data.phone.trim();
    if (data.username?.trim()) cleanedData.username = data.username.trim();
    if (data.captcha?.trim()) cleanedData.captcha = data.captcha.trim();

    await handleSignup(cleanedData);
  };

  const handleCountryCodeClick = () => {
    handlePickCountryCode();
  };

  const renderIdentifierField = (
    identifierType: IdentifierType,
    isRequired: boolean
  ) => {
    const { label, type, autoComplete } = getIndividualIdentifierDetails(
      identifierType,
      isRequired,
      texts
    );

    const sdkError = getIdentifierError(identifierType);

    return (
      <FormField
        key={identifierType}
        control={form.control}
        name={identifierType}
        rules={{
          required: isRequired ? "This field is required" : false,
          maxLength: {
            value: 100,
            message: "Maximum 100 characters allowed",
          },
        }}
        render={({ field, fieldState }) => (
          <FormItem>
            <ULThemeFloatingLabelField
              {...field}
              label={label}
              type={type}
              autoComplete={autoComplete}
              error={!!fieldState.error || !!sdkError}
            />
            <ULThemeFormMessage
              sdkError={sdkError}
              hasFormError={!!fieldState.error}
            />
          </FormItem>
        )}
      />
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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

        {/* Required identifier fields first */}
        {requiredIdentifiers.map((identifierType: IdentifierType) => {
          // Handle phone field with country picker
          if (identifierType === "phone") {
            return (
              <div key={`required-phone-container`} className="space-y-2">
                {/* Country Code Picker */}
                <ULThemeCountryCodePicker
                  selectedCountry={transformAuth0CountryCode(
                    (signupId?.transaction as TransactionMembersOnSignupId)
                      ?.countryCode,
                    (signupId?.transaction as TransactionMembersOnSignupId)
                      ?.countryPrefix
                  )}
                  onClick={handleCountryCodeClick}
                  fullWidth
                  placeholder="Select Country"
                />
                {/* Phone Number Field */}
                {renderIdentifierField(identifierType, true)}
              </div>
            );
          }

          return renderIdentifierField(identifierType, true);
        })}

        {/* Optional identifier fields */}
        {optionalIdentifiers.map((identifierType: IdentifierType) => {
          // Handle phone field with country picker
          if (identifierType === "phone") {
            return (
              <div key={`optional-phone-container`} className="space-y-2">
                {/* Country Code Picker */}
                <ULThemeCountryCodePicker
                  selectedCountry={transformAuth0CountryCode(
                    (signupId?.transaction as TransactionMembersOnSignupId)
                      ?.countryCode,
                    (signupId?.transaction as TransactionMembersOnSignupId)
                      ?.countryPrefix
                  )}
                  onClick={handleCountryCodeClick}
                  fullWidth
                  placeholder="Select Country"
                />
                {/* Phone Number Field */}
                {renderIdentifierField(identifierType, false)}
              </div>
            );
          }

          return renderIdentifierField(identifierType, false);
        })}

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
              maxLength: {
                value: 15,
                message: "CAPTCHA too long",
              },
            }}
          />
        )}

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

export default SignupIdForm;
