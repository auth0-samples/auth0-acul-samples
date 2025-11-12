import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import ULThemeSeparator from "@/components/ULThemeSeparator";
import { applyAuth0Theme } from "@/utils/theme";

import Header from "./components/Header";
import MFALoginOptionsList from "./components/MFALoginOptionsList";
import { useMfaLoginOptionsManager } from "./hooks/useMFALoginOptionsManager";

function MFALoginOptions() {
  // Extracting attributes from hook made out of MFALoginOptionsInstance class of Auth0 React SDK
  const { mfaLoginOptions, texts, locales } = useMfaLoginOptionsManager();

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(mfaLoginOptions);
  document.title = texts?.pageTitle || locales.pageTitle;

  return (
    // Applying UDS theme overrides using the "theme-universal" class
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="p-0 pt-4 gap-0 w-(--prompt-width) min-h-(--prompt-min-height)">
        <Header />
        <ULThemeSeparator className="grow-0" />
        <MFALoginOptionsList />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default MFALoginOptions;
