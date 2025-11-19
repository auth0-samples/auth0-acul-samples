import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";
import { translate } from "@/utils/helpers/localeTranslate";

import { usePhoneIdentifierChallengeManager } from "../hooks/usePhoneIdentifierChallengeManager";

function Header() {
  const { texts, data, locales } = usePhoneIdentifierChallengeManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || locales.header.logoAltText;
  const phoneNumber = data?.phone || locales.header.phoneNumber;
  const defaultSmsDescription = translate(
    "header.smsDescriptionText",
    {
      phoneNumber: phoneNumber,
    },
    locales
  );
  const defaultVoiceDescription = translate(
    "header.voiceDescriptionText",
    {
      phoneNumber: phoneNumber,
    },
    locales
  );

  const appendPhoneNumber = (text?: string) =>
    text ? text + ` ${phoneNumber}` : "";

  const description =
    data?.messageType === "text"
      ? appendPhoneNumber(texts?.smsDescription) || defaultSmsDescription
      : appendPhoneNumber(texts?.voiceDescription) || defaultVoiceDescription;

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || locales.header.title}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">{description}</ULThemeSubtitle>
    </>
  );
}

export default Header;
