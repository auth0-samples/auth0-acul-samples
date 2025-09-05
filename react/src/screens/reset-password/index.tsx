import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Header from "./components/Header";
import IdentifierForm from "./components/IdentifierForm";
import { useResetPasswordManager } from "./hooks/useResetPasswordManager";

function ResetPasswordScreen() {
  // Extracting attributes from hook made out of ResetPasswordInstance class of Auth0 React SDK
  const { resetPassword, texts } = useResetPasswordManager();

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(resetPassword);
  document.title = texts?.pageTitle || "Login";

  return (
    // Applying UDS theme overrides using the "theme-universal" class
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <IdentifierForm />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default ResetPasswordScreen;
