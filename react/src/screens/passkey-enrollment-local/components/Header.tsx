import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeTitle from "@/components/ULThemeTitle";

import { usePasskeyEnrollmentLocalManager } from "../hooks/usePasskeyEnrollmentLocalManager";

function Header() {
  const { texts } = usePasskeyEnrollmentLocalManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle className="mb-10">
        {texts?.title || "Create a passkey on this device"}
      </ULThemeTitle>
    </>
  );
}

export default Header;
