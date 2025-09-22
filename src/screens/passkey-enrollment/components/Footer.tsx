import { ULThemeButton } from "@/components/ULThemeButton";
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
          <ULThemeButton
            variant="link"
            size="link"
            onClick={() => abortPasskeyEnrollment()}
          >
            {continueButtonText}
          </ULThemeButton>
        )}
      </div>
      <div className="mt-4 text-center">
        {links?.back && (
          <ULThemeLink href={links?.back}>{backButtonText}</ULThemeLink>
        )}
      </div>
    </>
  );
}

export default Footer;
