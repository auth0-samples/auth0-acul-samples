import { CircleX } from "lucide-react";

import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

import { useResetPasswordErrorManager } from "../hooks/resetPasswordErrorManager";

function Header() {
  const { texts, locales } = useResetPasswordErrorManager();
  const titleText = texts?.eventTitle || locales.header.title;
  const descriptionText = texts?.description || locales.header.description;
  const themedLogoWidgetColorValue = extractTokenValue(
    "--ul-theme-color-error"
  );

  return (
    <>
      <CircleX
        color={themedLogoWidgetColorValue}
        size={80}
        strokeWidth={1}
        className="flex flex-wrap justify-widget-logo ml-28"
      />
      <ULThemeTitle>{titleText}</ULThemeTitle>
      <ULThemeSubtitle className="mb-6">{descriptionText}</ULThemeSubtitle>
    </>
  );
}

export default Header;
