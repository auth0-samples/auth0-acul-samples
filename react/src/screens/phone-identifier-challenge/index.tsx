import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Footer from "./components/Footer";
import Header from "./components/Header";
import PhoneIdentifierChallengeForm from "./components/PhoneIdentifierForm";
import { usePhoneIdentifierChallengeManager } from "./hooks/usePhoneIdentifierChallengeManager";

function PhoneIdentifierChallengeScreen() {
  // Extracting attributes from hook made out of PhoneIdentifierChallenge instance of Auth0 React ACUL SDK
  const { phoneIdentifierChallenge, texts } =
    usePhoneIdentifierChallengeManager();

  applyAuth0Theme(phoneIdentifierChallenge);
  document.title = texts?.pageTitle || "Enter your phone code to log in";

  return (
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <PhoneIdentifierChallengeForm />
        <Footer />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default PhoneIdentifierChallengeScreen;
