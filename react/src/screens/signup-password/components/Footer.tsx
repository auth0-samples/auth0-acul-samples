import ULThemeLink from "@/components/ULThemeLink";

import { useSignupPasswordManager } from "../hooks/useSignupPasswordManager";

function Footer() {
  const { editLink, texts, locales } = useSignupPasswordManager();

  if (!editLink) {
    return null;
  }

  // Use locale strings with fallback to SDK texts
  const backButtonText = texts?.backButtonText || locales.footer.backButton;

  return (
    <div className="mt-4 text-center">
      {editLink && <ULThemeLink href={editLink}>{backButtonText}</ULThemeLink>}
    </div>
  );
}

export default Footer;
