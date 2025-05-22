import React from "react";
import { useLoginPasswordManager } from "../hooks/useLoginPasswordManager";
import { rebaseLinkToCurrentOrigin } from "@/utils/urlUtils";

const Footer: React.FC = () => {
  const { loginPasswordInstance } = useLoginPasswordManager();
  const signupLink = loginPasswordInstance?.screen?.links?.signup;
  const localizedSignupLink = rebaseLinkToCurrentOrigin(signupLink);
  return (
    <div className="mt-4 text-left">
      <span className="text-sm pr-1">Don't have an account?</span>
      {localizedSignupLink && (
        <a
          href={localizedSignupLink}
          className="text-sm font-bold text-link hover:text-link/80 focus:bg-link/15 focus:rounded p-1"
        >
          Sign up
        </a>
      )}
    </div>
  );
};

export default Footer;
