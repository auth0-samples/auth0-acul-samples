import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useMfaEmailChallengeManager } from "../hooks/useMFAEmailChallengeManager";

function Header() {
  const { texts, locales } = useMfaEmailChallengeManager();
  const logoAltText = texts?.logoAltText || locales.header.logoAltText;
  const title = texts?.title || locales.header.title;
  const description = texts?.description || locales.header.description;

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{title}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">{description}</ULThemeSubtitle>
    </>
  );
}

export default Header;
