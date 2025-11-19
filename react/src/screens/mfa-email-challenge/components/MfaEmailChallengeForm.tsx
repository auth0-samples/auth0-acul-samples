import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import type { ContinueOptions, ErrorItem } from "@auth0/auth0-acul-react/types";
import { ChevronRight } from "lucide-react";

import {
  ULThemeFloatingLabelField,
  ULThemeFormMessage,
} from "@/components/form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeCheckbox } from "@/components/ULThemeCheckbox";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";

import { useMfaEmailChallengeManager } from "../hooks/useMFAEmailChallengeManager";

function MfaEmailChallengeForm() {
  const {
    handleContinue,
    data,
    useErrors,
    texts,
    locales,
    enrolledEmails,
    handlePickEmail,
  } = useMfaEmailChallengeManager();
  const { errors, hasError, dismiss } = useErrors;
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (Array.isArray(enrolledEmails) && enrolledEmails.length > 1) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [enrolledEmails]);

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

  const buttonText = texts?.buttonText || locales.form.buttonText;
  const codeLabelText =
    texts?.codeLabelText || locales.form.fields.code.codeLabelText;
  const rememberDeviceText =
    texts?.rememberDeviceText || locales.form.rememberDeviceText;

  // Extract general errors (not field-specific) from the SDK
  const generalErrors: ErrorItem[] =
    errors.byKind("auth0")?.filter((error) => {
      return !error.field || error.field === null;
    }) || [];

  const codeSDKError = errors.byField("code")[0]?.message;
  const userEmail = data?.email || "";

  const onSubmit = async (formData: ContinueOptions) => {
    await handleContinue(formData.code, formData.rememberDevice);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* General error messages */}
        {hasError && generalErrors.length > 0 && (
          <div className="space-y-3 mb-4">
            {generalErrors.map((error: ErrorItem) => (
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

        {/* User Email */}
        <ULThemeSocialProviderButton
          type="button"
          displayName={locales.form.fields.email.identifierLabelText}
          buttonText={userEmail}
          iconEnd={
            !isDisabled && (
              <ChevronRight className="w-4 h-4 theme-universal:text-input-labels" />
            )
          }
          onClick={handlePickEmail}
          className="flex items-center gap-2 mb-2"
          variant="outline"
          iconComponent={undefined}
          disabled={isDisabled}
        ></ULThemeSocialProviderButton>

        {/* Code input field */}
        <FormField
          control={form.control}
          name="code"
          rules={{
            required: locales.form.fields.code.requiredText,
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
                    aria-labelledby="rememberDevice-label"
                  />
                  <Label
                    id="rememberDevice-label"
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
          {isSubmitting ? `${locales.form.verificationText}...` : buttonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default MfaEmailChallengeForm;
