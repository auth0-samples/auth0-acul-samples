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
      <span className="text-body [font-weight:var(--font-weight-body)] text-body-text pr-1">
        {footerText}
      </span>
      {localizedSignupLink && (
        <a
          href={localizedSignupLink}
          className="text-link [font-weight:var(--font-weight-link)] text-link-focus hover:opacity-80 focus:bg-base-focus/15 focus:rounded [text-decoration:var(--text-decoration-link)]"
        >
          {footerLinkText}
        </a>
      )}
    </div>
  );
};

export default Footer;
