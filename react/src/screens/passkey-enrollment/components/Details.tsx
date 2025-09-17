import { CustomOptions } from "@auth0/auth0-acul-js/passkey-enrollment";

import {
  CheckMarkShieldAccent,
  CheckMarkShieldMask,
  DeviceGlobeAccent,
  DeviceGlobeMask,
  WebAuthPlatform,
} from "@/assets/icons";
import { ULThemeButton } from "@/components/ULThemeButton";
import ULThemeList from "@/components/ULThemeList";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

import { usePasskeyEnrollmentManager } from "../hooks/usePasskeyEnrollmentManager";

/**
 * Passkeys Enrollment Benefits Details Component
 * This component renders the details about the benefits of using passkeys.
 */
function Details() {
  // Extract necessary methods and properties from the custom hook
  const { continuePasskeyEnrollment, texts } = usePasskeyEnrollmentManager();

  // Handle text fallbacks for button and field labels
  const buttonText = texts?.createButtonText || "Create a passkey";

  // Using extractTokenValue utility to extract the Icons Color Value from CSS variable
  const iconColor = extractTokenValue("--ul-theme-color-icons");

  /**
   * Handles form submission.
   *
   * @param data - The form data containing username, password, and optional CAPTCHA.
   */
  const onCreateClick = async (data: CustomOptions) => {
    try {
      await continuePasskeyEnrollment(data);
    } catch (error) {
      console.error("Error during passkey enrollment:", error);
    }
  };

  // Helper function to render icons dynamically
  const renderIcon = (
    IconMask: React.ElementType,
    IconAccent: React.ElementType
  ) => (
    <div className="relative w-15 h-10 left-1.5">
      <IconMask
        className="absolute inline-block opacity-[0.5]"
        color={iconColor}
      />
      <IconAccent className="absolute inline-block" color={iconColor} />
    </div>
  );

  return (
    <>
      <ULThemeList
        className="mb-8"
        variant="icon"
        items={[
          {
            label:
              texts?.passkeyBenefit1Title || "No need to remember a password",
            description:
              texts?.passkeyBenefit1Description ||
              "With passkeys, you can use things like your fingerprint or face to login.",
            icon: (
              <div className="relative w-15 h-10 left-1.5">
                <WebAuthPlatform
                  className="absolute inline-block"
                  color={iconColor}
                />
              </div>
            ),
          },
          {
            label:
              texts?.passkeyBenefit2Title || "Works on all of your devices",
            description:
              texts?.passkeyBenefit2Description ||
              "Passkeys will automatically be available across your synced devices.",
            icon: renderIcon(DeviceGlobeMask, DeviceGlobeAccent),
          },
          {
            label: texts?.passkeyBenefit3Title || "Keep your account safer",
            description:
              texts?.passkeyBenefit3Description ||
              "Passkeys offer state-of-the-art phishing resistance.",
            icon: renderIcon(CheckMarkShieldMask, CheckMarkShieldAccent),
          },
        ]}
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
