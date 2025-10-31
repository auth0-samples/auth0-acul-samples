import { IdentifierType } from "@auth0/auth0-acul-react/types";

import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";
import { getIdentifierDetails } from "@/utils/helpers/identifierUtils";

import { useResetPasswordRequestManager } from "../hooks/resetPasswordRequestManager";

function Header() {
  const { texts, activeIdentifiers, locales } =
    useResetPasswordRequestManager();

  // Use helper to determine placeholder based on active identifiers
  const identifierDetails = getIdentifierDetails(
    (activeIdentifiers || undefined) as IdentifierType[] | undefined,
    texts
  );

  // Handle text fallbacks in component
  const logoAltText = texts?.logoAltText || locales.header.logoAlt;

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{texts?.title || locales.header.title}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">
        {identifierDetails.description}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
