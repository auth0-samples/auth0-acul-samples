import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useMfaPushEnrollmentQRManager } from "../hooks/useMfaPushEnrollmentQRManager";

function Header() {
  const { texts } = useMfaPushEnrollmentQRManager();
  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || "Secure Your Account"}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">
        {texts?.description ||
          `Scan the QR Code below using the Guardian app on your mobile device.`}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
