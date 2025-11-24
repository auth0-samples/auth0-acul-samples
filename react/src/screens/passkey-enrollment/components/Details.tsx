import { useErrors } from "@auth0/auth0-acul-react/passkey-enrollment";
import { CustomOptions, ErrorItem } from "@auth0/auth0-acul-react/types";

import {
  CheckMarkShieldAccent,
  CheckMarkShieldMask,
  DeviceGlobeAccent,
  DeviceGlobeMask,
  WebAuthPlatform,
} from "@/assets/icons";
import { ULThemeButton } from "@/components/ULThemeButton";
import ULThemeAlert, { ULThemeAlertTitle } from "@/components/ULThemeError";
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
  const { continuePasskeyEnrollment, texts, locales } =
    usePasskeyEnrollmentManager();

  // Use Locales as fallback to SDK texts
  const buttonText =
    texts?.createButtonText || locales.details.createPasskeyText;
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
  const passkeyBenefit3Title =
    texts?.passkeyBenefit3Title || locales.details.passkeyBenefit3Title;
  const passkeyBenefit3Description =
    texts?.passkeyBenefit3Description ||
    locales.details.passkeyBenefit3Description;

  // Using extractTokenValue utility to extract the Icons Color Value from CSS variable
  const iconColor = extractTokenValue("--ul-theme-color-icons");

  const { errors, hasError, dismiss } = useErrors();

  // Get general errors (not field-specific)
  const generalErrors: ErrorItem[] = errors
    .byType("auth0")
    .filter((err) => !err.field);

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
      {/* Display general errors */}
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
          icon={renderIcon(WebAuthPlatform, undefined, "opacity-[1]")}
        >
          <ULThemeListTitle children={passkeyBenefit1Title}></ULThemeListTitle>
          <ULThemeListDescription
            children={passkeyBenefit1Description}
          ></ULThemeListDescription>
        </ULThemeListItem>

        <ULThemeListItem icon={renderIcon(DeviceGlobeMask, DeviceGlobeAccent)}>
          <ULThemeListTitle children={passkeyBenefit2Title}></ULThemeListTitle>
          <ULThemeListDescription
            children={passkeyBenefit2Description}
          ></ULThemeListDescription>
        </ULThemeListItem>

        <ULThemeListItem
          icon={renderIcon(CheckMarkShieldMask, CheckMarkShieldAccent)}
        >
          <ULThemeListTitle children={passkeyBenefit3Title}></ULThemeListTitle>
          <ULThemeListDescription
            children={passkeyBenefit3Description}
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
