import React from "react";
import { useForm } from "react-hook-form";

import type { ErrorItem } from "@auth0/auth0-acul-react/types";

import { ULThemeFloatingLabelField } from "@/components/form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";

import { usePhoneIdentifierEnrollmentManager } from "../hooks/usePhoneIdentifierEnrollmentManager";

interface PhoneEnrollmentFormData {
  type: "text" | "voice";
}

function PhoneIdentifierEnrollmentForm() {
  const { handleContinueEnrollment, texts, data, locales, useErrors } =
    usePhoneIdentifierEnrollmentManager();

  // Initialize the form using react-hook-form
  const form = useForm<PhoneEnrollmentFormData>({
    defaultValues: {
      type: "text",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;
  const buttonText = texts?.continueButtonText || locales.form.buttonLabelText;
  const { errors, hasError, dismiss } = useErrors;

  // Extract general errors (not field-specific) from the SDK
  const generalErrors: ErrorItem[] =
    errors.byType("auth0")?.filter((error) => {
      return !error.field || error.field === null;
    }) || [];

  const onSubmit = async (formData: PhoneEnrollmentFormData) => {
    await handleContinueEnrollment(formData.type);
  };

  const selectedType = form.watch("type");

  //Refs for both the buttons
  const textButtonRef = React.useRef<HTMLButtonElement>(null);
  const voiceButtonRef = React.useRef<HTMLButtonElement>(null);

  //Focus the selected button when the selectedType changes
  React.useEffect(() => {
    if (selectedType === "text") {
      textButtonRef.current?.focus();
    } else {
      voiceButtonRef.current?.focus();
    }
  }, [selectedType]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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

        {/* Phone Number input field */}
        <ULThemeFloatingLabelField
          label=""
          type="tel"
          autoFocus
          placeholder={data?.phone || ""}
          disabled={true}
        />

        {/* Phone identifier enrollment options*/}
        <div>
          <ULThemeSubtitle className="mb-2 mt-4 theme-universal:text-start">
            {texts?.chooseMessageTypeText || locales.form.field.labelText}
          </ULThemeSubtitle>

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex gap-2">
                <ULThemeButton
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => field.onChange("text")}
                  ref={textButtonRef}
                >
                  {texts?.smsButtonText || locales.form.field.smsButton}
                </ULThemeButton>

                <ULThemeButton
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => field.onChange("voice")}
                  ref={voiceButtonRef}
                >
                  {texts?.voiceButtonText || locales.form.field.voiceButton}
                </ULThemeButton>
              </FormItem>
            )}
          />
        </div>

        {/* Submit button */}
        <ULThemeButton
          type="submit"
          variant="primary"
          className="w-full mt-3"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? `${locales.form.field.sendingCodeText}...`
            : buttonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default PhoneIdentifierEnrollmentForm;
