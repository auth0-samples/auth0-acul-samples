import { useForm } from "react-hook-form";

import type {
  CustomOptions,
  Error,
} from "@auth0/auth0-acul-react/mfa-push-welcome";

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
    errors,
    texts,
    enrolledFactors,
    handleMfaPushWelcomeEnroll,
    handlePickAuthenticator,
  } = useMfaPushWelcomeManager();

  // Initialize the form using react-hook-form
  const form = useForm<CustomOptions>({});

  const continueEnrollButtonText = texts?.buttonText || "Continue";
  const androidButtonText = texts?.androidButtonText || "Google Play";
  const iosButtonText = texts?.iosButtonText || "App Store";
  const pickAuthenticatorText =
    texts?.pickAuthenticatorText || "Try another method";
  const shouldShowTryAnotherMethod = enrolledFactors?.length
    ? enrolledFactors.length > 1
    : false;

  // Extract general errors (not field-specific) from the SDK
  const generalErrors =
    errors?.filter((error: Error) => !error.field || error.field === null) ||
    [];

  const onSubmit = async (formData?: CustomOptions) => {
    await handleMfaPushWelcomeEnroll(formData);
  };

  const socialIconButtonClassNames =
    "grow-1 border-1 theme-universal:focus:ring-4 theme-universal:focus:ring-base-focus/15 border-(--ul-theme-color-secondary-button-border) theme-universal:rounded-button theme-universal:font-button text-(length:--ul-theme-font-buttons-text-size) hover:shadow-[var(--button-hover-shadow)] theme-universal:text-(--ul-theme-color-secondary-button-label)";

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
