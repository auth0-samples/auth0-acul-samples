import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useMfaPushWelcomeManager } from "../hooks/useMfaPushWelcomeManager";

function Header() {
  const { texts, locales } = useMfaPushWelcomeManager();

  // Use Locales as fallback to SDK texts
  const titleText = texts?.title || locales.heading.title;
  const descriptionText = texts?.description || locales.heading.description;
  const logoAltText = texts?.logoAltText || locales.heading.logoAltText;

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{titleText}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">{descriptionText}</ULThemeSubtitle>
    </>
  );
}

export default Header;
