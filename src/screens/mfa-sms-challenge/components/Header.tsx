import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useMfaSmsChallengeManager } from "../hooks/useMfaSmsChallengeManager";

function Header() {
  const { texts, data } = useMfaSmsChallengeManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";
  const phoneNumber = data?.phoneNumber || "your phone";

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || "Verify Your Identity"}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">
        {texts?.description || `We've sent a text message to: ${phoneNumber}`}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
