import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useLoginManager } from "../hooks/useLoginManager";

function Header() {
  const { screen, locales } = useLoginManager();
  const { texts } = screen;

  // Use SDK texts with locale fallbacks
  const logoAltText = texts?.logoAltText || locales.header.logoAlt;
  const title = texts?.title || locales.header.title;
  const description = texts?.description || locales.header.description;

  return (
    <>
      <ULThemeLogo altText={logoAltText} />
      <ULThemeTitle>{title}</ULThemeTitle>
      <ULThemeSubtitle>{description}</ULThemeSubtitle>
    </>
  );
}

export default Header;
