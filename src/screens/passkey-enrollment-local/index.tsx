import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Details from "./components/Details";
import Header from "./components/Header";
import { usePasskeyEnrollmentLocalManager } from "./hooks/usePasskeyEnrollmentLocalManager";

function PasskeyEnrollmentLocalScreen() {
  // Extracting attributes from hook made out of PasskeyEnrollmentLocalInstance class of Auth0 React ACUL SDK
  const { texts, locales, passkeyEnrollmentLocalInstance } =
    usePasskeyEnrollmentLocalManager();

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(passkeyEnrollmentLocalInstance);
  document.title = texts?.pageTitle || locales?.page?.title;

  return (
    // Applying UDS theme overrides using the "theme-universal" class
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <Details />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default PasskeyEnrollmentLocalScreen;
