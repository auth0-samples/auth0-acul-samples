import { useForm } from "react-hook-form";

import type {
  Error,
  PhoneChallengeOptions,
} from "@auth0/auth0-acul-react/types";

import {
  ULThemeFloatingLabelField,
  ULThemeFormMessage,
} from "@/components/form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import { getFieldError } from "@/utils/helpers/errorUtils";

import { usePhoneIdentifierChallengeManager } from "../hooks/usePhoneIdentifierChallengeManager";

function PhoneIdentifierChallengeForm() {
  const { handleSubmitPhoneChallenge, errors, texts } =
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

  const buttonText = texts?.buttonText || "Continue";
  const codeLabelText = texts?.placeholder || "Enter the 6-digit code";

  // Extract general errors (not field-specific) from the SDK
  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

  const codeSDKError = getFieldError("code", errors);

  const onSubmit = async (formData: PhoneChallengeOptions) => {
    await handleSubmitPhoneChallenge(formData.code);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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

        {/* Phone Code input field */}
        <FormField
          control={form.control}
          name="code"
          rules={{
            required: "Please enter the verification code.",
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
          {isSubmitting ? "Verifying..." : buttonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default PhoneIdentifierChallengeForm;
