import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useSignupIdManager } from "../hooks/useSignupIdManager";

function Header() {
  const { texts } = useSignupIdManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || "Welcome"}</ULThemeTitle>
      <ULThemeSubtitle>
        {texts?.description ||
          "Sign up to dev-tenant to continue to All applications."}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
