import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import ULThemeSeparator from "@/components/ULThemeSeparator";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import MfaPushList from "./components/MfaPushList";
import MfaPushListHeader from "./components/MfaPushListHeader";
import { useMfaPushListManager } from "./hooks/useMfaPushListManager";

function MfaPushListScreen() {
  // Extracting attributes from hook made out of MfaPushList instance of Auth0 React ACUL SDK
  const { texts, locales, mfaPushListInstance } = useMfaPushListManager();

  applyAuth0Theme(mfaPushListInstance);
  document.title = texts?.pageTitle || locales.page.title;

  return (
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="p-0 pt-4 gap-0 w-(--prompt-width) min-h-(--prompt-min-height)">
        <MfaPushListHeader />
        <ULThemeSeparator className="grow-0" />
        <MfaPushList />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default MfaPushListScreen;
