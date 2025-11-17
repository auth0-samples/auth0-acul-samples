import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useMfaSmsEnrollmentManager } from "../hooks/useMfaSmsEnrollmentManager";

function Header() {
  const { texts, locales } = useMfaSmsEnrollmentManager();

  // Use locales as fallback to SDK texts
  const logoAltText = texts?.logoAltText || locales?.header?.logoAltText;
  const title = texts?.title || locales?.header?.title;
  const description = texts?.description || locales?.header?.description;

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{title}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">{description}</ULThemeSubtitle>
    </>
  );
}

export default Header;
