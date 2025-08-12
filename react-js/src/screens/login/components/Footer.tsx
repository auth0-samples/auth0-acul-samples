import ULThemeLink from "@/components/ULThemeLink";
import { rebaseLinkToCurrentOrigin } from "@/utils/helpers/urlUtils";

import { useLoginManager } from "../hooks/useLoginManager";

function Footer() {
  const { texts, signupLink, isSignupEnabled } = useLoginManager();

  if (!isSignupEnabled) {
    return null;
  }

  const localizedSignupLink = rebaseLinkToCurrentOrigin(signupLink);

  // Handle text fallbacks in component
  const footerText =
    texts?.footerText || texts?.signupActionText || "Don't have an account?";
  const signupLinkText =
    texts?.footerLinkText || texts?.signupActionLinkText || "Sign up";

  return (
    <div className="mt-4 text-left">
      <span className="pr-1 text-body-text text-(length:--ul-theme-font-body-text-size) font-body">
        {footerText}
      </span>
      {localizedSignupLink && (
        <ULThemeLink href={localizedSignupLink}>{signupLinkText}</ULThemeLink>
      )}
    </div>
  );
}

export default Footer;
