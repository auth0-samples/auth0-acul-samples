import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Header from "./components/Header";
import MFAEnrollOptions from "./components/MFAEnrollOptions";
import { useMfaBeginEnrollOptionsManager } from "./hooks/useMFABeginEnrollOptionsManager";

function MFABeginEnrollOptions() {
  // Extracting attributes from hook made out of MFABeginEnrollOptionsInstance class of Auth0 React SDK
  const { mfaBeginEnrollOptions, texts } = useMfaBeginEnrollOptionsManager();

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(mfaBeginEnrollOptions);
  document.title = texts?.pageTitle || "Add another authentication method";

  return (
    // Applying UDS theme overrides using the "theme-universal" class
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <MFAEnrollOptions />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default MFABeginEnrollOptions;
