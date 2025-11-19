import { ULThemeButton } from "@/components/ULThemeButton";

import { usePhoneIdentifierEnrollmentManager } from "../hooks/usePhoneIdentifierEnrollmentManager";

function Footer() {
  const { texts, handleReturnToPrevious, locales } =
    usePhoneIdentifierEnrollmentManager();

  const returnToPreviousScreenText =
    texts?.backButtonText || locales.footer.backButtonText;

  const handleGoBackAction = async () => {
    await handleReturnToPrevious();
  };

  return (
    <div className="text-center space-y-2 mt-4">
      {/* Go Back Action */}
      <ULThemeButton onClick={handleGoBackAction} variant="link" size="link">
        {returnToPreviousScreenText}
      </ULThemeButton>
    </div>
  );
}

export default Footer;
