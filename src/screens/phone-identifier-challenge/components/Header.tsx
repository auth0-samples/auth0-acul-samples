import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { usePhoneIdentifierChallengeManager } from "../hooks/usePhoneIdentifierChallengeManager";

function Header() {
  const { texts, data } = usePhoneIdentifierChallengeManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";
  const phoneNumber = data?.phone || "your phone";
  const descriptionText =
    data?.messageType === "text"
      ? texts?.smsDescription || `We've sent a text message to: ${phoneNumber}`
      : texts?.voiceDescription ||
        `We've sent a 6-digit code via voice phone call to the following phone number: ${phoneNumber}`;

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || "Verify Your Identity"}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">{descriptionText}</ULThemeSubtitle>
    </>
  );
}

export default Header;
