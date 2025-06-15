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
          className="text-sm font-bold [color:var(--ul-theme-color-links-focused-components)] hover:[color:color-mix(in_srgb,var(--ul-theme-color-links-focused-components)_80%,transparent)] focus:[background-color:color-mix(in_srgb,var(--ul-theme-color-primary-button)_15%,transparent)] focus:rounded"
        >
          {footerLinkText}
        </a>
      )}
    </div>
  );
};

export default Footer;
