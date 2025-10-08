import ULThemeCard from "@/components/ULThemeCard";
import ULThemePageLayout from "@/components/ULThemePageLayout";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import MfaSmsList from "./components/MfaSmsList";
import MfaSmsListHeader from "./components/MfaSmsListHeader";
import { useMfaSmsListManager } from "./hooks/useMfaSmsListManager";

function MfaSmsListScreen() {
  // Extracting attributes from hook made out of MfaSmsList instance of Auth0 React ACUL SDK
  const { mfasmsList, texts } = useMfaSmsListManager();

  applyAuth0Theme(mfasmsList);
  document.title =
    texts?.pageTitle || "List of available phone numbers | your app";

  return (
    <ULThemePageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <MfaSmsListHeader />
        <MfaSmsList />
      </ULThemeCard>
    </ULThemePageLayout>
  );
}

export default MfaSmsListScreen;
