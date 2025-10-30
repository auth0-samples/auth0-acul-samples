import ULThemeLink from "@/components/ULThemeLink";

import { useLoginIdManager } from "../hooks/useLoginIdManager";

function Footer() {
  const { screen, transaction, locales } = useLoginIdManager();
  const { texts, signupLink } = screen;
  const { isSignupEnabled } = transaction;

  if (!isSignupEnabled || !signupLink) {
    return null;
  }

  // Use SDK texts with locale fallbacks
  const footerText = texts?.footerText || locales.footer.text;
  const footerLinkText = texts?.footerLinkText || locales.footer.linkText;

  return (
    <div className="mt-4 text-left">
      <span className="pr-1 text-body-text text-(length:--ul-theme-font-body-text-size) font-body">
        {footerText}
      </span>
      <ULThemeLink href={signupLink}>{footerLinkText}</ULThemeLink>
    </div>
  );
}

export default Footer;
