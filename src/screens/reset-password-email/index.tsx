import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Header from "./components/Header";
import ResendEmail from "./components/ResendEmail";
import { useResetPasswordEmailManager } from "./hooks/useResetPasswordEmailManager";

function ResetPasswordEmailScreen() {
  // Extracting attributes from hook made out of ResetPasswordEmailInstance class of Auth0 React SDK
  const { resetPasswordEmail, texts } = useResetPasswordEmailManager();

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(resetPasswordEmail);
  document.title = texts?.pageTitle || "Check your email";

  return (
    // Applying UDS theme overrides using the "theme-universal" class
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <ResendEmail />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default ResetPasswordEmailScreen;
