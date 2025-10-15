import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useMfaPushWelcomeManager } from "../hooks/useMfaPushWelcomeManager";

function Header() {
  const { texts } = useMfaPushWelcomeManager();
  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || "Secure Your Account"}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">
        {texts?.description ||
          `In order to continue, install the Auth0 Guardian app via the app store from your mobile device.`}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
