import { useCallback } from "react";
import { useForm } from "react-hook-form";

import type {
  Error,
  IdentifierType,
  SignupOptions,
  TransactionMembersOnSignup,
} from "@auth0/auth0-acul-react/signup";
import {
  useEnabledIdentifiers,
  usePasswordValidation,
  useUsernameValidation,
} from "@auth0/auth0-acul-react/signup";

import Captcha from "@/components/Captcha";
import { ULThemeFloatingLabelField } from "@/components/form/ULThemeFloatingLabelField";
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import ULThemeCountryCodePicker from "@/components/ULThemeCountryCodePicker";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import { ULThemePasswordField } from "@/components/ULThemePasswordField";
import { ULThemePasswordValidator } from "@/components/ULThemePasswordValidator";
import { transformAuth0CountryCode } from "@/utils/helpers/countryUtils";
import { getFieldError } from "@/utils/helpers/errorUtils";
import { getIndividualIdentifierDetails } from "@/utils/helpers/identifierUtils";
import {
  createPasswordValidator,
  createUsernameValidator,
  shouldShowValidation,
} from "@/utils/validations";

import { useSignupManager } from "../hooks/useSignupManager";

function SignupForm() {
  const {
    handleSignup,
    handlePickCountryCode,
    isCaptchaAvailable,
    signup,
    texts,
    captchaImage,
    errors,
  } = useSignupManager();

  const form = useForm<SignupOptions>({
    defaultValues: {
      email: "",
      phoneNumber: "",
      username: "",
      password: "",
      captcha: "",
    },
    reValidateMode: "onBlur",
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;

  const userNameValue = watch("username");
  const { isValid: isUsernameValid, errors: userNameErrors } =
    useUsernameValidation(userNameValue || "");

  // Get identifiers from transaction
  const enabledIdentifiers = useEnabledIdentifiers();

  // Extract required and optional identifiers from the hook data
  const requiredIdentifiers = (enabledIdentifiers || [])
    .filter((identifier) => identifier.required)
    .map((identifier) => identifier.type);
  const optionalIdentifiers = (enabledIdentifiers || [])
    .filter((identifier) => !identifier.required)
    .map((identifier) => identifier.type);

  // Get password validation rules from Auth0 SDK
  const passwordValue = watch("password");
  const validationRules = usePasswordValidation(passwordValue || "");

  // Show validation when user has typed something
  const showPasswordValidation = shouldShowValidation(passwordValue);

  // Create validation functions using utilities
  const validatePasswordRule = createPasswordValidator(
    validationRules,
    showPasswordValidation
  );
  const validateUsernameRule = createUsernameValidator(
    isUsernameValid,
    userNameErrors
  );

  // Handle country code selection for phone input
  const handleCountryCodeSelect = useCallback(() => {
    handlePickCountryCode();
  }, [handlePickCountryCode]);

  // Handle form submission
  const onSubmit = async (values: SignupOptions) => {
    await handleSignup(values);
  };

  // Helper functions for field errors
  const getIdentifierError = (identifierType: IdentifierType) =>
    getFieldError(identifierType, errors || []);

  const captchaSDKError = getFieldError("captcha", errors || []);
  const passwordSDKError = getFieldError("password", errors || []);

  // Handle text fallbacks like in SignupPasswordForm
  const passwordLabel = texts?.passwordPlaceholder
    ? `${texts.passwordPlaceholder}*`
    : "Password*";
  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : "CAPTCHA*";
  const captchaImageAlt = "CAPTCHA challenge";
  const buttonText = texts?.buttonText || "Continue";

  // Transform the phone country code for display
  const phoneCountryCode = transformAuth0CountryCode(
    (signup?.transaction as TransactionMembersOnSignup)?.countryCode,
    (signup?.transaction as TransactionMembersOnSignup)?.countryPrefix
  );

  // Render identifier fields helper function
  const renderIdentifierField = (
    identifierType: IdentifierType,
    isRequired: boolean
  ) => {
    if (identifierType === "phone") {
      return (
        <div
          key={`${isRequired ? "required" : "optional"}-phone-container`}
          className="space-y-2"
        >
          <ULThemeCountryCodePicker
            selectedCountry={phoneCountryCode}
            onClick={handleCountryCodeSelect}
            fullWidth
            placeholder="Select Country"
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            rules={{
              required: isRequired ? "This field is required" : false,
            }}
            render={({ field, fieldState }) => {
              const { label, type, autoComplete } =
                getIndividualIdentifierDetails("phone", isRequired, texts);
              const sdkError = getIdentifierError("phone");

              return (
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
              );
            }}
          />
        </div>
      );
    }

    // Handle other identifier types (email, username)
    return (
      <FormField
        key={identifierType}
        control={form.control}
        name={identifierType}
        rules={{
          required: isRequired ? "This field is required" : false,
          ...(identifierType === "username" && {
            validate: validateUsernameRule(isRequired),
          }),
        }}
        render={({ field, fieldState }) => {
          const { label, type, autoComplete } = getIndividualIdentifierDetails(
            identifierType,
            isRequired,
            texts
          );
          const sdkError = getIdentifierError(identifierType);

          return (
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
          );
        }}
      />
    );
  };

  // Render fields helper function
  const renderFields = (identifiers: IdentifierType[], isRequired: boolean) =>
    identifiers.map((identifierType) =>
      renderIdentifierField(identifierType, isRequired)
    );

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

        {/* Required identifier fields first */}
        {renderFields(requiredIdentifiers, true)}

        {/* Optional identifier fields */}
        {renderFields(optionalIdentifiers, false)}

        {/* Password Field */}
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

        {/* Captcha Field */}
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
        />

        {/* Submit Button */}
        <ULThemeButton type="submit" className="w-full" disabled={isSubmitting}>
          {buttonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default SignupForm;
