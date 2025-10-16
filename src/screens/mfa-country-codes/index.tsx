import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import MfaCountryCodesHeader from "./components/MfaCountryCodesHeader";
import MfaCountryCodesList from "./components/MfaCountryCodesList";
import { useMfaCountryCodesManager } from "./hooks/useMfaCountryCodesManager";

function MfaCountryCodesScreen() {
  // Extracting attributes from hook made out of MfaCountryCodes instance of Auth0 React ACUL SDK
  const { mfaCountryCodes, texts } = useMfaCountryCodesManager();

  applyAuth0Theme(mfaCountryCodes);
  document.title = texts?.pageTitle || "Select your country code | your app";

  return (
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <MfaCountryCodesHeader />
        <MfaCountryCodesList />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default MfaCountryCodesScreen;
