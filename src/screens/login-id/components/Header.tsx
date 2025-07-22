import ULthemeLogo from "@/components/ULthemeLogo";
import ULThemeTitle from "@/components/ULThemeTitle";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";

import { useLoginIdManager } from "../hooks/useLoginIdManager";

function Header() {
  const { texts } = useLoginIdManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || "Application Logo";

  return (
    <>
      <ULthemeLogo altText={logoAltText} />
      <ULThemeTitle>{texts?.title || "Welcome"}</ULThemeTitle>
      <ULThemeSubtitle>
        {texts?.description ||
          "Log in to dev-tenant to continue to my acul react."}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
