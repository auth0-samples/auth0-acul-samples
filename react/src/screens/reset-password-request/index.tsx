import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Footer from "./components/Footer";
import Header from "./components/Header";
import ResetPasswordRequestForm from "./components/ResetPasswordRequestForm";
import { useResetPasswordRequestManager } from "./hooks/resetPasswordRequestManager";
import locales from "./locales/en.json";

function ResetPasswordRequestScreen() {
  // Extracting attributes from hook made out of ResetPasswordRequestInstance class of Auth0 React SDK
  const { resetPasswordRequest, texts } = useResetPasswordRequestManager();

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(resetPasswordRequest);
  // Use locale strings with fallback to SDK texts
  document.title = texts?.pageTitle || locales.pageTitle;

  return (
    // Applying UDS theme overrides using the "theme-universal" class
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <ResetPasswordRequestForm />
        <Footer />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default ResetPasswordRequestScreen;
