import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useLoginManager } from "../hooks/useLoginManager";

function Header() {
  const { texts } = useLoginManager();

  const logoAltText = texts?.logoAltText || "Application Logo";

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || "Welcome"}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">
        {texts?.description || "Log in to continue"}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
