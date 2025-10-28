import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useMfaBeginEnrollOptionsManager } from "../hooks/useMFABeginEnrollOptionsManager";

function Header() {
  const { texts } = useMfaBeginEnrollOptionsManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || "Keep Your Account Safe"}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">
        {texts?.description || "Add another authentication method."}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
