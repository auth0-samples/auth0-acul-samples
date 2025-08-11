import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Footer from "./components/Footer";
import Header from "./components/Header";
import IdentifierForm from "./components/IdentifierForm";
import { useLoginPasswordManager } from "./hooks/useLoginPasswordManager";

function LoginPasswordScreen() {
  // Extracting attributes from hook made out of LoginPasswordInstance class of Auth0 JS SDK
  const { loginPasswordInstance } = useLoginPasswordManager();

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(loginPasswordInstance);

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

export default LoginPasswordScreen;
