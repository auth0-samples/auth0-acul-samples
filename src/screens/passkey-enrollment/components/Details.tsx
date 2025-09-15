import { CustomOptions } from "@auth0/auth0-acul-js/passkey-enrollment";
import { Fingerprint, Globe, ShieldCheck, Smartphone } from "lucide-react";

import { ULThemeButton } from "@/components/ULThemeButton";
import ULThemeList from "@/components/ULThemeList";

import { usePasskeyEnrollmentManager } from "../hooks/usePasskeyEnrollmentManager";

/**
 * Passkeys Enrollment Benefits Details Component
 * This component renders the details about the benefits of using passkeys.
 */
function Details() {
  // Extract necessary methods and properties from the custom hook
  const { continuePasskeyEnrollment, texts } = usePasskeyEnrollmentManager();

  // Handle text fallbacks for button and field labels
  const buttonText = texts?.buttonText || "Continue";

  /**
   * Handles form submission.
   *
   * @param data - The form data containing username, password, and optional CAPTCHA.
   */
  const onCreateClick = async (data: CustomOptions) => {
    await continuePasskeyEnrollment(data);
  };

  return (
    <>
      <ULThemeList
        className="mb-4"
        items={[
          {
            label:
              texts?.passkeyBenefit1Title || "No need to remember a password",
            description:
              texts?.passkeyBenefit1Description ||
              "With passkeys, you can use things like your fingerprint or face to login.",
            icon: (
              <Fingerprint
                size={40}
                aria-label={texts?.passkeyBenefit1ImgAltText}
              />
            ),
          },
          {
            label:
              texts?.passkeyBenefit2Title || "Works on all of your devices",
            description:
              texts?.passkeyBenefit2Description ||
              "Passkeys will automatically be available across your synced devices.",
            icon: (
              <Smartphone
                size={40}
                aria-label={texts?.passkeyBenefit2ImgAltText}
              >
                <Globe size={15} />
              </Smartphone>
            ),
          },
          {
            label: texts?.passkeyBenefit3Title || "Keep your account safer",
            description:
              texts?.passkeyBenefit3Description ||
              "Passkeys offer state-of-the-art phishing resistance.",
            icon: (
              <ShieldCheck
                size={40}
                aria-label={texts?.passkeyBenefit3ImgAltText}
              />
            ),
          },
        ]}
        onItemClick={() => {}}
      />
      {/* Create Passkey button */}
      <ULThemeButton
        className="w-full"
        onClick={() => onCreateClick({ key: "passkey" })}
      >
        {buttonText}
      </ULThemeButton>
    </>
  );
}

export default Details;
