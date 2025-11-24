import ULThemeLink from "@/components/ULThemeLink";

import { useSignupIdManager } from "../hooks/useSignupIdManager";

function Footer() {
  const { loginLink, texts, locales } = useSignupIdManager();

  if (!loginLink) {
    return null;
  }

  // Use locale strings with fallback to SDK texts
  const footerText = texts?.footerText || locales.footer.text;
  const footerLinkText = texts?.footerLinkText || locales.footer.linkText;

  return (
    <div className="mt-4 text-left">
      <span className="pr-1 text-body-text text-(length:--ul-theme-font-body-text-size) font-body">
        {footerText}
      </span>
      {loginLink && (
        <ULThemeLink href={loginLink}>{footerLinkText}</ULThemeLink>
      )}
    </div>
  );
}

export default Footer;
