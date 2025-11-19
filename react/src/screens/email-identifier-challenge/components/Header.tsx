import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";
import { translate } from "@/utils/helpers/localeTranslate";

import { useEmailIdentifierChallengeManager } from "../hooks/useEmailIdentifierChallengeManager";

function Header() {
  const { texts, data, locales } = useEmailIdentifierChallengeManager();

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || locales?.header?.logoAlt;
  const email = data?.email || locales?.header?.emailFallback;
  const description =
    texts?.description || translate("header.description", { email }, locales);

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || locales?.header?.title}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">{description}</ULThemeSubtitle>
    </>
  );
}

export default Header;
