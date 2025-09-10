import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Footer from "./components/Footer";
import Header from "./components/Header";
import IdentifierForm from "./components/IdentifierForm";
import { useLoginPasswordlessEmailCodeManager } from "./hooks/useLoginPasswordlessEmailCodeManager";

function LoginPasswordlessEmailCodeScreen() {
  // Extracting attributes from hook made out of useLoginPasswordlessEmailCode hook of Auth0 React SDK
  const { loginPasswordlessEmailCode, texts } =
    useLoginPasswordlessEmailCodeManager();

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(loginPasswordlessEmailCode);
  document.title = texts?.pageTitle || "Enter your email code to log in";

  return (
    // Applying UDS theme overrides using the "theme-universal" class
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <IdentifierForm />
        <Footer />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default LoginPasswordlessEmailCodeScreen;
