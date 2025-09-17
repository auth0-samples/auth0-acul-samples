import ULThemeLink from "@/components/ULThemeLink";
import { rebaseLinkToCurrentOrigin } from "@/utils/helpers/urlUtils";

import { usePasskeyEnrollmentManager } from "../hooks/usePasskeyEnrollmentManager";

function Footer() {
  const { links, texts, abortPasskeyEnrollment } =
    usePasskeyEnrollmentManager();

  // localize and rebase the back link to the current origin
  const localizedBackButtonLink = rebaseLinkToCurrentOrigin(links?.back);

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
        {localizedBackButtonLink && (
          <ULThemeLink href={localizedBackButtonLink}>
            {backButtonText}
          </ULThemeLink>
        )}
      </div>
    </>
  );
}

export default Footer;
