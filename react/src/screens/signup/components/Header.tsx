import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useSignupManager } from "../hooks/useSignupManager";

function Header() {
  const { texts } = useSignupManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || "Welcome"}</ULThemeTitle>
      <ULThemeSubtitle>
        {texts?.description || "Sign up to continue to your application."}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
