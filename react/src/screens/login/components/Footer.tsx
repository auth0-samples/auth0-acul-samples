import ULThemeLink from "@/components/ULThemeLink";

import { useLoginManager } from "../hooks/useLoginManager";

function Footer() {
  const { texts, signupLink } = useLoginManager();

  if (!signupLink) {
    return null;
  }

  return (
    <div className="mt-6 text-left">
      <span className="text-sm theme-universal:text-body-text theme-universal:text-(length:--ul-theme-font-body-text-size) theme-universal:font-body-text">
        {texts?.signupActionText || "Don't have an account?"}{" "}
      </span>
      <ULThemeLink href={signupLink}>
        {texts?.signupActionLinkText || "Sign up"}
      </ULThemeLink>
    </div>
  );
}

export default Footer;
