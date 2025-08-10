import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useLoginManager } from "../hooks/useLoginManager";

function Header() {
  const { texts } = useLoginManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || "Welcome"}</ULThemeTitle>
      <ULThemeSubtitle>
        {texts?.description ||
          "Log in to dev-tenant to continue to my acul react."}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
