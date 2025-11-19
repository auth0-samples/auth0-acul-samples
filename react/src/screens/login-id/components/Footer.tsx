import ULThemeLink from "@/components/ULThemeLink";

import { useLoginIdManager } from "../hooks/useLoginIdManager";

function Footer() {
  const { signupLink, texts, locales } = useLoginIdManager();

  if (!signupLink) {
    return null;
  }

  return (
    <div className="mt-4 text-left">
      <span className="pr-1 text-body-text text-(length:--ul-theme-font-body-text-size) font-body">
        {texts?.signupActionText || locales?.footer?.signupActionText}
      </span>
      <ULThemeLink href={signupLink}>
        {texts?.signupActionLinkText || locales?.footer?.signupActionLinkText}
      </ULThemeLink>
    </div>
  );
}

export default Footer;
