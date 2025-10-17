import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { usePhoneIdentifierEnrollmentManager } from "../hooks/usePhoneIdentifierEnrollmentManager";

function Header() {
  const { texts } = usePhoneIdentifierEnrollmentManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || "Verify Your Identity"}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">
        {texts?.description ||
          "We will send a 6-digit code to the following phone number:"}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
