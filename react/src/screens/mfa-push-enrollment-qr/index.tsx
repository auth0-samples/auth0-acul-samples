import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Header from "./components/Header";
import MfaPushEnrollmentQRForm from "./components/MfaPushEnrollmentQRForm";
import { useMfaPushEnrollmentQRManager } from "./hooks/useMfaPushEnrollmentQRManager";

function MfaPushEnrollmentQRScreen() {
  // Extracting attributes from hook made out of MfaPushEnrollmentQR instance of Auth0 React ACUL SDK
  const { texts, locales, mfaPushEnrollmentQR } =
    useMfaPushEnrollmentQRManager();

  applyAuth0Theme(mfaPushEnrollmentQR);
  document.title = texts?.pageTitle || locales.page.title;

  return (
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <MfaPushEnrollmentQRForm />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default MfaPushEnrollmentQRScreen;
