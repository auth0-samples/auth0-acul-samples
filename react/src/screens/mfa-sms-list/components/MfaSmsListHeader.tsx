import { ChevronLeft } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ULThemeSeparator from "@/components/ULThemeSeparator";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useMfaSmsListManager } from "../hooks/useMfaSmsListManager";

function MfaSmsListHeader() {
  const { texts, locales, handleBackAction } = useMfaSmsListManager();

  // Use locales as fallback to SDK texts
  const backText = texts?.backText || locales?.header?.backText;
  const titleText = texts?.title || locales?.header?.title;

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

export default MfaSmsListHeader;
