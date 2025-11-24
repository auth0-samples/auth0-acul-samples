import { useForm } from "react-hook-form";

import { useErrors } from "@auth0/auth0-acul-react/email-identifier-challenge";
import type { EmailChallengeOptions } from "@auth0/auth0-acul-react/types";

import {
  ULThemeFloatingLabelField,
  ULThemeFormMessage,
} from "@/components/form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";

import { useEmailIdentifierChallengeManager } from "../hooks/useEmailIdentifierChallengeManager";

function EmailIdentifierChallengeForm() {
  const { handleSubmitEmailChallenge, texts, locales } =
    useEmailIdentifierChallengeManager();

  const { errors, dismiss } = useErrors();

  // Initialize the form using react-hook-form
  const form = useForm<EmailChallengeOptions>({
    defaultValues: {
      code: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const buttonText = texts?.buttonText || locales?.form?.submitButton;
  const codeLabelText = texts?.placeholder || locales?.form?.codeLabel;

  // Extract general errors (not field-specific) from the SDK using useErrors hook
  const generalErrors = errors.byType("auth0").filter((err) => !err.field);

  const codeSDKError = errors.byField("code")[0]?.message;

  const onSubmit = async (formData: EmailChallengeOptions) => {
    await handleSubmitEmailChallenge(formData.code);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* General error messages */}
        {generalErrors.length > 0 && (
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

        {/* Email Code input field */}
        <FormField
          control={form.control}
          name="code"
          rules={{
            required: locales?.form?.codeRequired,
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemeFloatingLabelField
                {...field}
                label={codeLabelText}
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
          {isSubmitting ? locales?.form?.submitting : buttonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default EmailIdentifierChallengeForm;
