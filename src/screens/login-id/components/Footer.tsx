import React from "react";
import { useLoginIdManager } from "../hooks/useLoginIdManager";
import { rebaseLinkToCurrentOrigin } from "@/utils/helpers/urlUtils";

const Footer: React.FC = () => {
  const { loginIdInstance, texts } = useLoginIdManager();
  const signupLink = loginIdInstance?.screen?.links?.signup;
  const localizedSignupLink = rebaseLinkToCurrentOrigin(signupLink);

  // Handle text fallbacks in component
  const footerText = texts?.footerText || "Don't have an account?";
  const footerLinkText = texts?.footerLinkText || "Sign up";

  return (
    <div className="mt-4 text-left">
      <span className="text-sm pr-1">{footerText}</span>
      {localizedSignupLink && (
        <a
          href={localizedSignupLink}
          className="text-sm font-bold text-link hover:text-link/80 focus:bg-link/15 focus:rounded"
        >
          {footerLinkText}
        </a>
      )}
    </div>
  );
};

export default Footer;
