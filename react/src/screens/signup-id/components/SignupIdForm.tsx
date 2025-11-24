import { useMemo } from "react";
import { useForm } from "react-hook-form";

import {
  useErrors,
  useSignupIdentifiers,
  useUsernameValidation,
} from "@auth0/auth0-acul-react/signup-id";
import type {
  ErrorItem,
  IdentifierType,
  SignupOptions,
  UsernameValidationResult,
} from "@auth0/auth0-acul-react/types";

import Captcha from "@/components/Captcha/index";
import { ULThemeFloatingLabelField } from "@/components/form/ULThemeFloatingLabelField";
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import ULThemeCountryCodePicker from "@/components/ULThemeCountryCodePicker";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import { useCaptcha } from "@/hooks/useCaptcha";
import { transformAuth0CountryCode } from "@/utils/helpers/countryUtils";
import { getIndividualIdentifierDetails } from "@/utils/helpers/identifierUtils";
import { createUsernameValidator } from "@/utils/validations";

import { useSignupIdManager } from "../hooks/useSignupIdManager";

function SignupIdForm() {
  const {
    transaction,
    handleSignup,
    handlePickCountryCode,
    isCaptchaAvailable,
    texts,
    captcha,
    locales,
  } = useSignupIdManager();

  const { errors, hasError, dismiss } = useErrors();

  const form = useForm<SignupOptions>({
    defaultValues: {
      email: "",
      username: "",
      phone: "",
      captcha: "",
    },
    reValidateMode: "onBlur",
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;

  // Get username validation
  const userNameValue = watch("username");
  const {
    isValid: isUsernameValid,
    errors: userNameErrors,
  }: UsernameValidationResult = useUsernameValidation(userNameValue || "");

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

  // Use locale strings with fallback to SDK texts
  const buttonText = texts?.buttonText || locales.form.button;
  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : `${locales.form.fields.captcha.label}*`;

  // Setup captcha with useCaptcha hook
  const { captchaConfig, captchaProps } = useCaptcha(
    captcha || undefined,
    captchaLabel
  );

  // Get general errors (not field-specific)
  const generalErrors: ErrorItem[] = errors
    .byType("auth0")
    .filter((err) => !err.field);

  const captchaSDKError = errors.byField("captcha")[0]?.message;

  // Simplified submit handler matching login-id pattern
  const onSubmit = async (data: SignupOptions) => {
    await handleSignup(data);
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

    const sdkError = errors.byField(identifierType)[0]?.message;

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

  const renderFields = (identifiers: IdentifierType[], isRequired: boolean) =>
    identifiers.map((identifierType) => {
      if (identifierType === "phone") {
        const phoneCountryCode = transformAuth0CountryCode(
          transaction?.countryCode,
          transaction?.countryPrefix
        );

        return (
          <div
            key={`${isRequired ? "required" : "optional"}-phone-container`}
            className="space-y-2"
          >
            <ULThemeCountryCodePicker
              selectedCountry={phoneCountryCode}
              onClick={handlePickCountryCode}
              fullWidth
              placeholder={locales.form.fields.countryCode.placeholder}
            />
            {renderIdentifierField(identifierType, isRequired)}
          </div>
        );
      }
      return renderIdentifierField(identifierType, isRequired);
    });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* General alerts at the top */}
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

        {/* Required identifier fields first */}
        {renderFields(requiredIdentifiers, true)}

        {/* Optional identifier fields */}
        {renderFields(optionalIdentifiers, false)}

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
          />
        )}

        {/* Submit button */}
        <ULThemeButton type="submit" className="w-full" disabled={isSubmitting}>
          {buttonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default SignupIdForm;
