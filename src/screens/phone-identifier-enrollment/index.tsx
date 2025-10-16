import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Footer from "./components/Footer";
import PhoneIdentifierEnrollmentForm from "./components/PhoneEnrollmentForm";
import PhoneEnrollmentHeader from "./components/PhoneEnrollmentHeader";
import { usePhoneIdentifierEnrollmentManager } from "./hooks/usePhoneIdentifierEnrollmentManager";

function PhoneIdentifierEnrollmentScreen() {
  // Extracting attributes from hook made out of PhoneIdentifierEnrollment instance of Auth0 React ACUL SDK
  const { phoneIdentifierEnrollment, texts } =
    usePhoneIdentifierEnrollmentManager();

  applyAuth0Theme(phoneIdentifierEnrollment);
  document.title = texts?.pageTitle || "Use your phone number to log in";

  return (
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <PhoneEnrollmentHeader />
        <PhoneIdentifierEnrollmentForm />
        <Footer />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default PhoneIdentifierEnrollmentScreen;
