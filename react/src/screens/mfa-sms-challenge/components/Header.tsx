import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useMfaSmsChallengeManager } from "../hooks/useMfaSmsChallengeManager";

function Header() {
  const { texts, data, locales } = useMfaSmsChallengeManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || locales.header.logoAlt;
  const title = texts?.title || locales.header.title;
  const phoneNumber = data?.phoneNumber || "";
  const description = texts?.description || locales.header.description;

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{title}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">
        {description} {phoneNumber}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
