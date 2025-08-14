// import IdentifierForm from "./components/IdentifierForm";
import { usePhoneIdentifierChallenge } from "@auth0/auth0-acul-react";

import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Footer from "./components/Footer";
import Header from "./components/Header";

function PhoneIdentifierChallenge() {
  const challenge = usePhoneIdentifierChallenge();
  // Extracting attributes from hook made out of LoginPasswordInstance class of Auth0 JS SDK
  //   const { screen, submitPhoneChallenge, resendCode, returnToPrevious } =
  //     challenge;

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(challenge);

  return (
    // Applying UDS theme overrides using the "theme-universal" class
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <Footer />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default PhoneIdentifierChallenge;
