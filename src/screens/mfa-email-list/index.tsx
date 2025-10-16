import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import ULThemeSeparator from "@/components/ULThemeSeparator";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import MFAEmailListHeader from "./components/MFAEmailListHeader";
import MFAEmailListOptions from "./components/MFAEmailListOptions";
import { useMfaEmailListManager } from "./hooks/useMFAEmailListManager";

function MFAEmailList() {
  // Extracting attributes from hook made out of MFAEmailListInstance class of Auth0 React SDK
  const { mfaEmailList, texts } = useMfaEmailListManager();

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(mfaEmailList);
  document.title = texts?.pageTitle || "List of available email addresses";

  return (
    // Applying UDS theme overrides using the "theme-universal" class
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="p-0 pt-4 gap-0 w-(--prompt-width) min-h-(--prompt-min-height)">
        <MFAEmailListHeader />
        <ULThemeSeparator className="grow-0" />
        <MFAEmailListOptions />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default MFAEmailList;
