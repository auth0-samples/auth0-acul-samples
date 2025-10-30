import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme";

import Footer from "./components/Footer";
import Header from "./components/Header";
import MfaEmailChallengeForm from "./components/MfaEmailChallengeForm";
import { useMfaEmailChallengeManager } from "./hooks/useMFAEmailChallengeManager";

function MFAEmailChallengeScreen() {
  // Extracting attributes from hook made out of MFAEmailChallengeInstance class of Auth0 React SDK
  const { mfaEmailChallenge, texts, locales } = useMfaEmailChallengeManager();

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(mfaEmailChallenge);
  document.title = texts?.pageTitle || locales.pageTitle;

  return (
    // Applying UDS theme overrides using the "theme-universal" class
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <MfaEmailChallengeForm />
        <Footer />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default MFAEmailChallengeScreen;
