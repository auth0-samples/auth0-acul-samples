import { useForm } from "react-hook-form";

import type {
  ContinueOptions,
  Error,
} from "@auth0/auth0-acul-react/mfa-email-challenge";

import {
  ULThemeFloatingLabelField,
  ULThemeFormMessage,
} from "@/components/form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeCheckbox } from "@/components/ULThemeCheckbox";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import { getFieldError } from "@/utils/helpers/errorUtils";

import { useMfaEmailChallengeManager } from "../hooks/useMFAEmailChallengeManager";

function MfaEmailChallengeForm() {
  const { handleContinue, data, errors, texts } = useMfaEmailChallengeManager();

  // Initialize the form using react-hook-form
  const form = useForm<ContinueOptions>({
    defaultValues: {
      code: "",
      rememberDevice: false,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const buttonText = texts?.buttonText || "Continue";
  const codeLabelText = texts?.placeholder || "Enter the code";
  const rememberDeviceText =
    texts?.rememberMeText || "Remember this device for 30 days";

  // Extract general errors (not field-specific) from the SDK
  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

  const codeSDKError = getFieldError("code", errors);
  const userEmail = data?.email || "";

  const onSubmit = async (formData: ContinueOptions) => {
    await handleContinue(formData.code, formData.rememberDevice);
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

        {/* Disabled User Email */}
        <ULThemeFloatingLabelField
          name="email"
          label="Email"
          value={userEmail}
          disabled
        />

        {/* Code input field */}
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
                label={codeLabelText}
                type="text"
                inputMode="numeric"
                placeholder=""
                autoComplete="one-time-code"
                autoFocus
                error={!!fieldState.error || !!codeSDKError}
                isRequired={true}
              />
              <ULThemeFormMessage
                sdkError={codeSDKError}
                hasFormError={!!fieldState.error}
              />
            </FormItem>
          )}
        />

        {/* Remember device checkbox */}
        {data?.showRememberDevice && (
          <FormField
            control={form.control}
            name="rememberDevice"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2 my-4">
                  <ULThemeCheckbox
                    id="rememberDevice"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label
                    htmlFor="rememberDevice"
                    className="text-(length:--ul-theme-font-body-text-size) cursor-pointer"
                  >
                    {rememberDeviceText}
                  </Label>
                </div>
              </FormItem>
            )}
          />
        )}

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

export default MfaEmailChallengeForm;
