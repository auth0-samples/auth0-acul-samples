import ULThemeLink from "@/components/ULThemeLink";

import { useLoginIdManager } from "../hooks/useLoginIdManager";

function Footer() {
  const { signupLink, texts } = useLoginIdManager();

  if (!signupLink) {
    return null;
  }

  return (
    <div className="mt-4 text-left">
      <span className="pr-1 text-body-text text-(length:--ul-theme-font-body-text-size) font-body">
        {texts?.signupActionText || "Don't have an account?"}
      </span>
      <ULThemeLink href={signupLink}>
        {texts?.signupActionLinkText || "Sign up"}
      </ULThemeLink>
    </div>
  );
}

export default Footer;
