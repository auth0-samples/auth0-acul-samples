import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useLoginPasswordlessEmailCodeManager } from "../hooks/useLoginPasswordlessEmailCodeManager";

function Header() {
  const { texts, locales } = useLoginPasswordlessEmailCodeManager();

  // Use locales as fallback for SDK texts
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
