import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import MfaCountryCodesHeader from "./components/MfaCountryCodesHeader";
import MfaCountryCodesList from "./components/MfaCountryCodesList";
import { useMfaCountryCodesManager } from "./hooks/useMfaCountryCodesManager";

function MfaCountryCodesScreen() {
  // Extracting attributes from hook made out of MfaCountryCodes instance of Auth0 React ACUL SDK
  const { mfaCountryCodes, texts, locales } = useMfaCountryCodesManager();

  applyAuth0Theme(mfaCountryCodes);
  document.title = texts?.pageTitle || locales?.page?.title;

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
