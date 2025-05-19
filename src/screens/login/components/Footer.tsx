import React from "react";
import { useLoginManager } from "../hooks/useLoginManager";

const Footer: React.FC = () => {
  const { loginInstance } = useLoginManager();
  const signupLink = loginInstance?.screen?.links?.signup;

  return (
    <div className="mt-4 text-left">
      <span className="text-sm pr-1">Don't have an account?</span>
      {signupLink && (
        <a
          href={signupLink}
          className="text-sm font-bold text-link hover:text-link/50 focus:bg-link/15 focus:rounded p-1"
        >
          Sign up
        </a>
      )}
    </div>
  );
};

export default Footer;
