import React from "react";
import { useSignupIdManager } from "../hooks/useSignupIdManager";
import { rebaseLinkToCurrentOrigin } from "@/utils/urlUtils";
const Footer: React.FC = () => {
  const { loginLink } = useSignupIdManager();
  const localizedLoginLink = rebaseLinkToCurrentOrigin(loginLink);

  return (
    <div className="mt-4 text-left">
      <span className="text-sm pr-1">Already have an account?</span>
      {localizedLoginLink && (
        <a
          href={localizedLoginLink}
          className="text-sm font-bold text-link hover:text-link/80 focus:bg-link/15 focus:rounded p-1"
        >
          Log in
        </a>
      )}
    </div>
  );
};

export default Footer;
