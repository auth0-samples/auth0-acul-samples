import ULThemeLink from "@/components/ULThemeLink";
import { rebaseLinkToCurrentOrigin } from "@/utils/helpers/urlUtils";

import { useLoginIdManager } from "../hooks/useLoginIdManager";

function Footer() {
  const { isSignupEnabled, signupLink, texts } = useLoginIdManager();

  if (!isSignupEnabled) {
    return null;
  }

  const localizedSignupLink = rebaseLinkToCurrentOrigin(signupLink);

  // Handle text fallbacks in component
  const footerText = texts?.footerText || "Don't have an account?";
  const footerLinkText = texts?.footerLinkText || "Sign up";

  return (
    <div className="mt-4 text-left">
      <span className="pr-1 text-body-text text-(length:--ul-theme-font-body-text-size) font-body">
        {footerText}
      </span>
      {localizedSignupLink && (
        <ULThemeLink href={localizedSignupLink}>{footerLinkText}</ULThemeLink>
      )}
    </div>
  );
}

export default Footer;
