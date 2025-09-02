import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { ULThemePrimaryButton } from "@/components/ULThemePrimaryButton";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Header from "./components/Header";
import { useResetPasswordEmailManager } from "./hooks/useResetPasswordEmailManager";

function ResetPasswordEmailScreen() {
  // Extracting attributes from hook made out of ResetPasswordEmailInstance class of Auth0 React SDK
  const { resetPasswordEmail, texts, handleResendEmail } =
    useResetPasswordEmailManager();
  const buttonText = texts?.resendLinkText || "Resend email";

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(resetPasswordEmail);
  document.title = texts?.pageTitle || "Login";

  return (
    // Applying UDS theme overrides using the "theme-universal" class
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <ULThemePrimaryButton
          variant="outline"
          type="button"
          className="w-full"
          onClick={handleResendEmail}
        >
          {buttonText}
        </ULThemePrimaryButton>
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default ResetPasswordEmailScreen;
