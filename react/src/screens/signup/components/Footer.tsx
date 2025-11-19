import ULThemeLink from "@/components/ULThemeLink";

import { useSignupManager } from "../hooks/useSignupManager";

function Footer() {
  const { loginLink, texts, locales } = useSignupManager();

  if (!loginLink) {
    return null;
  }

  // Handle text fallbacks in component
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
