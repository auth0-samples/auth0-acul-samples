import ULThemeLink from "@/components/ULThemeLink";

import { useLoginManager } from "../hooks/useLoginManager";

function Footer() {
  const { texts, locales, signupLink } = useLoginManager();

  if (!signupLink) {
    return null;
  }

  return (
    <div className="mt-6 text-left">
      <span className="text-sm theme-universal:text-body-text theme-universal:text-(length:--ul-theme-font-body-text-size) theme-universal:font-body-text">
        {texts?.signupActionText || locales?.footer?.signupActionText}{" "}
      </span>
      <ULThemeLink href={signupLink}>
        {texts?.signupActionLinkText || locales?.footer?.signupActionLinkText}
      </ULThemeLink>
    </div>
  );
}

export default Footer;
