import { CircleCheck } from "lucide-react";

import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";

import { useResetPasswordSuccessManager } from "../hooks/resetPasswordSuccessManager";

function Header() {
  const { texts, locales } = useResetPasswordSuccessManager();
  const title = texts?.eventTitle || locales.header.title;
  const description = texts?.description || locales.header.description;
  const themedLogoWidgetColorValue = extractTokenValue(
    "--ul-theme-color-success"
  );

  return (
    <>
      <CircleCheck
        color={themedLogoWidgetColorValue}
        size={80}
        strokeWidth={1}
        className="flex flex-wrap justify-widget-logo ml-28"
      />
      <ULThemeTitle>{title}</ULThemeTitle>
      <ULThemeSubtitle>{description}</ULThemeSubtitle>
    </>
  );
}

export default Header;
