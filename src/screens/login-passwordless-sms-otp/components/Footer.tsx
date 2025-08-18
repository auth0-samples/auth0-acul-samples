import ULThemeLink from "@/components/ULThemeLink";

import { useLoginPasswordlessSmsOtpManager } from "../hooks/useLoginPasswordlessSmsOtpManager";

function Footer() {
  const { texts, handleResendOTP } = useLoginPasswordlessSmsOtpManager();

  // Handle text fallbacks in component
  const footerText = texts?.footerText || "Didn't receive a code?";
  const footerLinkText = texts?.footerLinkText || "Resend";

  return (
    <div className="mt-4 text-left">
      <span className="text-sm pr-1">{footerText}</span>
      {footerLinkText && (
        <ULThemeLink onClick={() => handleResendOTP()}>
          {footerLinkText}
        </ULThemeLink>
      )}
    </div>
  );
}

export default Footer;
