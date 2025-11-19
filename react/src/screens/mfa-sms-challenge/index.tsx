import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Footer from "./components/Footer";
import Header from "./components/Header";
import MfaSmsChallengeForm from "./components/MfaSmsChallengeForm";
import { useMfaSmsChallengeManager } from "./hooks/useMfaSmsChallengeManager";

function MfaSmsChallengeScreen() {
  // Extracting attributes from hook made out of MfaSmsChallenge instance of Auth0 React ACUL SDK
  const { mfaSmsChallenge, texts, locales } = useMfaSmsChallengeManager();

  applyAuth0Theme(mfaSmsChallenge);
  document.title = texts?.pageTitle || locales.page.title;

  return (
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <MfaSmsChallengeForm />
        <Footer />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default MfaSmsChallengeScreen;
