import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Header from "./components/Header";
import MfaPushWelcomeForm from "./components/MfaPushWelcomeForm";
import { useMfaPushWelcomeManager } from "./hooks/useMfaPushWelcomeManager";

function MfaPushWelcomeScreen() {
  // Extracting attributes from hook made out of MfaPushWelcome instance of Auth0 React ACUL SDK
  const { texts, mfaPushWelcome } = useMfaPushWelcomeManager();

  applyAuth0Theme(mfaPushWelcome);
  document.title =
    texts?.pageTitle || "Install the application | All Applications";

  return (
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <MfaPushWelcomeForm />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default MfaPushWelcomeScreen;
