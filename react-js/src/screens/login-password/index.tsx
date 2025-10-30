import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme";

import Footer from "./components/Footer";
import Header from "./components/Header";
import LoginPasswordForm from "./components/LoginPasswordForm";
import { useLoginPasswordManager } from "./hooks/useLoginPasswordManager";

function LoginPasswordScreen() {
  const { loginPasswordInstance, screen, locales } = useLoginPasswordManager();

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(loginPasswordInstance);

  // Set page title
  document.title = screen.texts?.pageTitle || locales.page.title;

  return (
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <LoginPasswordForm />
        <Footer />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default LoginPasswordScreen;
