import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme";

import Header from "./components/Header";
import { useResetPasswordSuccessManager } from "./hooks/resetPasswordSuccessManager";

function ResetPasswordSuccessScreen() {
  // Extracting attributes from hook made out of ResetPasswordSuccessInstance class of Auth0 React SDK
  const { resetPasswordSuccess, texts, locales } =
    useResetPasswordSuccessManager();

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(resetPasswordSuccess);
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

export default ResetPasswordSuccessScreen;
