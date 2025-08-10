import ULThemeLink from "@/components/ULThemeLink";
import { rebaseLinkToCurrentOrigin } from "@/utils/helpers/urlUtils";

import { useLoginManager } from "../hooks/useLoginManager";

function Footer() {
  const { texts, signupLink, isSignupEnabled } = useLoginManager();

  // Handle text fallbacks in component
  const footerText =
    texts?.footerText || texts?.signupActionText || "Don't have an account?";
  const signupLinkText =
    texts?.footerLinkText || texts?.signupActionLinkText || "Sign up";

  const localizedSignupLink =
    signupLink && rebaseLinkToCurrentOrigin(signupLink);

  return (
    <div className="mt-4 text-left">
      {isSignupEnabled && localizedSignupLink && (
        <div className="text-sm">
          <span className="text-body-text">{footerText} </span>
          <ULThemeLink href={localizedSignupLink}>{signupLinkText}</ULThemeLink>
        </div>
      )}
    </div>
  );
}

export default Footer;
