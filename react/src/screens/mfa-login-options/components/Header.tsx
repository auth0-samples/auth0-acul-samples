import { ChevronLeft } from "lucide-react";

import ULThemeTitle from "@/components/ULThemeTitle";

import { useMfaLoginOptionsManager } from "../hooks/useMFALoginOptionsManager";

function Header() {
  const { texts, locales, handleReturnToPrevious } =
    useMfaLoginOptionsManager();

  return (
    <>
      <span className="flex items-center justify-start gap-2 px-4">
        <button type="button" onClick={handleReturnToPrevious}>
          <ChevronLeft size={24} color="#6f7780" />
        </button>
        <ULThemeTitle className="mt-0 mb-0">
          {texts?.title || locales.header.title}
        </ULThemeTitle>
      </span>
    </>
  );
}

export default Header;
