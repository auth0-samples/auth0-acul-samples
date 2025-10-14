import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import MfaPushList from "./components/MfaPushList";
import MfaPushListHeader from "./components/MfaPushListHeader";
import { useMfaPushListManager } from "./hooks/useMfaPushListManager";

function MfaPushListScreen() {
  // Extracting attributes from hook made out of MfaPushList instance of Auth0 React ACUL SDK
  const { mfaPushListInstance, texts } = useMfaPushListManager();

  applyAuth0Theme(mfaPushListInstance);
  document.title = texts?.pageTitle || "List of available devices | My App";

  return (
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <MfaPushListHeader />
        <MfaPushList />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default MfaPushListScreen;
