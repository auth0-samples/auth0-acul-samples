import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useLoginManager } from "../hooks/useLoginManager";

function Header() {
  const { texts, locales } = useLoginManager();

  // Use locale strings as fallback to SDK texts
  const logoAltText = texts?.logoAltText || locales?.heading?.logoAltText;

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || locales?.heading?.title}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">
        {texts?.description || locales?.heading?.description}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
