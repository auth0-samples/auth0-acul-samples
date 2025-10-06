import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Footer from "./components/Footer";
import Header from "./components/Header";
import MfaSmsEnrollmentForm from "./components/MfaSmsEnrollmentForm";
import { useMfaSmsEnrollmentManager } from "./hooks/useMfaSmsEnrollmentManager";

function MfaSmsEnrollmentScreen() {
  // Extracting attributes from hook made out of MfaSmsEnrollment instance of Auth0 React ACUL SDK
  const { mfaSmsEnrollment, texts } = useMfaSmsEnrollmentManager();

  applyAuth0Theme(mfaSmsEnrollment);
  document.title = texts?.pageTitle || "Secure Your Account - MFA";

  return (
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <MfaSmsEnrollmentForm />
        <Footer />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default MfaSmsEnrollmentScreen;
