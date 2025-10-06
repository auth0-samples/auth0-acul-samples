import { useForm } from "react-hook-form";

import type {
  Error,
  IdentifierType,
  SignupOptions,
  TransactionMembersOnSignupId,
} from "@auth0/auth0-acul-react/signup-id";
import {
  useEnabledIdentifiers,
  useUsernameValidation,
} from "@auth0/auth0-acul-react/signup-id";

import Captcha from "@/components/Captcha";
import { ULThemeFloatingLabelField } from "@/components/form/ULThemeFloatingLabelField";
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import ULThemeCountryCodePicker from "@/components/ULThemeCountryCodePicker";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import { transformAuth0CountryCode } from "@/utils/helpers/countryUtils";
import { getFieldError } from "@/utils/helpers/errorUtils";
import { getIndividualIdentifierDetails } from "@/utils/helpers/identifierUtils";
import { createUsernameValidator } from "@/utils/validations";

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
    reValidateMode: "onBlur",
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;

  // Get username validation
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

  // Handle text fallbacks
  const buttonText = texts?.buttonText || "Continue";
  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : "CAPTCHA*";
  const captchaImageAlt = "CAPTCHA challenge";

  // Get general errors (not field-specific)
  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

  // Create validation function using utility
  const validateUsernameRule = createUsernameValidator(
    isUsernameValid,
    userNameErrors
  );

  // Get field-specific errors
  const getIdentifierError = (identifierType: IdentifierType) =>
    getFieldError(identifierType, errors || []);

  const captchaSDKError = getFieldError("captcha", errors || []);

  // Simplified submit handler matching login-id pattern
  const onSubmit = async (data: SignupOptions) => {
    await handleSignup(data);
  };

  const renderFields = (identifiers: IdentifierType[], isRequired: boolean) =>
    identifiers.map((identifierType) => {
      if (identifierType === "phone") {
        return (
          <div
            key={`${isRequired ? "required" : "optional"}-phone-container`}
            className="space-y-2"
          >
            <ULThemeCountryCodePicker
              selectedCountry={transformAuth0CountryCode(
                (signupId?.transaction as TransactionMembersOnSignupId)
                  ?.countryCode,
                (signupId?.transaction as TransactionMembersOnSignupId)
                  ?.countryPrefix
              )}
              onClick={handlePickCountryCode}
              fullWidth
              placeholder="Select Country"
            />
            {renderIdentifierField(identifierType, isRequired)}
          </div>
        );
      }
      return renderIdentifierField(identifierType, isRequired);
    });

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
          ...(identifierType === "username" && {
            validate: validateUsernameRule(isRequired),
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
        {renderFields(requiredIdentifiers, true)}

        {/* Optional identifier fields */}
        {renderFields(optionalIdentifiers, false)}

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
