import { ChevronLeft } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useMfaPushListManager } from "../hooks/useMfaPushListManager";

function MfaPushListHeader() {
  const { texts, locales, handleBackAction } = useMfaPushListManager();

  const backText = texts?.backText || locales.heading.goBackActionText;
  const titleText = texts?.title || locales.heading.title;

  return (
    <>
      {/* Header with back button and title */}
      <span className="flex items-center justify-start gap-14 px-7">
        <Tooltip>
          <TooltipTrigger
            onClick={() => handleBackAction()}
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
        <ULThemeTitle className="mt-0 mb-0">{titleText}</ULThemeTitle>
      </span>
    </>
  );
}

export default MfaPushListHeader;
