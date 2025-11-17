import { useForm } from "react-hook-form";

import type {
  ErrorItem,
  PhoneChallengeOptions,
} from "@auth0/auth0-acul-react/types";

import {
  ULThemeFloatingLabelField,
  ULThemeFormMessage,
} from "@/components/form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";

import { usePhoneIdentifierChallengeManager } from "../hooks/usePhoneIdentifierChallengeManager";

function PhoneIdentifierChallengeForm() {
  const { handleSubmitPhoneChallenge, useErrors, texts, locales } =
    usePhoneIdentifierChallengeManager();

  // Initialize the form using react-hook-form
  const form = useForm<PhoneChallengeOptions>({
    defaultValues: {
      code: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const buttonText = texts?.buttonText || locales.form.buttonLabelText;
  const codeLabelText = texts?.placeholder || locales.form.field.labelText;
  const { errors, hasError, dismiss } = useErrors;

  // Extract general errors (not field-specific) from the SDK
  const generalErrors: ErrorItem[] =
    errors.byKind("auth0")?.filter((error) => {
      return !error.field || error.field === null;
    }) || [];

  const codeSDKError = errors.byField("code")[0]?.message;

  const onSubmit = async (formData: PhoneChallengeOptions) => {
    await handleSubmitPhoneChallenge(formData.code);
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

        {/* Phone Code input field */}
        <FormField
          control={form.control}
          name="code"
          rules={{
            required: locales.form.field.required,
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemeFloatingLabelField
                {...field}
                label={`${codeLabelText}*`}
                type="text"
                inputMode="numeric"
                placeholder=""
                autoComplete="one-time-code"
                autoFocus
                error={!!fieldState.error || !!codeSDKError}
              />
              <ULThemeFormMessage
                sdkError={codeSDKError}
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
          {isSubmitting ? `${locales.form.field.submitButtonText}` : buttonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default PhoneIdentifierChallengeForm;
