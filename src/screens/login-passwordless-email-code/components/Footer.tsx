import { ULThemeButton } from "@/components/ULThemeButton";

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
        <ULThemeButton
          variant="link"
          size="link"
          onClick={() => handleResendEmailCode()}
        >
          {footerLinkText}
        </ULThemeButton>
      )}
    </div>
  );
}

export default Footer;
