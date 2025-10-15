import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useEmailIdentifierChallengeManager } from "../hooks/useEmailIdentifierChallengeManager";

function Header() {
  const { texts, data } = useEmailIdentifierChallengeManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";
  const email = data?.email || "your email";

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || "Verify Your Identity"}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">
        {texts?.description ||
          `We've sent an email with your code to: ${email}`}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
