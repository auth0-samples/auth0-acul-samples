import ULThemeLink from "@/components/ULThemeLink";

import { usePasskeyEnrollmentManager } from "../hooks/usePasskeyEnrollmentManager";

function Footer() {
  const { links, texts, abortPasskeyEnrollment } =
    usePasskeyEnrollmentManager();

  // Handle text fallbacks in component
  const continueButtonText =
    texts?.continueButtonText || "Continue without passkeys";
  const backButtonText = texts?.backButtonText || "Go back";

  return (
    <>
      <div className="mt-4 text-center">
        {continueButtonText && (
          <ULThemeLink
            href="javascript:void(0)"
            onClick={() => abortPasskeyEnrollment()}
          >
            {continueButtonText}
          </ULThemeLink>
        )}
      </div>
      <div className="mt-4 text-center">
        {backButtonText && (
          <ULThemeLink href={links?.back}>{backButtonText}</ULThemeLink>
        )}
      </div>
    </>
  );
}

export default Footer;
