import { CustomOptions } from "@auth0/auth0-acul-react/types";

import {
  CheckMarkShieldAccent,
  CheckMarkShieldMask,
  DeviceGlobeAccent,
  DeviceGlobeMask,
  WebAuthPlatform,
} from "@/assets/icons";
import { ULThemeButton } from "@/components/ULThemeButton";
import {
  ULThemeList,
  ULThemeListDescription,
  ULThemeListItem,
  ULThemeListTitle,
} from "@/components/ULThemeList";
import { cn } from "@/lib/utils";
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
   * @param data - (Optional) Form custom data
   */
  const onCreateClick = async (data?: CustomOptions) => {
    continuePasskeyEnrollment(data);
  };

  // Helper function to render icons dynamically
  const renderIcon = (
    IconMask: React.ElementType,
    IconAccent?: React.ElementType,
    className?: string
  ) => (
    <div className="relative w-15 h-10 left-1.5">
      <IconMask
        className={cn("absolute inline-block opacity-[0.5]", className)}
        color={iconColor}
      />
      {IconAccent && (
        <IconAccent className="absolute inline-block" color={iconColor} />
      )}
    </div>
  );

  return (
    <>
      <ULThemeList variant="icon">
        <ULThemeListItem
          icon={renderIcon(WebAuthPlatform, undefined, "opacity-[1]")}
        >
          <ULThemeListTitle
            children={
              texts?.passkeyBenefit1Title || "No need to remember a password"
            }
          ></ULThemeListTitle>
          <ULThemeListDescription
            children={
              texts?.passkeyBenefit1Description ||
              "With passkeys, you can use things like your fingerprint or face to login."
            }
          ></ULThemeListDescription>
        </ULThemeListItem>

        <ULThemeListItem icon={renderIcon(DeviceGlobeMask, DeviceGlobeAccent)}>
          <ULThemeListTitle
            children={
              texts?.passkeyBenefit2Title || "Works on all of your devices"
            }
          ></ULThemeListTitle>
          <ULThemeListDescription
            children={
              texts?.passkeyBenefit2Description ||
              "Passkeys will automatically be available across your synced devices."
            }
          ></ULThemeListDescription>
        </ULThemeListItem>

        <ULThemeListItem
          icon={renderIcon(CheckMarkShieldMask, CheckMarkShieldAccent)}
        >
          <ULThemeListTitle
            children={texts?.passkeyBenefit3Title || "Keep your account safer"}
          ></ULThemeListTitle>
          <ULThemeListDescription
            children={
              texts?.passkeyBenefit3Description ||
              "Passkeys offer state-of-the-art phishing resistance."
            }
          ></ULThemeListDescription>
        </ULThemeListItem>
      </ULThemeList>

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
