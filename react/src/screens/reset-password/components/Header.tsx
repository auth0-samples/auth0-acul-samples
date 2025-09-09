import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useResetPasswordManager } from "../hooks/useResetPasswordManager";

function Header() {
  const { texts } = useResetPasswordManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || "Change Your Password"}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">
        {texts?.description ||
          "Enter a new password below to change your password."}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
