import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useMfaSmsEnrollmentManager } from "../hooks/useMfaSmsEnrollmentManager";

function Header() {
  const { texts } = useMfaSmsEnrollmentManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || "Secure Your Account"}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">
        {texts?.description ||
          "Enter your phone number below. An SMS will be sent to that number with a code to enter on the next screen."}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
