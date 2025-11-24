import { useForm } from "react-hook-form";

import { useErrors } from "@auth0/auth0-acul-react/passkey-enrollment-local";
import type {
  AbortEnrollmentOptions,
  CustomOptions,
  ErrorItem,
} from "@auth0/auth0-acul-react/types";

import {
  LockHeavyAccent,
  LockHeavyMask,
  WebAuthPlatform,
} from "@/assets/icons";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeCheckbox } from "@/components/ULThemeCheckbox";
import ULThemeAlert, { ULThemeAlertTitle } from "@/components/ULThemeError";
import {
  ULThemeList,
  ULThemeListDescription,
  ULThemeListItem,
  ULThemeListTitle,
} from "@/components/ULThemeList";
import { cn } from "@/lib/utils";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

import { usePasskeyEnrollmentLocalManager } from "../hooks/usePasskeyEnrollmentLocalManager";

/**
 * Passkeys Enrollment Local Benefits Details Component
 * This component renders the details about the benefits of using passkeys.
 */
function Details() {
  // Extract necessary methods and properties from the custom hook
  const { texts, locales, continuePasskeyEnrollment, abortPasskeyEnrollment } =
    usePasskeyEnrollmentLocalManager();

  // Initialize the form using react-hook-form
  const form = useForm<CustomOptions>({
    defaultValues: {
      doNotShowAgain: false, // Default value for the checkbox
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  // Use Locales as fallback to SDK texts
  const buttonText =
    texts?.createButtonText || locales.details.createPasskeyButtonText;
  const continueButtonText =
    texts?.continueButtonText ||
    locales.details.continueWithoutPasskeyButtonText;
  const showHideLocalEnrollmentCheckboxText =
    texts?.checkboxText || locales.details.showHideLocalEnrollmentCheckboxText;
  const passkeyBenefit1Title =
    texts?.passkeyBenefit1Title || locales.details.passkeyBenefit1Title;
  const passkeyBenefit1Description =
    texts?.passkeyBenefit1Description ||
    locales.details.passkeyBenefit1Description;
  const passkeyBenefit2Title =
    texts?.passkeyBenefit2Title || locales.details.passkeyBenefit2Title;
  const passkeyBenefit2Description =
    texts?.passkeyBenefit2Description ||
    locales.details.passkeyBenefit2Description;

  // Using extractTokenValue utility to extract the Icons Color Value from CSS variable
  const iconColor = extractTokenValue("--ul-theme-color-icons");

  const { errors, hasError, dismiss } = useErrors();

  // Get general errors (not field-specific)
  const generalErrors: ErrorItem[] = errors
    .byType("auth0")
    .filter((err) => !err.field);

  /**
   * This method handles form submission when user clicks on creating passkey.
   *
   * @param data - The form data containing user preferences
   */
  const onCreateClick = async (data: CustomOptions) => {
    await continuePasskeyEnrollment(
      data?.doNotShowAgain ? { doNotShowAgain: true } : {}
    );
  };

  /**
   * This method handles form submission when user clicks on canceling passkey enrollment.
   *
   * @param formData - The form data containing user preferences
   */
  const onCancelClick = async (formData: AbortEnrollmentOptions) => {
    await abortPasskeyEnrollment(
      formData?.doNotShowAgain ? { doNotShowAgain: true } : {}
    );
  };

  /**
   * Helper function to render icons dynamically with optional accent
   *
   * @param IconMask - The main icon component
   * @param IconAccent - Optional accent icon component
   * @param className - Additional class names for styling
   */
  const renderIcon = (
    IconMask: React.ElementType,
    IconAccent?: React.ElementType,
    className?: string
  ) => (
    <div className="relative w-15 h-10 left-1.5">
      <IconMask
        className={cn("absolute inline-block", className)}
        color={iconColor}
      />
      {IconAccent && (
        <IconAccent className="absolute inline-block" color={iconColor} />
      )}
    </div>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onCreateClick)}>
        {/* General error messages */}
        {hasError && generalErrors.length > 0 && (
          <div className="space-y-3 mb-4">
            {generalErrors.map((error) => (
              <ULThemeAlert
                key={error.id}
                variant="destructive"
                onDismiss={() => dismiss(error.id)}
              >
                <ULThemeAlertTitle>
                  {error.message || locales.errors.errorOccurred}
                </ULThemeAlertTitle>
              </ULThemeAlert>
            ))}
          </div>
        )}
        <ULThemeList variant="icon">
          <ULThemeListItem
            icon={renderIcon(LockHeavyMask, LockHeavyAccent, "opacity-[0.5]")}
          >
            <ULThemeListTitle
              children={passkeyBenefit1Title}
            ></ULThemeListTitle>
            <ULThemeListDescription
              children={passkeyBenefit1Description}
            ></ULThemeListDescription>
          </ULThemeListItem>

          <ULThemeListItem icon={renderIcon(WebAuthPlatform, undefined)}>
            <ULThemeListTitle
              children={passkeyBenefit2Title}
            ></ULThemeListTitle>
            <ULThemeListDescription
              children={passkeyBenefit2Description}
            ></ULThemeListDescription>
          </ULThemeListItem>
        </ULThemeList>

        {/* Show/Hide Local Enrollment Checkbox */}
        <FormField
          control={form.control}
          name="doNotShowAgain"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center ml-2 space-x-2 mb-6 justify-center">
                <ULThemeCheckbox
                  id="doNotShowAgain"
                  checked={Boolean(field.value)}
                  onCheckedChange={field.onChange}
                  className="size-4.5 border-black mr-3"
                />
                <Label
                  htmlFor="doNotShowAgain"
                  className="text-(length:--ul-theme-font-body-text-size) cursor-pointer"
                >
                  {showHideLocalEnrollmentCheckboxText}
                </Label>
              </div>
            </FormItem>
          )}
        />

        <ULThemeButton
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {buttonText}
        </ULThemeButton>
        <div className="mt-4 text-center">
          {continueButtonText && (
            <ULThemeButton
              variant="link"
              size="link"
              onClick={() =>
                onCancelClick({
                  doNotShowAgain: Boolean(form.getValues().doNotShowAgain),
                })
              }
            >
              {continueButtonText}
            </ULThemeButton>
          )}
        </div>
      </form>
    </Form>
  );
}

export default Details;
