import { useForm } from "react-hook-form";

import type {
  CustomOptions,
  Error,
} from "@auth0/auth0-acul-react/mfa-push-welcome";

import { Form } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeLink from "@/components/ULThemeLink";

import { useMfaPushWelcomeManager } from "../hooks/useMfaPushWelcomeManager";

function MfaSmsChallengeForm() {
  const {
    links,
    errors,
    texts,
    enrolledFactors,
    // handleMfaPushWelcomeEnroll,
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

  return (
    <Form {...form}>
      <form>
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

        <div className="text-center space-y-2 mt-6">
          <div className="flex justify-content-stretch">
            <ULThemeLink href={links?.ios} className="border grow-1">
              {
                <div className="inline-block p-4 mr-2">
                  <span className="block m-auto h-7.5 w-7.5"></span>
                  <span>{iosButtonText}</span>
                </div>
              }
            </ULThemeLink>
            <ULThemeLink href={links?.android} className="border grow-1">
              {
                <div className="inline-block p-4">
                  <span className="block m-auto h-7.5 w-7.5"></span>
                  <span>{androidButtonText}</span>
                </div>
              }
            </ULThemeLink>
          </div>
          {/* Continue Enroll Button */}
          <ULThemeButton type="submit" variant="primary" className="w-full">
            {continueEnrollButtonText}
          </ULThemeButton>
          {/* Try another method link */}
          {shouldShowTryAnotherMethod && (
            <ULThemeButton
              onClick={() => handlePickAuthenticator()}
              variant="link"
              size="link"
            >
              {pickAuthenticatorText}
            </ULThemeButton>
          )}
        </div>
      </form>
    </Form>
  );
}

export default MfaSmsChallengeForm;
