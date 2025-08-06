import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeTitle from "@/components/ULThemeTitle";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";

import { useLoginPasswordManager } from "../hooks/useLoginPasswordManager";

function Header() {
  const { texts } = useLoginPasswordManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || "Welcome"}</ULThemeTitle>
      <ULThemeSubtitle>
        {texts?.description ||
          "Enter your password for My Company to continue to My App"}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
