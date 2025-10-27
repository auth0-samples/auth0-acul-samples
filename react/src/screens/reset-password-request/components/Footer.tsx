import { ULThemeButton } from "@/components/ULThemeButton";

import { useResetPasswordRequestManager } from "../hooks/resetPasswordRequestManager";
import locales from "../locales/en.json";
function Footer() {
  const { texts, handleBackToLogin } = useResetPasswordRequestManager();

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
