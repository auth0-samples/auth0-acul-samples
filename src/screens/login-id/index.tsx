import AlternativeLogins from "./components/AlternativeLogins";
import Footer from "./components/Footer";
import Header from "./components/Header";
import IdentifierForm from "./components/IdentifierForm";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import ULThemeCard from "@/components/ULThemeCard";

import { useLoginIdManager } from "./hooks/useLoginIdManager";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

function LoginIdScreen() {
  const { loginIdInstance, texts } = useLoginIdManager();

  document.title = texts?.pageTitle || "Login";

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(loginIdInstance);

  return (
    //Applying UDS theme overrides using the "theme-universal" class
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <IdentifierForm />
        <Footer />
        <AlternativeLogins />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default LoginIdScreen;
