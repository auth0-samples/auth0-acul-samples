import { ChevronLeft } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ULThemeSeparator from "@/components/ULThemeSeparator";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useMfaCountryCodesManager } from "../hooks/useMfaCountryCodesManager";

function MfaCountryCodesHeader() {
  const { texts, handleBackAction } = useMfaCountryCodesManager();

  const backText = texts?.backText || "Go back";
  const titleText = texts?.title || "Select your country code";

  return (
    <>
      {/* Header with back button and title */}
      <span className="flex items-center justify-start gap-6">
        <Tooltip>
          <TooltipTrigger
            onClick={handleBackAction}
            aria-label={backText}
            className="h-8 w-8 p-0 -ml-2 cursor-pointer"
          >
            <ChevronLeft size={24} />
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={0}
            className="bg-black text-white -mb-2 ml-0.5"
          >
            {backText}
          </TooltipContent>
        </Tooltip>

        <ULThemeTitle className="text-lg mt-0 mb-0">{titleText}</ULThemeTitle>
      </span>
      <ULThemeSeparator />
    </>
  );
}

export default MfaCountryCodesHeader;
