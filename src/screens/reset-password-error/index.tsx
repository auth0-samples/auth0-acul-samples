import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Header from "./components/Header";
import { useResetPasswordErrorManager } from "./hooks/resetPasswordErrorManager";

function ResetPasswordErrorScreen() {
  // Extracting attributes from hook made out of ResetPasswordErrorInstance class of Auth0 React SDK
  const { resetPasswordError, texts, locales } = useResetPasswordErrorManager();

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(resetPasswordError);
  document.title = texts?.pageTitle || locales.pageTitle;

  return (
    // Applying UDS theme overrides using the "theme-universal" class
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default ResetPasswordErrorScreen;
