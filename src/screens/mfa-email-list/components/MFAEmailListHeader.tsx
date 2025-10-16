import { ChevronLeft } from "lucide-react";

import ULThemeTitle from "@/components/ULThemeTitle";

import { useMfaEmailListManager } from "../hooks/useMFAEmailListManager";

function MFAEmailListHeader() {
  const { texts, handleBackAction } = useMfaEmailListManager();

  return (
    <>
      <span className="flex items-center justify-start gap-4 px-7">
        <button
          type="button"
          onClick={handleBackAction}
          aria-label={texts?.backText || "Go back"}
          className="p-1"
        >
          <ChevronLeft size={30} color="#6f7780" />
        </button>
        <ULThemeTitle className="mt-0 mb-0">
          {texts?.title || "Enrolled Email Addresses"}
        </ULThemeTitle>
      </span>
    </>
  );
}

export default MFAEmailListHeader;
