import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import ULThemeSeparator from "@/components/ULThemeSeparator";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Footer from "./components/Footer";
import Header from "./components/Header";
import MfaPushChallengeForm from "./components/MfaPushChallengeForm";
import { useMfaPushChallengeManager } from "./hooks/useMfaPushChallengeManager";

function MfaPushChallengeScreen() {
  // Extracting attributes from hook made out of MfaPushChallenge instance of Auth0 React ACUL SDK
  const { mfaPushChallenge, texts } = useMfaPushChallengeManager();
  const separatorText = texts?.separatorText || "OR";

  applyAuth0Theme(mfaPushChallenge);
  document.title = texts?.pageTitle || "Verify Your Identity";

  return (
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <MfaPushChallengeForm />
        <ULThemeSeparator text={separatorText} />
        <Footer />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default MfaPushChallengeScreen;
