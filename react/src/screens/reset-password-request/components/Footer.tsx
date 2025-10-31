import { ULThemeButton } from "@/components/ULThemeButton";

import { useResetPasswordRequestManager } from "../hooks/resetPasswordRequestManager";
function Footer() {
  const { texts, handleBackToLogin, locales } =
    useResetPasswordRequestManager();

  const returnToPreviousScreenText =
    texts?.backToLoginLinkText || locales.footer.backButton;

  const handleGoBackAction = async () => {
    await handleBackToLogin();
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
