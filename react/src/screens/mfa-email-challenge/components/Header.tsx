import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useMfaEmailChallengeManager } from "../hooks/useMFAEmailChallengeManager";

function Header() {
  const { texts } = useMfaEmailChallengeManager();
  const logoAltText = texts?.logoAltText || "Application Logo";

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || "Verify Your Identity"}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">
        {texts?.description || "We've sent an email with your code to"}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
