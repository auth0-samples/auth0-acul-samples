import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Header from "./components/Header";
import { useMfaEnrollResultManager } from "./hooks/useMfaEnrollResultManager";

function MfaEnrollResult() {
  // Extracting attributes from hook made out of MfaEnrollResultInstance class of Auth0 React SDK
  const { MfaEnrollResult, texts } = useMfaEnrollResultManager();

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(MfaEnrollResult);
  document.title = texts?.pageTitle || "MFA enrollment status";

  return (
    // Applying UDS theme overrides using the "theme-universal" class
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default MfaEnrollResult;
