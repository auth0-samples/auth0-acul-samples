import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";

import {
  useErrors,
  usePasswordValidation,
  useSignupIdentifiers,
  useUsernameValidation,
} from "@auth0/auth0-acul-react/signup";
import type {
  ErrorItem,
  IdentifierType,
  PasswordValidationResult,
  SignupPayloadOptions,
  UsernameValidationResult,
} from "@auth0/auth0-acul-react/types";

import Captcha from "@/components/Captcha/index";
import { ULThemeFloatingLabelField } from "@/components/form/ULThemeFloatingLabelField";
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import ULThemeCountryCodePicker from "@/components/ULThemeCountryCodePicker";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import { ULThemePasswordField } from "@/components/ULThemePasswordField";
import { ULThemePasswordValidator } from "@/components/ULThemePasswordValidator";
import { useCaptcha } from "@/hooks/useCaptcha";
import { transformAuth0CountryCode } from "@/utils/helpers/countryUtils";
import { getIndividualIdentifierDetails } from "@/utils/helpers/identifierUtils";
import { createUsernameValidator } from "@/utils/validations";

import { useSignupManager } from "../hooks/useSignupManager";

function SignupForm() {
  const {
    handleSignup,
    handlePickCountryCode,
    isCaptchaAvailable,
    transaction,
    texts,
    captcha,
    locales,
  } = useSignupManager();

  const { errors, hasError, dismiss } = useErrors();

  const form = useForm<SignupPayloadOptions>({
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

  // Username validation
  const userNameValue = watch("username");
  const {
    isValid: isUsernameValid,
    errors: userNameErrors,
  }: UsernameValidationResult = useUsernameValidation(userNameValue || "");

  // Password validation
  const passwordValue = watch("password");
  const {
    isValid: isPasswordValid,
    results: passwordResults,
  }: PasswordValidationResult = usePasswordValidation(passwordValue || "");

  // Get identifiers from transaction
  const enabledIdentifiers = useSignupIdentifiers();

  // Extract required and optional identifiers from the hook data
  const requiredIdentifiers = useMemo(
    () =>
      (enabledIdentifiers || [])
        .filter((identifier) => identifier.required)
        .map((identifier) => identifier.type),
    [enabledIdentifiers]
  );

  const optionalIdentifiers = useMemo(
    () =>
      (enabledIdentifiers || [])
        .filter((identifier) => !identifier.required)
        .map((identifier) => identifier.type),
    [enabledIdentifiers]
  );

  // Handle country code selection for phone input
  const handleCountryCodeSelect = useCallback(() => {
    handlePickCountryCode();
  }, [handlePickCountryCode]);

  // Handle form submission
  const onSubmit = async (values: SignupPayloadOptions) => {
    await handleSignup(values);
  };

  // Get field-specific errors using SDK's errors helper
  const getIdentifierError = useCallback(
    (identifierType: IdentifierType) => {
      const fieldErrors = errors.byField(identifierType);
      return fieldErrors.length > 0 ? fieldErrors[0].message : undefined;
    },
    [errors]
  );

  const captchaSDKError = errors.byField("captcha")[0]?.message;
  const passwordSDKError = errors.byField("password")[0]?.message;

  // Get general errors (errors without a specific field)
  const generalErrors: ErrorItem[] = errors
    .byKind("auth0")
    .filter((err) => !err.field);

  // Use locale strings with fallback to SDK texts
  const passwordLabel = texts?.passwordPlaceholder
    ? `${texts.passwordPlaceholder}*`
    : `${locales.form.fields.password.label}*`;
  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : `${locales.form.fields.captcha.label}*`;
  const buttonText = texts?.buttonText || locales.form.button;
  const passwordSecurityText =
    texts?.passwordSecurityText || locales.form.passwordSecurity;

  // Setup captcha with useCaptcha hook
  const { captchaConfig, captchaProps } = useCaptcha(
    captcha || undefined,
    captchaLabel
  );

  // Transform the phone country code for display
  const phoneCountryCode = transformAuth0CountryCode(
    transaction?.countryCode,
    transaction?.countryPrefix
  );

  // Render identifier fields helper function
  const renderIdentifierField = useCallback(
    (identifierType: IdentifierType, isRequired: boolean) => {
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
                required: isRequired
                  ? locales.form.fields.common.required
                  : false,
              }}
              render={({ field, fieldState }) => {
                const { label, type, autoComplete } =
                  getIndividualIdentifierDetails("phone", isRequired, texts);
                const sdkError = getIdentifierError("phone");

                return (
                  <FormItem>
                    <ULThemeFloatingLabelField
                      {...field}
                      value={String(field.value || "")}
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
            required: isRequired ? locales.form.fields.common.required : false,
            ...(identifierType === "username" && {
              validate: createUsernameValidator(
                isUsernameValid,
                userNameErrors,
                isRequired,
                locales.form.fields.common.required
              ),
            }),
          }}
          render={({ field, fieldState }) => {
            const { label, type, autoComplete } =
              getIndividualIdentifierDetails(identifierType, isRequired, texts);
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
    },
    [
      form.control,
      locales.form.fields.common.required,
      isUsernameValid,
      userNameErrors,
      phoneCountryCode,
      handleCountryCodeSelect,
      texts,
      getIdentifierError,
    ]
  );

  // Render fields helper function
  const renderFields = useCallback(
    (identifiers: IdentifierType[], isRequired: boolean) =>
      identifiers.map((identifierType) =>
        renderIdentifierField(identifierType, isRequired)
      ),
    [renderIdentifierField]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  {error.message || locales.errors.general}
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
            required: locales.form.fields.password.required,
            validate: () => {
              if (!isPasswordValid)
                return locales.form.fields.password.doesNotMeetRequirements;
              return true;
            },
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemePasswordField
                {...field}
                value={String(field.value || "")}
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
          />
        )}

        {/* Password Validation Rules */}
        <ULThemePasswordValidator
          validationRules={passwordResults}
          passwordSecurityText={passwordSecurityText}
          show={!!passwordValue}
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
