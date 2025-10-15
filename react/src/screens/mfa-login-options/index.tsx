import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import ULThemeSeparator from "@/components/ULThemeSeparator";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Header from "./components/Header";
import MFALoginOptionsList from "./components/MFALoginOptionsList";
import { useMfaLoginOptionsManager } from "./hooks/useMFALoginOptionsManager";

function MFALoginOptions() {
  // Extracting attributes from hook made out of MFALoginOptionsInstance class of Auth0 React SDK
  const { mfaLoginOptions, texts } = useMfaLoginOptionsManager();

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(mfaLoginOptions);
  document.title = texts?.pageTitle || "List of other login methods";

  return (
    // Applying UDS theme overrides using the "theme-universal" class
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <ULThemeSeparator />
        <MFALoginOptionsList />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default MFALoginOptions;
