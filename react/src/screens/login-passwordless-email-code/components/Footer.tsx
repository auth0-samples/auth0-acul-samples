import ULThemeLink from "@/components/ULThemeLink";

import { useLoginPasswordlessEmailCodeManager } from "../hooks/useLoginPasswordlessEmailCodeManager";

function Footer() {
  const { texts, handleResendEmailCode } =
    useLoginPasswordlessEmailCodeManager();

  // Handle text fallbacks in component
  const footerText = texts?.resendText || "Didn't receive an email?";
  const footerLinkText = texts?.resendActionText || "Resend";

  return (
    <div className="mt-4 text-center">
      <span className="pr-1 text-body-text text-(length:--ul-theme-font-body-text-size) font-body">
        {footerText}
      </span>
      {footerLinkText && (
        <ULThemeLink
          href="javascript:void(0)"
          onClick={() => handleResendEmailCode()}
        >
          {footerLinkText}
        </ULThemeLink>
      )}
    </div>
  );
}

export default Footer;
