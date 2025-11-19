import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useLoginPasswordManager } from "../hooks/useLoginPasswordManager";

function Header() {
  const { texts, locales } = useLoginPasswordManager();

  // Use locale strings as fallback to SDK texts
  const logoAltText = texts?.logoAltText || locales?.heading?.logoAltText;

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || locales?.heading?.title}</ULThemeTitle>
      <ULThemeSubtitle>
        {texts?.description || locales?.heading?.description}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
