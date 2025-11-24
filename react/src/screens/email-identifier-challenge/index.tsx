import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import EmailIdentifierChallengeForm from "./components/EmailIdentifierChallengeForm";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useEmailIdentifierChallengeManager } from "./hooks/useEmailIdentifierChallengeManager";

function EmailIdentifierChallengeScreen() {
  // Extracting attributes from hook made out of EmailIdentifierChallenge instance of Auth0 React ACUL SDK
  const { emailIdentifierChallenge, texts, locales } =
    useEmailIdentifierChallengeManager();

  applyAuth0Theme(emailIdentifierChallenge);
  document.title = texts?.pageTitle || locales?.page?.title;

  return (
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <EmailIdentifierChallengeForm />
        <Footer />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default EmailIdentifierChallengeScreen;
