import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useSignupPasswordManager } from "../hooks/useSignupPasswordManager";

function Header() {
  const { texts } = useSignupPasswordManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || "Create Your Account"}</ULThemeTitle>
      <ULThemeSubtitle>
        {texts?.description ||
          "Set your password for dev-xyz to continue to my application"}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
