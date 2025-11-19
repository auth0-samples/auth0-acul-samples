import { useForm } from "react-hook-form";

import { useErrors } from "@auth0/auth0-acul-react/mfa-push-welcome";
import type { CustomOptions, ErrorItem } from "@auth0/auth0-acul-react/types";

import { AppleIcon, GooglePlayIcon } from "@/assets/icons";
import { Form } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeLink from "@/components/ULThemeLink";
import { cn } from "@/lib/utils";

import { useMfaPushWelcomeManager } from "../hooks/useMfaPushWelcomeManager";

function MfaPushWelcomeForm() {
  const {
    links,
    texts,
    locales,
    enrolledFactors,
    handleMfaPushWelcomeEnroll,
    handlePickAuthenticator,
  } = useMfaPushWelcomeManager();

  // Initialize the form using react-hook-form
  const form = useForm<CustomOptions>({});

  // Use Locales as fallback to SDK texts
  const continueEnrollButtonText =
    texts?.buttonText || locales.form.continueEnrollButtonText;
  const androidButtonText =
    texts?.androidButtonText || locales.form.androidButtonText;
  const iosButtonText = texts?.iosButtonText || locales.form.iosButtonText;
  const pickAuthenticatorText =
    texts?.pickAuthenticatorText || locales.form.pickAuthenticatorText;
  const shouldShowTryAnotherMethod = enrolledFactors?.length
    ? enrolledFactors.length > 1
    : false;

  const { errors, hasError, dismiss } = useErrors();

  // Get general errors (not field-specific)
  const generalErrors: ErrorItem[] = errors
    .byKind("auth0")
    .filter((err) => !err.field);

  const onSubmit = async (formData?: CustomOptions) => {
    await handleMfaPushWelcomeEnroll(formData);
  };

  const socialIconButtonClassNames =
    "grow border theme-universal:focus:ring-4 theme-universal:focus:ring-base-focus/15 border-(--ul-theme-color-secondary-button-border) theme-universal:rounded-button theme-universal:font-button text-(length:--ul-theme-font-buttons-text-size) hover:shadow-(--button-hover-shadow) theme-universal:text-(--ul-theme-color-secondary-button-label)";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* General error messages */}
        {generalErrors.length > 0 && (
          <div className="space-y-3 mb-4">
            {hasError &&
              generalErrors.map((error) => (
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

        <div className="text-center">
          <div className="flex justify-stretch">
            <ULThemeLink
              href={links?.ios}
              target="_blank"
              className={cn(socialIconButtonClassNames, "mr-2")}
            >
              {
                <div className="p-4 w-full">
                  <span className="table static my-0 mx-auto mb-2">
                    {" "}
                    <AppleIcon />
                  </span>
                  <span>{iosButtonText}</span>
                </div>
              }
            </ULThemeLink>
            <ULThemeLink
              href={links?.android}
              target="_blank"
              className={cn(socialIconButtonClassNames)}
            >
              {
                <div className="p-4 w-full">
                  <span className="table static my-0 mx-auto mb-2">
                    <GooglePlayIcon />
                  </span>
                  <span>{androidButtonText}</span>
                </div>
              }
            </ULThemeLink>
          </div>
          {/* Continue Enroll Button */}
          <ULThemeButton
            type="submit"
            variant="primary"
            className="w-full mt-6"
          >
            {continueEnrollButtonText}
          </ULThemeButton>
        </div>
      </form>
      {/* Try another method link */}
      {shouldShowTryAnotherMethod && (
        <ULThemeButton
          onClick={() => handlePickAuthenticator()}
          variant="link"
          size="link"
          className="mt-4 text-center"
        >
          {pickAuthenticatorText}
        </ULThemeButton>
      )}
    </Form>
  );
}

export default MfaPushWelcomeForm;
