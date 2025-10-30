import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeTitle from "@/components/ULThemeTitle";

import { usePasskeyEnrollmentLocalManager } from "../hooks/usePasskeyEnrollmentLocalManager";

function Header() {
  const { texts, locales } = usePasskeyEnrollmentLocalManager();

  // Use Locales as fallback to SDK texts
  const titleText = texts?.title || locales?.heading?.title;
  const logoAltText = texts?.logoAltText || locales?.heading?.logoAltText;

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle className="mb-10">{titleText}</ULThemeTitle>
    </>
  );
}

export default Header;
