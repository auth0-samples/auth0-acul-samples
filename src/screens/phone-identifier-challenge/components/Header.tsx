import { useScreen } from "@auth0/auth0-acul-react/phone-identifier-challenge";

import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

function Header() {
  const screen = useScreen();
  const { texts } = screen;

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";
  console.log("texts", texts?.description, texts?.title);

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || "Verify Your Identity"}</ULThemeTitle>
      <ULThemeSubtitle>
        {texts?.smsDescription ||
          "We've sent a text message to your phone number."}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
