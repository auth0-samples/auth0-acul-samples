import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useMfaPushChallengeManager } from "../hooks/useMfaPushChallengeManager";

function Header() {
  const { texts } = useMfaPushChallengeManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || "Verify Your Identity"}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">
        {texts?.description ||
          `We’ve sent a notification to the following device via the app:`}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
