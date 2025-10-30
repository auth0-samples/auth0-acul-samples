import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Details from "./components/Details";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { usePasskeyEnrollmentManager } from "./hooks/usePasskeyEnrollmentManager";

function PasskeyEnrollmentScreen() {
  // Extracting attributes from hook made out of PasskeyEnrollmentInstance class of Auth0 React ACUL SDK
  const { texts, locales, passkeyEnrollmentInstance } =
    usePasskeyEnrollmentManager();

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(passkeyEnrollmentInstance);
  document.title = texts?.pageTitle || locales.page.title;

  return (
    // Applying UDS theme overrides using the "theme-universal" class
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <Details />
        <Footer />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default PasskeyEnrollmentScreen;
