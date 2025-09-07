import ULThemeLink from "@/components/ULThemeLink";

import { useLoginPasswordlessSmsOtpManager } from "../hooks/useLoginPasswordlessSmsOtpManager";

function Footer() {
  const { texts, handleResendOTP } = useLoginPasswordlessSmsOtpManager();

  // Handle text fallbacks in component
  const footerText = texts?.resendText || "Didn't receive a code?";
  const footerLinkText = texts?.resendActionText || "Resend";

  return (
    <div className="mt-4 text-center">
      <span className="pr-1 text-body-text text-(length:--ul-theme-font-body-text-size) font-body">
        {footerText}
      </span>
      {footerLinkText && (
        <ULThemeLink
          href="javascript:void(0)"
          onClick={() => handleResendOTP()}
        >
          {footerLinkText}
        </ULThemeLink>
      )}
    </div>
  );
}

export default Footer;
