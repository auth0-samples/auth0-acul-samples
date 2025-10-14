import { ChevronLeft } from "lucide-react";

import ULThemeTitle from "@/components/ULThemeTitle";

import { useMfaEmailListManager } from "../hooks/useMFAEmailListManager";

function Header() {
  const { texts, handleBackAction } = useMfaEmailListManager();

  return (
    <>
      <ULThemeTitle>
        <span className="flex items-center gap-6">
          <button
            onClick={handleBackAction}
            aria-label={texts?.backText || "Go back"}
            className="p-1"
          >
            <ChevronLeft size={30} color="#6f7780" />
          </button>
          {texts?.title || "Enrolled Email Addresses"}
        </span>
      </ULThemeTitle>
    </>
  );
}

export default Header;
